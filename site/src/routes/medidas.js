var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/checa", function (req, res) {
    medidaController.checa(req, res);
});

router.post("/cadastrarNU", function (req, res) {
    medidaController.cadastrarNU(req, res);
});

router.get("/listar/:fkEmpresa", function (req, res) {
    medidaController.listar(req, res);
});

router.get("/configuraCombo/:fkEmpresa", function (req, res) {
    medidaController.configuraCombo(req, res);
});

router.get("/ultimas/:fkEmpresa", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

module.exports = router;