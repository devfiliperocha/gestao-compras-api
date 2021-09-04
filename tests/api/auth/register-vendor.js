
module.exports = (request) => {
  const mockVendor = require('./mockVendor.json');
  it('should register user on RestAPI as Vendor', async () => {
    await request(strapi.server) // app server is an instance of Class: http.Server
      .post('/vendor/register')
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(mockVendor)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((data) => {
        expect(data.body.id).toBeDefined();
        expect(data.body.corporateDocNumber).toBe(mockVendor.corporateDocNumber);
        return strapi.query('vendor').findOne({id: data.body.id}, []);
      })
      .then((data) => {
        return strapi.query('user', 'users-permissions').findOne({id: data.user.id}, ['role']);
      })
      .then((userData) => {
        expect(userData).toBeDefined();
        expect(userData.role.type).toBe('vendor');
      });
  });

  it('should authenticate Vendor user registered, with email', async () => {
    await request(strapi.server) // app server is an instance of Class: http.Server
      .post('/auth/local')
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        identifier: mockVendor.user.email,
        password: mockVendor.user.password,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((data) => {
        expect(data.body.jwt).toBeDefined();
      });
  });

  it('should authenticate Vendor user registered, with username', async () => {
    await request(strapi.server) // app server is an instance of Class: http.Server
      .post('/auth/local')
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        identifier: mockVendor.user.username,
        password: mockVendor.user.password,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((data) => {
        expect(data.body.jwt).toBeDefined();
      });
  });
};


