const request = require('supertest');


// TODO: Fluxo de usuário tentando logar sem e-mail cadastrado


const mockSecretary = {
  'username': 'secretary',
  'email': 'secretary@secretary.com',
  'password': '1234',
};
const mockCPL = {
  'username': 'cpl',
  'email': 'cpl@cpl.com',
  'password': '1234',
};
const mockVendor = {
  'username': 'vendor',
  'email': 'vendor@vendor.com',
  'password': '1234abc',
};
// Vendor
it('should login on RestAPI as Vendor with Username and Password', async () => {
  await request(strapi.server) // app server is an instance of Class: http.Server
    .post('/auth/local')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      identifier: mockVendor.username,
      password: mockVendor.password,
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.jwt).toBeDefined();
    });
  return;
});

it('should login on RestAPI as Vendor with Email and Password', async () => {
  await request(strapi.server) // app server is an instance of Class: http.Server
    .post('/auth/local')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      identifier: mockVendor.email,
      password: mockVendor.password,
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.jwt).toBeDefined();
    });
  return;
});

it('should return users data for Vendor user', async () => {
  const vendorRole = await strapi.query('role', 'users-permissions').findOne({type: 'fornecedores'}, []);
  const role = vendorRole ? vendorRole.id : null;

  /** Creates a new user an push to database */
  const user = await strapi.plugins['users-permissions'].services.user.add({
    ...mockVendor,
    username: 'vendor2',
    email: 'vendor2@vendor2.com',
    role,
  });

  const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
    id: user.id,
  });

  await request(strapi.server) // app server is an instance of Class: http.Server
    .get('/users/me')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + jwt)
    .expect('Content-Type', /json/)
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body.id).toBe(user.id);
      expect(data.body.username).toBe(user.username);
      expect(data.body.email).toBe(user.email);
    });
});

// CPL
it('should login on RestAPI as CPL with Username and Password', async () => {
  await request(strapi.server) // app server is an instance of Class: http.Server
    .post('/auth/local')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      identifier: mockCPL.username,
      password: mockCPL.password,
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.jwt).toBeDefined();
    });
  return;
});

it('should login on RestAPI as CPL with Email and Password', async () => {
  await request(strapi.server) // app server is an instance of Class: http.Server
    .post('/auth/local')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      identifier: mockCPL.email,
      password: mockCPL.password,
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.jwt).toBeDefined();
    });
  return;
});

it('should return users data for CPL user', async () => {
  /** Gets the default user role */
  const cplRole = await strapi.query('role', 'users-permissions').findOne({type: 'cpl'}, []);
  const role = cplRole ? cplRole.id : null;

  /** Creates a new user an push to database */
  const user = await strapi.plugins['users-permissions'].services.user.add({
    ...mockCPL,
    username: 'cpl2',
    email: 'cpl2@cpl2.com',
    role,
  });

  const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
    id: user.id,
  });

  await request(strapi.server) // app server is an instance of Class: http.Server
    .get('/users/me')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + jwt)
    .expect('Content-Type', /json/)
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body.id).toBe(user.id);
      expect(data.body.username).toBe(user.username);
      expect(data.body.email).toBe(user.email);
    });
});


// Secretary
it('should login on RestAPI as Secretary with Username and Password', async () => {
  await request(strapi.server) // app server is an instance of Class: http.Server
    .post('/auth/local')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      identifier: mockSecretary.username,
      password: mockSecretary.password,
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.jwt).toBeDefined();
    });
  return;
});

it('should login on RestAPI as Secretary with Email and Password', async () => {
  await request(strapi.server) // app server is an instance of Class: http.Server
    .post('/auth/local')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      identifier: mockSecretary.email,
      password: mockSecretary.password,
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.jwt).toBeDefined();
    });
  return;
});

it('should return users data for Secretary user', async () => {
  /** Gets the default user role */
  const secretaryRole = await strapi.query('role', 'users-permissions').findOne({type: 'secretarios'}, []);
  const role = secretaryRole ? secretaryRole.id : null;

  /** Creates a new user an push to database */
  const user = await strapi.plugins['users-permissions'].services.user.add({
    ...mockCPL,
    username: 'secretary2',
    email: 'secretary2@secretary2.com',
    role,
  });

  const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
    id: user.id,
  });

  await request(strapi.server) // app server is an instance of Class: http.Server
    .get('/users/me')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + jwt)
    .expect('Content-Type', /json/)
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body.id).toBe(user.id);
      expect(data.body.username).toBe(user.username);
      expect(data.body.email).toBe(user.email);
    });
});
