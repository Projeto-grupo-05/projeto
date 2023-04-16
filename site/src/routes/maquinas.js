var express = require("express");
var router = express.Router();

var maquinasController = require("../controllers/maquinasController");

router.get("/listar/:fkEmpresa", function (req, res) {
    maquinasController.listar(req, res);
});

router.put("/editar/:idMaquina", function (req, res) {
    maquinasController.editar(req, res);
});

router.delete("/excluirMaquina/:idMaquina", function (req, res) {
    maquinasController.excluirMaquina(req, res);

//Recebendo os dados do html e direcionando para a função cadastrar de maquinaController.js
router.post("/cadastrar", function (req, res) {
    maquinaController.cadastrar(req, res);
})

});

module.exports = router;