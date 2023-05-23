var database = require("../database/config");

function listar() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucao = `
        SELECT * FROM usuario;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    SELECT *
    FROM empresa e
    JOIN usuario u
    ON e.idEmpresa = u.fkEmpresa
    WHERE u.email = '${email}' AND u.senha = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function verificarUsuario(email) {
  var instrucao = `
  SELECT * FROM Usuario WHERE email LIKE '${email}'
  `;
console.log("Executando a instrução SQL: \n" + instrucao);
return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao

function cadastrar(nome, email, senha, idEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    email,
    senha
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
    INSERT INTO Usuario (Nome, Email, Senha, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', ${idEmpresa});
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarInterno(nome, email, senha, idEmpresa, idGerente) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    email,
    senha
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
    INSERT INTO Usuario (Nome, Email, Senha, fkEmpresa, fkGerente) VALUES ('${nome}', '${email}', '${senha}', ${idEmpresa}, ${idGerente});
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

//OLHA O ERRO TA AQUI, O SELECT RETORNA UNDEFINED

function pesquisarToken(texto) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", texto)
  var instrucao = `
        SELECT idEmpresa FROM Empresa WHERE Codigo LIKE '${texto}'
            `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarMaquina(modelo, cor, fabricacao, hostname, fabricante, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

     var instrucao =`INSERT INTO Maquina (hostname, modelo, cor, anoFabricacao, fabricante, fkEmpresa) VALUES ('${hostname}', '${modelo}', '${cor}','${fabricacao}','${fabricante}','${idEmpresa}');`
    
    //var instrucao02 = `
      //  INSERT INTO Maquina (Fabricante, Modelo, Cor, Ano_fabricacao) VALUES ('${fabricante}', '${modelo}', '${cor}','${fabricacao}');
    //`;
    return database.executar(instrucao);
}

function cadastrarEmpre(codigo, nomeEmpresaFantasia, nomeEmpresaSocial, cnpj, telefone, email,
    logradouro, numero, complemento, cidade, cep, estado) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpre():", codigo, nomeEmpresaFantasia, nomeEmpresaSocial, cnpj, telefone, email, logradouro, numero, complemento, cidade, cep, estado);

    endereco(logradouro, numero, complemento, cidade, cep, estado);
    
    //Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    var instrucao = `
    INSERT INTO Empresa (codigo, nomeFantasia, razaoSocial, CNPJ, telefone, email, fkEndereco) VALUES ('${codigo}', '${nomeEmpresaFantasia}', '${nomeEmpresaSocial}', '${cnpj}', '${telefone}', '${email}', (SELECT TOP 1 idEndereco FROM Endereco ORDER BY idEndereco DESC));                                                               
   `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function endereco(logradouro, numero, complemento, cidade, cep, estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpre():", logradouro, numero, complemento, cidade, cep, estado);

    //Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    var instrucao = `
    INSERT INTO Endereco (logradouro, numero, complemento, cidade, CEP, estado) VALUES ('${logradouro}', '${numero}', '${complemento}', '${cidade}', ${cep}, '${estado}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    cadastrarEmpre,
    cadastrarInterno,
    verificarUsuario,
    pesquisarToken,
    cadastrarMaquina
};