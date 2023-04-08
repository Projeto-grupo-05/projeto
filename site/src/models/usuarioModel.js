var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEmpre(codigo, nomeEmpresaFantasia, nomeEmpresaSocial, cnpj, telefone, email, logradouro, numero, complemento, cidade, cep, estado, componente, alto, medio, baixo) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpre():", codigo, nomeEmpresaFantasia, nomeEmpresaSocial, cnpj, telefone, email, logradouro, numero, complemento, cidade, cep, estado, componente, alto, medio, baixo);

    //Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
        endereco(logradouro, numero, complemento, cidade, cep, estado);
        empresa(codigo, nomeEmpresaFantasia, nomeEmpresaSocial, cnpj, telefone, email, cep, numero, complemento);
        cadastrarUrge(componente, alto, medio, baixo);
}

function endereco(logradouro, numero, complemento, cidade, cep, estado){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpre():", logradouro, numero, complemento, cidade, cep, estado);

    //Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    var instrucao = `
    INSERT INTO Endereco (Logradouro, Numero, Complemento, Cidade, CEP, Estado) VALUES ('${logradouro}', '${numero}', '${complemento}', '${cidade}', '${cep}', '${estado}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function empresa(codigo, nomeEmpresaFantasia, nomeEmpresaSocial, cnpj, telefone, email, cep, numero, complemento){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpre():", codigo, nomeEmpresaFantasia, nomeEmpresaSocial, cnpj, telefone, email, cep, numero, complemento);
    
    //Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    var instrucao = `
    INSERT INTO Empresa (Codigo, Nome_fantasia, Razao_social, CNPJ, Telefone, Email, fkEndereco) VALUES ('${codigo}', '${nomeEmpresaFantasia}', '${nomeEmpresaSocial}', '${cnpj}', '${telefone}', '${email}', (select idEndereco from Endereco where CEP = '${cep}' and Numero = '${numero}' and Complemento = '${complemento}'));                                                               
   `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarUrge(componente, alto, medio, baixo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmore():", componente, alto, medio, baixo);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO NiveisUrgencia (componente, alto, medio, baixo) VALUES ('${componente}', '${alto}', '${medio}', '${baixo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    cadastrarEmpre,
};