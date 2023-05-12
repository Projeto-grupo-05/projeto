/*var idMaquinas = document.getElementById("novoinputQtdMaquina");
var addMaquinas;

for (let i = 1; i <= 100; i++) {
    addMaquinas += "<option value = '1'>" + i + "</option>";
}

idMaquinas.innerHTML = addMaquinas;
*/

function cadastrarMaquina() {
    //aplicar variável do session storage
    
    var idEmpresa = sessionStorage.ID_EMPRESA;
    var modelo = inputModelo.value;
    var cor = inputCor.value;
    var dtFabricacao = novoinputDtFabricacao.value;
    var hostName = inputHost.value;
    var fabricante = inputFabricante.value;

    if (dtFabricacao == "" || modelo == "" || cor == "" || hostName == "") {
        alert('Preencha todos os campos!');

        return false;
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrarMaquina", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
        
            modeloServer: modelo,
            corServer: cor,
            dtFabricacaoServer: dtFabricacao,
            hostNameServer: hostName,
            fabricanteServer: fabricante,
            idEmpresaServer: idEmpresa
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert('Cadastro realizado com sucesso! Redirecionando para tela de Listagem...');

            setTimeout(() => {
                window.location = "../listagem_maquina.html";
            }, "500")

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}
