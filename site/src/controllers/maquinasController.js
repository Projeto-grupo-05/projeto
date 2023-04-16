var maquinasModel = require("../models/maquinasModel");

function listar(req, res) {

    // const limite_linhas = 7;

    var fkEmpresa = req.params.fkEmpresa;

    maquinasModel.listar(fkEmpresa).then(function (resultado) {
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

function editar(req, res) {
    var idMaquina = req.params.idMaquina;
    var hostname = req.body.hostname;
    var fabricante = req.body.fabricante;
    var modelo = req.body.modelo;
    var cor = req.body.cor;


    maquinasModel.editar(idMaquina, hostname, fabricante, modelo, cor)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function excluirMaquina(req, res) {
    var idMaquina = req.params.idMaquina;

    maquinasModel.excluirMaquina(idMaquina)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listar,
    editar,
    excluirMaquina
}