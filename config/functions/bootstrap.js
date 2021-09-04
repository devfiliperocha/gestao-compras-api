'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */
const findPublicRole = async () => {
  const result = await strapi
    .query('role', 'users-permissions')
    .findOne({ type: 'public' });
  return result;
};

const setDefaultPermissions = async () => {
  const role = await findPublicRole();
  const permissions = await strapi
    .query('permission', 'users-permissions')
    .find({ type: 'application', role: role.id });
  await Promise.all(
    permissions.map((p) =>
      strapi
        .query('permission', 'users-permissions')
        .update({ id: p.id }, { enabled: true }),
    ),
  );
};

const isFirstRun = async () => {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup',
  });
  const initHasRun = await pluginStore.get({ key: 'initHasRun' });
  await pluginStore.set({ key: 'initHasRun', value: true });
  return !initHasRun;
};

module.exports = async () => {
  const shouldSetDefaultPermissions = await isFirstRun();
  if (shouldSetDefaultPermissions) {
    await setDefaultPermissions();
  }
  // Verify if Vendors rule exists
  const pluginStore = await strapi.store({
    environment: '',
    type: 'plugin',
    name: 'users-permissions',
  });

  const role = await strapi
    .query('role', 'users-permissions')
    .findOne({ type: 'vendor' }, []);

  // if not exists, try to create all rules and make vendors as default rule
  if (!role) {
    await strapi
      .query('role', 'users-permissions')
      .create({
        name: 'Fornecedor',
        description: 'Permissões para fornecedores cadastrados.',
        type: 'vendor',
      }, []);
    await pluginStore.set({
      key: 'advanced',
      value: { 'unique_email': true, 'allow_register': true, 'email_confirmation': false, 'email_reset_password': null, 'email_confirmation_redirection': null, 'default_role': 'vendor' },
    });
    try {
      await strapi
        .query('role', 'users-permissions')
        .create({
          name: 'Secretário',
          description: 'Permissões para Secretários cadastrados.',
          type: 'secretary',
        }, []);
      await strapi
        .query('role', 'users-permissions')
        .create({
          name: 'CPL',
          description: 'Permissões para usuários CPL.',
          type: 'cpl',
        }, []);
    } catch (err) {
      strapi.log(err);
    }
  } else {
    await pluginStore.set({
      key: 'advanced',
      value: { 'unique_email': true, 'allow_register': true, 'email_confirmation': false, 'email_reset_password': null, 'email_confirmation_redirection': null, 'default_role': 'vendor' },
    });
  }
};
