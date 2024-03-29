const { DateTime } = require("mssql");
var maquinasModel = require("../models/maquinasModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 5;

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    maquinasModel.buscarUltimasMedidas(idMaquina, limite_linhas).then(function (resultado) {
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

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    maquinasModel.buscarMedidasEmTempoReal(idMaquina).then(function (resultado) {
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

function listaFunc(req, res) {

    // const limite_linhas = 7;

    var fkEmpresa = req.params.fkEmpresa;

    maquinasModel.listaFunc(fkEmpresa).then(function (resultado) {
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

function listarAvisos(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    maquinasModel.listarAvisos(fkEmpresa).then(function (resultado) {
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

function listarAvisosPendentes(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    maquinasModel.listarAvisosPendentes(fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os incidentes não resolvidos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarAvisosProgresso(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    maquinasModel.listarAvisosProgresso(fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os incidentes em progresso.", erro.sqlMessage);
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

function atribuirIncidente(req, res) {
    var idIncidente = req.params.idIncidente;
    var idUsuario = req.body.idUsuarioServer;
    var data = req.body.dataServer;

    maquinasModel.atribuirIncidente(idIncidente, idUsuario, data)
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

function solucao(req, res) {
    var idIncidente = req.params.idIncidente;
    var descProblema = req.body.descProblema;
    var descSolucao = req.body.descSolucao;
    var data = req.body.dataServer;

    console.log('aqui a data do controller' +data)
    maquinasModel.solucao(descProblema, descSolucao, idIncidente, data)
        .then(
            function (resultado) {
                res.json(resultado);
                console.log('resultado do controller data ' +data)
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

function verificarMaquina(req, res) {
    var idMaquina = req.params.idMaquina;


    maquinasModel.verificarMaquina(idMaquina)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o select: ", erro.sqlMessage);
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
    excluirMaquina,
    verificarMaquina,
    atribuirIncidente,
    listarAvisos,
    listarAvisosProgresso,
    listarAvisosPendentes,
    solucao,
    listaFunc,
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}