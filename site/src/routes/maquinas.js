var express = require("express");
var router = express.Router();

var maquinasController = require("../controllers/maquinasController");

router.get("/listar/:fkEmpresa", function (req, res) {
    maquinasController.listar(req, res);
});

router.put("/editar/:idMaquina", function (req, res) {
    maquinasController.editar(req, res);
});

router.get("/verificarMaquina/:idMaquina", function (req, res) {
    maquinasController.verificarMaquina(req, res);
});

router.delete("/excluirMaquina/:idMaquina", function (req, res) {
    maquinasController.excluirMaquina(req, res);
});

module.exports = router;