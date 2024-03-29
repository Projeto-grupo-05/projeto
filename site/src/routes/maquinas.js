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

router.get("/listarAvisosPendentes/:fkEmpresa", function (req,res) {
    maquinasController.listarAvisosPendentes(req, res);
});

router.get("/listarAvisosProgresso/:fkEmpresa", function (req,res) {
    maquinasController.listarAvisosProgresso(req, res);
});

router.put("/atribuirIncidente/:idIncidente", function (req, res) {
    maquinasController.atribuirIncidente(req, res);
});

router.put("/editar/:idMaquina", function (req, res) {
    maquinasController.editar(req, res);
});
// DASHBOARD ------------------------------------------------------------------------
router.get("/atualizaGrafico/:idMaquina", function (req, res) {
    maquinasController.buscarMedidasEmTempoReal(req, res);
});

router.get("/buscarUltimasMedidas/:idMaquina", function (req, res) {
    maquinasController.buscarUltimasMedidas(req, res);
});
// DASHBOARD ------------------------------------------------------------------------
router.put("/solucao/:idIncidente", function (req, res) {
    maquinasController.solucao(req, res);
});

router.get("/verificarMaquina/:idMaquina", function (req, res) {
    maquinasController.verificarMaquina(req, res);
});

router.delete("/excluirMaquina/:idMaquina", function (req, res) {
    maquinasController.excluirMaquina(req, res);
});

module.exports = router;