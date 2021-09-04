'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async register(ctx) {
    try {
      let entity;
      let files = null;
      let data = null;

      if (ctx.is('multipart')) {
        const parsed = parseMultipartData(ctx);
        files = parsed.files;
        data = parsed.data;
      } else {
        data = ctx.request.body;
      }

      if (!data.user) {
        return ctx.response.badRequest('Dados de usuário inválidos.');
      }

      const vendorRoleData = await strapi.query('role', 'users-permissions').findOne({type: 'vendor'}, []);

      const userAdded = await strapi.plugins['users-permissions'].services.user.add({
        ...data.user,
        provider: 'local',
        confirmed: 'true',
        role: vendorRoleData.id,
      });

      if (userAdded.id) {
        if (data && files) {
          entity = await strapi.services.vendor.create({...data, user: userAdded.id}, { files });
        } else {
          entity = await strapi.services.vendor.create({...data, user: userAdded.id});
        }
      }

      return sanitizeEntity(entity, { model: strapi.models.vendor });
    } catch (err) {
      return ctx.response.badRequest(err);
    }
  },
};
