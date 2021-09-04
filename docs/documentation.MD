# JP Gestão de compras - Documentação de Endpoints

## Registrar Fornecedor

Endpoint: */vendor/register*

````
//body exemplo:
{
  'corporateName': 'Retífica Belo Horizonte LTDA',
  'fantasyName': 'Oficina do Zé',
  'corporateDocNumber': '1234123123123',
  'address': 'Rua dos Josés, 123',
  'phone': '1234',
  'responsible': 'Zezinho',
  'responsibleDocNumber': '123423123123',
  'corporateDocPdf':{},
  'federalCertificatePdf':{},
  'municipalCertificatePdf':{},
  'stateCertificatePdf':{},
  'fgtsCertificatePdf':{},
  'laborCertificatePdf':{},
  'user': {
    'username': 'vendor',
    'email': 'jose@antonio.com',
    'password': '1234abc',
  }
}
````
