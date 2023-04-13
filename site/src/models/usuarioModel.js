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

function cadastrarEmpre(codigo, nomeEmpresaFantasia, nomeEmpresaSocial, cnpj, telefone, email,
    logradouro, numero, complemento, cidade, cep, estado) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpre():", codigo, nomeEmpresaFantasia, nomeEmpresaSocial, cnpj, telefone, email, logradouro, numero, complemento, cidade, cep, estado);

    //Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    endereco(logradouro, numero, complemento, cidade, cep, estado);
    empresa(codigo, nomeEmpresaFantasia, nomeEmpresaSocial, cnpj, telefone, email, cep, numero, complemento);
    
}

function endereco(logradouro, numero, complemento, cidade, cep, estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpre():", logradouro, numero, complemento, cidade, cep, estado);

    //Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    var instrucao = `
    INSERT INTO Endereco (logradouro, numero, complemento, cidade, CEP, estado) VALUES ('${logradouro}', ${numero}, '${complemento}', '${cidade}', ${cep}, '${estado}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function empresa(codigo, nomeEmpresaFantasia, nomeEmpresaSocial, cnpj, telefone, email, cep, numero, complemento) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpre():", codigo, nomeEmpresaFantasia, nomeEmpresaSocial, cnpj, telefone, email, cep, numero, complemento);

    //Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    var instrucao = `
    INSERT INTO Empresa (codigo, nomeFantasia, razaoSocial, CNPJ, telefone, email, fkEndereco) VALUES (${codigo}, '${nomeEmpresaFantasia}', '${nomeEmpresaSocial}', ${cnpj}, '${telefone}', '${email}', (SELECT idEndereco FROM Endereco WHERE CEP = ${cep} AND numero = ${numero} AND complemento = '${complemento}'));                                                               
   `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cpuUrgencia(cpuAlto, cpuMedio, cpuBaixo, codigo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpre():", cpuAlto, cpuMedio, cpuBaixo, codigo);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    INSERT INTO NiveisUrgencia (alta, media, baixa, componente, fkEmpresa) VALUES ('${cpuAlto}', '${cpuMedio}', '${cpuBaixo}', 'CPU', (SELECT idEmpresa FROM Empresa WHERE codigo = ${codigo}));
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function ramUrgencia(ramAlto, ramMedio, ramBaixo, nomeEmpresaSocial) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpre():", ramAlto, ramMedio, ramBaixo, nomeEmpresaSocial);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO NiveisUrgencia (alta, media, baixa, componente, fkEmpresa) VALUES ('${ramAlto}', '${ramMedio}', '${ramBaixo}', 'RAM', (SELECT idEmpresa FROM Empresa WHERE razaoSocial = '${nomeEmpresaSocial}'));
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function discoUrgencia(discoAlto, discoMedio, discoBaixo, nomeEmpresaFantasia) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpre():", discoAlto, discoMedio, discoBaixo, nomeEmpresaFantasia);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    INSERT INTO NiveisUrgencia (alta, media, baixa, componente, fkEmpresa) VALUES ('${discoAlto}', '${discoMedio}', '${discoBaixo}', 'DISCO', (SELECT idEmpresa FROM Empresa WHERE nomeFantasia = '${nomeEmpresaFantasia}'));
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