const request = require('supertest');

// TODO: Fluxo de criação de usuário sem email confirmado

const mockSecretary = {
  'username': 'secretary',
  'email': 'secretary@secretary.com',
  'password': '1234',
  'provider': 'local',
  'confirmed': true,
  'blocked': null,
  'detalhes_servidor': {
    'nome': 'Alberto',
    'cpf': '1234',
    'cargo_funcao': 'Secretário',
    'matricula': '1234',
  },
};
const mockCPL = {
  'username': 'cpl',
  'email': 'cpl@cpl.com',
  'password': '1234',
  'provider': 'local',
  'confirmed': true,
  'blocked': null,
  'detalhes_servidor': {
    'nome': 'Jonas',
    'cpf': '1234',
    'cargo_funcao': 'CPL',
    'matricula': '1234',
  },
};
const mockVendor = {
  'username': 'vendor',
  'email': 'vendor@vendor.com',
  'password': '1234abc',
  'provider': 'local',
  'confirmed': true,
  'blocked': null,
  'type': 'fornecedor',
  'detalhes_fornecedor': {
    'razao_social': 'Retífica Belo Horizonte LTDA',
    'nome_fantasia': 'Oficina do Zé',
    'cnpj': '1234123123123',
    'endereco': 'Rua dos Josés, 123',
    'telefone': '1234',
    'responsavel': 'Zezinho',
    'cpf_responsavel': '123423123123',
  },
};
it('should Role Default is Vendor', async () => {
  const pluginStore = await strapi.store({
    environment: '',
    type: 'plugin',
    name: 'users-permissions',
  });
  const advancedSettings = await pluginStore.get({ key: 'advanced' });
  const defaultRole = advancedSettings.default_role;
  expect(defaultRole).toBe('fornecedores');
});

it('should register on RestAPI only Role Default', async () => {
  const pluginStore = await strapi.store({
    environment: '',
    type: 'plugin',
    name: 'users-permissions',
  });
  const advancedSettings = await pluginStore.get({ key: 'advanced' });
  await request(strapi.server) // app server is an instance of Class: http.Server
    .post('/auth/local/register')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(mockVendor)
    .expect('Content-Type', /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.jwt).toBeDefined();
      expect(data.body.user.role.type).toBe(advancedSettings.default_role);
    });
  await request(strapi.server) // app server is an instance of Class: http.Server
    .post('/auth/local/register')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(mockVendor)
    .expect('Content-Type', /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.jwt).toBeDefined();
      expect(data.body.user.role.type).toBe(advancedSettings.default_role);
    });
  return;
});

it('should not register Vendor with empty details', async () => {
  const forn = Object.assign({}, mockVendor);
  forn.detalhes_fornecedor = null;

  await request(strapi.server) // app server is an instance of Class: http.Server
    .post('/auth/local/register')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(forn)
    .expect('Content-Type', /json/)
    .expect(400);
});

it('should register as CPL on Admin interface', async () => {
  const cplRole = await strapi.query('role', 'users-permissions').findOne({type: 'cpl'}, []);

  await strapi.plugins['users-permissions'].services.user.add({
    ...mockCPL,
    role: cplRole.id,
  })
    .then((data)=>{
      expect(data.role.type).toBe(cplRole.type);
    });
});

it('should register as Secretary on Admin interface', async () => {
  const secretaryRole = await strapi.query('role', 'users-permissions').findOne({type: 'secretarios'}, []);

  await strapi.plugins['users-permissions'].services.user.add({
    ...mockSecretary,
    role: secretaryRole.id,
  })
    .then((data)=>{
      expect(data.role.type).toBe(secretaryRole.type);
    });
});


