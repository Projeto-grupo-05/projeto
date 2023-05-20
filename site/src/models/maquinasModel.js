var database = require("../database/config")

function listar(fkEmpresa) {
    instrucaoSql = `SELECT idMaquina, Hostname, Fabricante, Modelo, Cor, YEAR (anoFabricacao) as ano FROM dbo.Maquina WHERE fkEmpresa = ${fkEmpresa};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listaFunc(fkEmpresa) {
    instrucaoSql = `SELECT idUsuario, nome FROM dbo.Usuario WHERE fkEmpresa = ${fkEmpresa};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarAvisos(fkEmpresa) {
    instrucaoSql = `SELECT descricaoProblema, nome, descricaoSolucao, idMaquina, Incidente.dataHora, hostname FROM Usuario JOIN Incidente on fkUsuario = idUsuario 
    JOIN logDesempenho on idLogDesempenho = fklogDesempenho JOIN Maquina on idMaquina = fkMaquina JOIN Empresa on idEmpresa = Maquina.fkEmpresa WHERE IdEmpresa = '${fkEmpresa}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarAvisosPendentes(fkEmpresa) {
    instrucaoSql = `SELECT descricaoProblema, idMaquina, Incidente.dataHora, hostname FROM Usuario RIGHT JOIN Incidente on fkUsuario = idUsuario 
    JOIN logDesempenho on idLogDesempenho = fklogDesempenho JOIN Maquina on idMaquina = fkMaquina JOIN Empresa on idEmpresa = Maquina.fkEmpresa WHERE Incidente.fkUsuario IS NULL AND IdEmpresa = '${fkEmpresa}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarMaquina(idMaquina) {
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

function solucao(idMaquina, descProblema, descSolucao) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idMaquina, descProblema, descSolucao);

    var instrucao = `
        UPDATE Incidente SET descricaoProblema = '${descProblema}', descricaoSolucao = '${descSolucao}' WHERE descricaoSolucao = '' AND fkLogDesempenho = (SELECT TOP 1 idLogDesempenho FROM logDesempenho WHERE fkMaquina = ${idMaquina} ORDER BY 1 DESC);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirMaquina(idMaquina) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idMaquina);
    var instrucao = `
        DELETE FROM dbo.Maquina WHERE idMaquina = ${idMaquina};
    `;

    excluirIncidente(idMaquina);
    excluirLog(idMaquina);
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirIncidente(idMaquina) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idMaquina);
    var instrucao = `
        DELETE Incidente FROM Incidente JOIN dbo.LogDesempenho ON idLogDesempenho = fkLogDesempenho JOIN dbo.Maquina ON idMaquina = fkMaquina WHERE idMaquina = ${idMaquina};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirLog(idMaquina) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idMaquina);
    var instrucao = `
        DELETE LogDesempenho FROM LogDesempenho JOIN dbo.Maquina ON idMaquina = fkMaquina WHERE idMaquina = ${idMaquina};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    editar,
    excluirMaquina,
    verificarMaquina,
    listarAvisos,
    listarAvisosPendentes,
    solucao,
    listaFunc
};