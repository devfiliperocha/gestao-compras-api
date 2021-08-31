module.exports = ({ env }) => ({
  // ...
  email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: env('SENDGRID_API_KEY'),
    },
    settings: {
      defaultFrom: 'contato@phantom.dev.br',
      defaultReplyTo: 'contato@phantom.dev.br',
      testAddress: 'contato@phantom.dev.br',
    },
  },
  // ...
});
