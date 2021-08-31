module.exports = {
  lifecycles: {
    // Called before an entry is created
    async beforeCreate(data) {
      const _ = require('lodash')
      const pluginStore = await strapi.store({
        environment: '',
        type: 'plugin',
        name: 'users-permissions',
      });
      const advancedSettings = await pluginStore.get({ key: "advanced" })
      let role = await strapi
        .query('role', 'users-permissions')
        .findOne({ type: advancedSettings.default_role }, []);
      if (role) {
        if (role.id !== data.role) {
          data.role = role.id
        }
        if (role.type == "fornecedores" && _.get(data, "detalhes_servidor.nome", false)) {
          data.detalhes_servidor = null
        }

      }
      return data
    },
    // Called after an entry is created
    afterCreate(result) { },
  },
};
