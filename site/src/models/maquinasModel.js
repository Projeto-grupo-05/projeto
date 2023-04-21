var database = require("../database/config")

function listar(fkEmpresa) {
    instrucaoSql = `SELECT idMaquina, Hostname, Fabricante, Modelo, Cor, anoFabricacao FROM dbo.Maquina WHERE fkEmpresa = ${fkEmpresa};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarAvisos(fkEmpresa) {
    instrucaoSql = `SELECT i.descricaoProblema, u.nome, i.descricaoSolucao, m.idMaquina, i.dataHora FROM dbo.Incidente AS i JOIN 
    dbo.Usuario AS u  ON (u.idUsuario = i.fkUsuario) JOIN dbo.Maquina AS m ON (u.idUsuario = m.idMaquina) WHERE m.fkEmpresa = 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function verificarMaquina(idMaquina){
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificarMaquina(): ", idMaquina);
    var instrucao = `
        SELECT hostname, modelo, cor, RAM, UCP, SO, armazenamento from dbo.Maquina WHERE idMaquina = ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao);
}

function editar(idMaquina, hostname, fabricante, modelo, cor) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idMaquina, fabricante, modelo, cor, hostname);

    var instrucao = `
        UPDATE Maquina SET hostname = '${hostname}', fabricante = '${fabricante}', modelo = '${modelo}', cor = '${cor}' WHERE idMaquina = ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirMaquina(idMaquina) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idMaquina);
    var instrucao = `
        DELETE FROM dbo.Maquina WHERE idMaquina = ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    editar,
    excluirMaquina,
    verificarMaquina,
    listarAvisos
};