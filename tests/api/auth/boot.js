const mockUser = {
  'username': 'user',
  'email': 'user@user.com',
  'password': '1234',
  'confirmed': true,
};

module.exports = (request) => {
  it('should have Vendor, CPL and Secretary roles created', async () => {
    await Promise.all([
      strapi.query('role', 'users-permissions').findOne({type: 'cpl'}, []),
      strapi.query('role', 'users-permissions').findOne({type: 'secretary'}, []),
      strapi.query('role', 'users-permissions').findOne({type: 'vendor'}, []),
    ]).then((rulesQueryReturn) => {
      expect(rulesQueryReturn).toHaveLength(3);
      const expected = ['cpl', 'secretary', 'vendor'];
      const rules = rulesQueryReturn.map((r)=> r.type);
      expect(rules).toEqual(expect.arrayContaining(expected));
    });
  });

  it('should Role Default is Vendor', async () => {
    const pluginStore = await strapi.store({
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
    });
    const advancedSettings = await pluginStore.get({ key: 'advanced' });
    const defaultRole = advancedSettings.default_role;
    expect(defaultRole).toBe('vendor');
  });

  it('should register on RestAPI only as Role Default', async () => {
    const pluginStore = await strapi.store({
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
    });
    const advancedSettings = await pluginStore.get({ key: 'advanced' });

    const notVendorRoleQuery = await strapi.query('role', 'users-permissions').model.query((q) => {
      q.whereNot('type', advancedSettings.default_role);
    }).fetch();
    let notVendorRole = notVendorRoleQuery.toJSON();
    notVendorRole = notVendorRole ? notVendorRole : null;

    const data = {
      ...mockUser,
      role: notVendorRole.type,
    };

    await request(strapi.server) // app server is an instance of Class: http.Server
      .post('/auth/local/register')
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((data) => {
        expect(data.body.jwt).toBeDefined();
        expect(data.body.user.role.type).toBe(advancedSettings.default_role);
      });
    return;
  });
};
