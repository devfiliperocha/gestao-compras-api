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

module.exports = async () => {
  //Verifica se a regra fornecedores existe
  const pluginStore = await strapi.store({
    environment: '',
    type: 'plugin',
    name: 'users-permissions',
  });

  let role = await strapi
    .query('role', 'users-permissions')
    .findOne({ type: "fornecedores" }, []);

  //Caso não exista, cria todas as regras e configura fornecedores como default
  if (!role) {
    await strapi
      .query('role', 'users-permissions')
      .create({
        name: "Fornecedores",
        description: "Permissões de fornecedores cadastrados.",
        type: "fornecedores"
      }, []);
    await pluginStore.set({
      key: 'advanced',
      value: { "unique_email": true, "allow_register": true, "email_confirmation": false, "email_reset_password": null, "email_confirmation_redirection": null, "default_role": "fornecedores" }
    });
    await strapi
      .query('role', 'users-permissions')
      .create({
        name: "Secretários",
        description: "Permissões de Secretários cadastrados.",
        type: "secretarios"
      }, []);
    await strapi
      .query('role', 'users-permissions')
      .create({
        name: "CPL",
        description: "Permissões de CPL.",
        type: "cpl"
      }, []);
  } else {
    await pluginStore.set({
      key: 'advanced',
      value: { "unique_email": true, "allow_register": true, "email_confirmation": false, "email_reset_password": null, "email_confirmation_redirection": null, "default_role": "fornecedores" }
    });
  }
};
