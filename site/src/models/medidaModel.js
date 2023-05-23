var database = require("../database/config");

function buscarUltimasMedidas(fkEmpresa, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
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


function listar(fkEmpresa) {
    instrucaoSql = `SELECT c.nome, n.alta, n.media, n.baixa FROM dbo.NiveisUrgencia as n join tipoComponente as c ON n.fkComponente = c.idTipoComponente WHERE fkEmpresa = ${fkEmpresa};`;
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
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    listar,
    checa,
    cadastrarNU,
    configuraCombo
}
