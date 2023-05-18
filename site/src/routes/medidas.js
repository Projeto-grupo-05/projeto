var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/checa", function (req, res) {
    medidaController.checa(req, res);
});

router.post("/cadastrarNU", function (req, res) {
    medidaController.cadastrarNU(req, res);
});

module.exports = router;