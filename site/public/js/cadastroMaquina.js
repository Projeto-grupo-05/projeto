var idMaquinas = document.getElementById("novoinputQtdMaquina");
var addMaquinas;

for (let i = 1; i <= 100; i++) {
    addMaquinas += "<option value = '1'>" + i + "</option>";
}

idMaquinas.innerHTML = addMaquinas;

function cadastrarMaquina() {
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var fabricante = novoinputFabricante.value;
    var modelo = inputModelo.value;
    var cor = inputCor.value;
    var dtFabricacao = novoinputDtFabricacao.value;
    var ucp = inputUcp.value;
    var ram = inputRam.value;
    var so = inputSo.value;
    var qtdMaquina = novoinputQtdMaquina.value;

    if (fabricante == "" || modelo == "" || cor == "" || ucp == "" || ram == "") {
        alert('Preencha todos os campos!');
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
            fabricanteServer: fabricante,
            modeloServer: modelo,
            corServer: cor,
            dtFabricacaoServer: dtFabricacao,
            ucpServer: ucp,
            ramServer: ram,
            soServer: so,
            qtdMaquinaServer: qtdMaquina
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

function sumirMensagem() {
    cardErro.style.display = "none"
}