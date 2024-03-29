var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/cadastrarInterno", function (req, res) {
    usuarioController.cadastrarInterno(req, res);
});

router.post("/verificarUsuario", function (req, res) {
    usuarioController.verificarUsuario(req, res);
});

router.post("/cadastrarEmpre", function (req, res) {
    usuarioController.cadastrarEmpre(req, res);
});

router.post("/cadastrarMaquina", function (req, res) {
    usuarioController.cadastrarMaquina(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/autenticarT", function (req, res) {
    usuarioController.autenticarToken(req, res);
})

module.exports = router;