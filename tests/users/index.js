const request = require('supertest');

const mockServidor = {
  username: 'jonas',
  email: 'jonas@jonas.com',
  provider: 'local',
  password: '1234',
  confirmed: true,
  blocked: null,
  role: "public",
  "detalhes_servidor": {
    "nome": "Jonas",
    "cpf": "1234",
    "cargo_funcao": "Secretário",
    "matricula": "1234"
  }
};
const mockFornecedor = {
  username: 'tester',
  email: 'tester@strapi.com',
  provider: 'local',
  password: '1234abc',
  confirmed: true,
  blocked: null,
  type: "fornecedor",
  "detalhes_fornecedor": {
    "razao_social": "Retífica Belo Horizonte LTDA",
    "nome_fantasia": "Oficina do Zé",
    "cnpj": "1234",
    "endereco": "Rua dos Josés, 123",
    "telefone": "1234",
    "responsavel": "Zezinho",
    "cpf_responsavel": "1234"
  }
};

it('Pela RestAPI, só deve permitir registrar usuários com Role Default', async () => {
  const pluginStore = await strapi.store({
    environment: '',
    type: 'plugin',
    name: 'users-permissions',
  });
  const advancedSettings = await pluginStore.get({ key: "advanced" })

  await request(strapi.server) // app server is an instance of Class: http.Server
    .post('/auth/local/register')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(mockFornecedor)
    .expect('Content-Type', /json/)
    .expect(200)
    .then(data => {
      expect(data.body.jwt).toBeDefined();
      expect(data.body.user.role.type).toBe(advancedSettings.default_role);
    });
  await request(strapi.server) // app server is an instance of Class: http.Server
    .post('/auth/local/register')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(mockServidor)
    .expect('Content-Type', /json/)
    .expect(200)
    .then(data => {
      expect(data.body.jwt).toBeDefined();
      expect(data.body.user.role.type).toBe(advancedSettings.default_role);
    });
});

it('Falhar ao tentar adicionar fornecedor com detalhes vazios', async () => {
  const forn = Object.assign({}, mockFornecedor)
  forn.detalhes_fornecedor = null

  await request(strapi.server) // app server is an instance of Class: http.Server
    .post('/auth/local/register')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(mockServidor)
    .expect('Content-Type', /json/)
    .expect(400)
});


/**
 * Permitir adicionar usuários de outras roles apenas através do ADMIN
 *
 */
