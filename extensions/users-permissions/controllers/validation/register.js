const validateFornecedores = (data, role) => {
  //[SPECIFIC]: Fornecedores não podem ser adicionados com seus parâmetros vazios
  let result = {
    sucess: true,
  }
  if (role.type == "fornecedores" && !data.detalhes_fornecedor) {
    result.sucess = false
    result.error = "Parâmetros inválidos"
  }
  return result
}

module.exports = (data, role) => {
  let result = {
    sucess: true,
  }

  result = validateFornecedores(data, role)

  return result
}
