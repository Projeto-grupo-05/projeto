var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var fkEmpresa = req.params.fkEmpresa;

    console.log(`Trazendo os últimos ${limite_linhas} dias`);

    medidaModel.buscarUltimasMedidas(fkEmpresa, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idAquario = req.params.idAquario;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listar(req, res) {

    var fkEmpresa = req.params.fkEmpresa;

    medidaModel.listar(fkEmpresa).then(function (resultado) {

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function checa(req, res) {

    medidaModel.checa().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function cadastrarNU(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idEmpresa = req.body.idEmpresaServer;

    // Faça as validações dos valores


    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    medidaModel.cadastrarNU(idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
                console.log("MANO TA INDO");
            }
        ).catch(
            function (erro) {
                console.log("MANO TA INDO NAO VEI, AJUDA!!");
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    checa,
    cadastrarNU,
    listar,
}