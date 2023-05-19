var express = require("express");
var router = express.Router();

var maquinasController = require("../controllers/maquinasController");

router.get("/listar/:fkEmpresa", function (req, res) {
    maquinasController.listar(req, res);
});

router.get("/listaFunc/:fkEmpresa", function (req, res) {
    maquinasController.listaFunc(req, res);
});

router.get("/listarAvisos/:fkEmpresa", function (req, res) {
    maquinasController.listarAvisos(req, res);
});

router.post("/listarAvisosPendentes/:fkEmpresa", function (req,res) {
    maquinasController.listarAvisosPendentes(req, res);
});

router.put("/editar/:idMaquina", function (req, res) {
    maquinasController.editar(req, res);
});

router.put("/solucao/:idMaquina", function (req, res) {
    maquinasController.solucao(req, res);
});

router.get("/verificarMaquina/:idMaquina", function (req, res) {
    maquinasController.verificarMaquina(req, res);
});

router.delete("/excluirMaquina/:idMaquina", function (req, res) {
    maquinasController.excluirMaquina(req, res);
});

module.exports = router;