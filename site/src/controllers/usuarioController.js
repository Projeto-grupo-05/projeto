var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var token = req.body.toeknServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } if (token == undefined) {
        res.status(400).send("Seu toekn está indefinida!");
    } else {

        
        usuarioModel.entrar(email, senha, token)

            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var idEmpresa = req.body.idEmpresaServer;
    console.log(idEmpresa+' sent')

    // Faça as validações dos valores
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarInterno(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var idEmpresa = req.body.idEmpresaServer;
    var idGerente = req.body.idGerenteServer;
    console.log(idEmpresa+' sent')

    // Faça as validações dos valores
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarInterno(nome, email, senha, idEmpresa, idGerente)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function autenticarToken(req, res) {
    console.log('oie auetenticart token')
    var token = req.body.tokenServer;

    if (token == undefined) {
        res.status(400).send("Seu token está undefined!");
    } else {

        usuarioModel.pesquisarToken(token)
            .then(function (resultado) {
                if (resultado.length == 1) {
                    console.log(resultado);
                    res.json(resultado[0]);
                } else {
                    res.status(403).send("TOKEN INVÁLIDO/NÃO EXISTE");
                }
            }).catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }   
}

function cadastrarMaquina(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fabricante = req.body.fabricanteServer;
    var modelo = req.body.modeloServer;
    var cor = req.body.corServer;
    var fabricacao = req.body.dtFabricacaoServer;
    var ucp = req.body.ucpServer;
    var ram = req.body.ramServer;
    var so = req.body.soServer;
    var hostName = req.body.hostNameServer;
    var qtdEspaco = req.body.qtdEspacoServer;
    var idEmpresa = req.body.idEmpresaServer;

    // Faça as validações dos valores
    if (fabricante == undefined) {
        res.status(400).send("Seu fabricante está undefined!");
    } else if (modelo == undefined) {
        res.status(400).send("Seu modelo está undefined!");
    } else if (cor == undefined) {
        res.status(400).send("Sua cor está undefined!");
    } else if (fabricacao == undefined) {
        res.status(400).send("Sua fabricacao está undefined!");
    } else if (ucp == undefined) {
        res.status(400).send("Sua ucp está undefined!");
    } else if (ram == undefined) {
        res.status(400).send("Sua ram está undefined!");       
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarMaquina(fabricante, modelo, cor, fabricacao
            ,ucp, ram, so, hostName, qtdEspaco, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarEmpre(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var codigo = req.body.codigoServer;
    var nomeEmpresaSocial = req.body.nomeSocialServer;
    var nomeEmpresaFantasia = req.body.nomeFantasiaServer;
    var cnpj = req.body.cnpjServer;
    var telefone = req.body.telefoneServer;
    var email = req.body.emailServer;
    var logradouro = req.body.logradouroServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var cidade = req.body.cidadeServer;
    var cep = req.body.cepServer;
    var estado = req.body.estadoServer;

    // Faça as validações dos valores
    if (nomeEmpresaSocial == undefined) {
        res.status(400).send("Seu nome empresa social está undefined!");
    } else if (nomeEmpresaFantasia == undefined) {
        res.status(400).send("Seu nome mepresa fantasia está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Sua cep está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("Sua logradouro está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Sua telefone está undefined!");
    } else if (codigo == undefined) {
        res.status(400).send("Sua codigo está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Sua email está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Sua numero está undefined!");
    } else if (complemento == undefined) {
        res.status(400).send("Sua complemento está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Sua estado está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEmpre(codigo, nomeEmpresaFantasia, nomeEmpresaSocial, cnpj, telefone, email,
            logradouro, numero, complemento, cidade, cep, estado)
            .then(
                function (resultado) {
                    res.json(resultado);
                    console.log("MANO TA INDO");
                }
            ).catch(
                function (erro) {
                    console.log("MANO TA INDO NAO VEI, AJUDA!!");
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    cadastrar,
    cadastrarMaquina,
    listar,
    cadastrarInterno,
    cadastrarEmpre,
    autenticarToken,
    testar
}