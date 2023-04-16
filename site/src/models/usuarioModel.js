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

function entrar(email, senha, token) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha, token)
    var instrucao = `
    SELECT *
    FROM empresa e
    JOIN usuario u
    ON e.idEmpresa = u.fkEmpresa
    WHERE u.email = '${email}' AND u.senha = '${senha}' AND E.codigo = '${token}';

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

//OLHA O ERRO TA AQUI, O SELECT RETORNA UNDEFINED

function pesquisarToken(texto) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", texto)
  var instrucao = `
        SELECT idEmpresa FROM Empresa WHERE Codigo LIKE '${texto}'
            `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarMaquina(fabricante, modelo, cor, fabricacao, ucp, ram, so, hostname, qtdEspaco,idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

     var instrucao =`INSERT INTO Maquina (hostname, fabricante, modelo, cor, anoFabricacao, UCP, RAM, SO, armazenamento, fkEmpresa) VALUES ('${hostname}','${fabricante}', '${modelo}', '${cor}','${fabricacao}','${ucp}', '${ram}', '${so}','${qtdEspaco}','${idEmpresa}');`
    
    //var instrucao02 = `
      //  INSERT INTO Maquina (Fabricante, Modelo, Cor, Ano_fabricacao) VALUES ('${fabricante}', '${modelo}', '${cor}','${fabricacao}');
    //`;
    return database.executar(instrucao);
        

    console.log("Executando a instrução SQL: \n" + instrucao);
}

/*function cadastrarMaquina(ucp, ram, so, qtdMaquina) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    for(i = 0; i <= qtdMaquina; i++){
        var instrucao = `
            INSERT INTO Componentes (UCP, RAM, SO) VALUES ('${ucp}', '${ram}', '${so}');
        `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
}*/

module.exports = {
  entrar,
  cadastrar,
  listar,
  pesquisarToken,
  cadastrarMaquina
};