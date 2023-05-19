var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/checa", function (req, res) {
    medidaController.checa(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});

router.put("/editar/:fkComponete", function (req, res) {
    medidaController.editar(req, res);
});

router.post("/cadastrarNU", function (req, res) {
    medidaController.cadastrarNU(req, res);
});

router.get("/listar/:fkEmpresa", function (req, res) {
    medidaController.listar(req, res);
});

module.exports = router;