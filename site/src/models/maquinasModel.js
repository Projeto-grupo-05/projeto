var database = require("../database/config")

function buscarUltimasMedidas(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas} l.nivelRAM, l.nivelCPU, l.discoDisponivel, FORMAT(l.dataHora, 'HH:mm') as momento_grafico from [dbo].[logDesempenho] as l where fkMaquina = ${idMaquina};`

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select top ${limite_linhas} l.nivelCPU, l.nivelRam , l.discoDisponivel, FORMAT(l.dataHora, 'HH:mm') as momento_grafico from [dbo].[logDesempenho] as l where fkMaquina = ${idMaquina};`

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 l.nivelRam, l.nivelCPU, l.discoDisponivel, l.dataHora as momento_grafico from [dbo].[logDesempenho] as l where fkMaquina = ${idMaquina} ORDER BY momento_grafico DESC;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select top 1 nivelRam, nivelCPU, discoDisponivel from [dbo].[logDesempenho] where fkMaquina = ${idMaquina};`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//DASHBOARD /\========================/\==========================/\
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
    instrucaoSql = `SELECT descricaoProblema, nome, descricaoSolucao, idMaquina, dataHoraSolucao, dataHoraManutencao, dataHoraIncidente, hostname FROM Usuario 
	JOIN Incidente ON fkUsuario = idUsuario 
	RIGHT JOIN Rastreabilidade ON fkIncidente = idIncidente
    JOIN logDesempenho on idLogDesempenho = fklogDesempenho JOIN Maquina on idMaquina = fkMaquina JOIN Empresa on idEmpresa = Maquina.fkEmpresa WHERE dataHoraSolucao IS NOT NULL AND IdEmpresa = '${fkEmpresa}' 
	GROUP BY descricaoProblema, nome, descricaoSolucao, idMaquina, dataHoraSolucao, dataHoraManutencao, dataHoraIncidente, hostname;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarAvisosPendentes(fkEmpresa) {
    instrucaoSql = `SELECT nome, idMaquina, dataHoraManutencao, dataHoraIncidente, hostname FROM Usuario 
	JOIN Incidente ON fkUsuario = idUsuario 
	RIGHT JOIN Rastreabilidade ON fkIncidente = idIncidente
    JOIN logDesempenho on idLogDesempenho = fklogDesempenho JOIN Maquina on idMaquina = fkMaquina JOIN Empresa on idEmpresa = Maquina.fkEmpresa WHERE dataHoraManutencao IS NULL AND dataHoraSolucao IS NULL AND IdEmpresa = '${fkEmpresa}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarAvisosProgresso(fkEmpresa) {
    instrucaoSql = `SELECT nome, idMaquina, dataHoraManutencao, dataHoraIncidente, hostname FROM Usuario 
	JOIN Incidente ON fkUsuario = idUsuario 
	RIGHT JOIN Rastreabilidade ON fkIncidente = idIncidente
    JOIN logDesempenho on idLogDesempenho = fklogDesempenho JOIN Maquina on idMaquina = fkMaquina JOIN Empresa on idEmpresa = Maquina.fkEmpresa WHERE dataHoraManutencao IS NOT NULL AND dataHoraSolucao IS NULL AND IdEmpresa = '${fkEmpresa}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function verificarMaquina(idMaquina) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificarMaquina(): ", idMaquina);
    var instrucao = `
        SELECT m.hostname, m.modelo, m.cor, m.RAM, m.UCP, m.SO, l.discoDisponivel from dbo.Maquina as m join [dbo].[logDesempenho] as l on l.fkMaquina = m.idMaquina WHERE l.fkMaquina = ${idMaquina};
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
    listarAvisosProgresso,
    listarAvisosPendentes,
    solucao,
    listaFunc,
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
};