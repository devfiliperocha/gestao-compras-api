const request = require('supertest');

// TODO: Fluxo de criação de usuário sem email confirmado

describe('Auth Flux without email confirmation', () => {
  describe('Initial Verifications', () => {
    require('./boot')(request);
  });


  describe('Register new user as Vendor at RestAPI, and login with it', () => {
    require('./register-vendor')(request);
  });
});


