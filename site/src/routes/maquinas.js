var express = require("express");
var router = express.Router();

var maquinasController = require("../controllers/maquinasController");

router.get("/listar/:fkEmpresa", function (req, res) {
    maquinasController.listar(req, res);
});

router.put("/editar/:idMaquina", function (req, res) {
    maquinasController.editar(req, res);
});

module.exports = router;