var database = require("../database/config");

function buscarUltimasMedidasConcluidos(fkEmpresa, data, conjunto, i) {
    console.log("To entrando no Model")
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT COUNT(1) as contagem,
        ${i} as dia,
        ${conjunto} as conjunto
        FROM Incidente
        JOIN [dbo].[Rastreabilidade] ON idIncidente = fkIncidente
        JOIN [dbo].[logDesempenho] ON idLogDesempenho = fkLogDesempenho
        JOIN [dbo].[Maquina] ON idMaquina = fkMaquina
        WHERE fkEmpresa = ${fkEmpresa}
        AND (CONVERT(date, dataHoraSolucao, 101)) = '${data}';`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasProgresso(fkEmpresa, data, conjunto, i) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT COUNT(1) as contagem,
        ${i} as dia,
        ${conjunto} as conjunto
        FROM Incidente 
        JOIN [dbo].[Rastreabilidade] ON idIncidente = fkIncidente 
        JOIN [dbo].[logDesempenho] ON idLogDesempenho = fkLogDesempenho 
        JOIN [dbo].[Maquina] ON idMaquina = fkMaquina 
        WHERE fkEmpresa = ${fkEmpresa}
        AND (CONVERT(date, dataHoraManutencao, 101)) <= '${data}'
        AND ((CONVERT(date, dataHoraSolucao, 101)) > '${data}'
        OR (CONVERT(date, dataHoraSolucao, 101)) IS NULL)`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasPendente(fkEmpresa, data, conjunto, i) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT COUNT(1) as contagem,
        ${i} as dia,
        ${conjunto} as conjunto
        FROM Incidente
        JOIN [dbo].[Rastreabilidade] ON idIncidente = fkIncidente
        JOIN [dbo].[logDesempenho] ON idLogDesempenho = fkLogDesempenho
        JOIN [dbo].[Maquina] ON idMaquina = fkMaquina
        WHERE fkEmpresa = ${fkEmpresa}
        AND (CONVERT(date, dataHoraIncidente, 101)) <= '${data}'
        AND ((CONVERT(date, dataHoraManutencao, 101)) > '${data}'
        OR (CONVERT(date, dataHoraManutencao, 101)) IS NULL);`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(componente, alta, media, baixa, idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", componente, alta, media, baixa, idEmpresa);

    var instrucao = `
        UPDATE NiveisUrgencia SET alta = '${alta}',media = '${media}', baixa = '${baixa}' WHERE fkcomponente = ${componente} AND fkEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listar(fkEmpresa) {
    instrucaoSql = `SELECT c.nome, n.fkComponente, n.alta, n.media, n.baixa FROM dbo.NiveisUrgencia as n join tipoComponente as c ON n.fkComponente = c.idTipoComponente WHERE fkEmpresa = ${fkEmpresa};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contaMaq(fkEmpresa) {
    instrucaoSql = `SELECT COUNT(1) as contagem FROM MAQUINA WHERE fkEmpresa = ${fkEmpresa};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function configuraCombo(fkEmpresa) {
    instrucaoSql = `SELECT distinct YEAR(dataHoraIncidente) as ano, MONTH(dataHoraIncidente) as mes from Rastreabilidade JOIN [dbo].[Incidente] on fkIncidente = idIncidente JOIN [dbo].[logDesempenho] on fkLogDesempenho = idLogDesempenho JOIN [dbo].[Maquina] on fkMaquina = idMaquina JOIN [dbo].[Empresa] on fkEmpresa = idEmpresa WHERE fkEmpresa = ${fkEmpresa};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function checa() {
    instrucaoSql = `SELECT idEmpresa FROM dbo.Empresa LEFT JOIN dbo.NiveisUrgencia ON fkEmpresa = idEmpresa where fkEmpresa IS NULL ;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarNU(idEmpresa) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpre():", idEmpresa);

    //Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    var instrucao = `
    INSERT INTO NiveisUrgencia (alta, media, baixa, fkEmpresa, fkComponente) VALUES 
    (60, 40, 20, ${idEmpresa}, (select idTipoComponente from TipoComponente where nome = 'RAM'))
   ,(60, 40, 20, ${idEmpresa}, (select idTipoComponente from TipoComponente where nome = 'CPU'));                                                               
   `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarUltimasMedidasConcluidos,
    buscarUltimasMedidasProgresso,
    buscarUltimasMedidasPendente,
    buscarMedidasEmTempoReal,
    editar,
    listar,
    checa,
    cadastrarNU,
    configuraCombo,
    contaMaq
}
