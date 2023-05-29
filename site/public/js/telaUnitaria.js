function verificarMaquina() {
    //aplicar variável do session storage
    var idMaquina = sessionStorage.ID_MAQUINA;
    // Enviando o valor da nova input
    /*sessionStorage.ID_MAQUINA*/
    fetch(`/maquinas/verificarMaquina/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                // FALTA NOME DA MÁQUINA
                nomeMaquina.innerHTML = resposta[0].hostname;
                buscarSO.innerHTML = resposta[0].SO;
                buscarRAM.innerHTML = resposta[0].RAM;
                buscarArmazenamento.innerHTML = resposta[0].discoDisponivel;
                buscarUCP.innerHTML = resposta[0].UCP;
                buscarModelo.innerHTML = resposta[0].modelo;
                buscarCor.innerHTML = resposta[0].cor;

                //MUDANDO A COR DO STATUS, FALTA PARÂMETROS
                //if (resposta[0].RAM == "gg") {
                //    cor.innerHTML = `<i class="ri-checkbox-blank-circle-fill" style="color: red"></i>`;
                // }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

    return false;
}


//dashboard ===============================================================================♥
//=========================================================================================♥

let proximaAtualizacao;

function obterDadosGrafico() {
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }
    var idMaquina = sessionStorage.ID_MAQUINA
    fetch(`/maquinas/buscarUltimasMedidas/${idMaquina}`, { cache: 'no-store' }).then(function (response) {

        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta, idMaquina);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
};

function plotarGrafico(resposta, idMaquina) {
    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: '# CPU',
            data: [],
            borderWidth: 1,
        }, {
            label: '# RAM',
            data: [],
            borderWidth: 1
        }
    ]
    };



    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)


    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        var dataIncidente = new Date(resposta[0].momento_grafico);
        var hora = dataIncidente.getUTCHours();
        var minuto = dataIncidente.getMinutes();
        var teste = `${hora}:${minuto}`

        dados.labels.push(teste);
        dados.datasets[0].data.push(registro.nivelCPU);
        dados.datasets[1].data.push(registro.nivelRAM);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'line',
        data: dados,
    };

    const ctx = document.getElementById('graficoIncidente');

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        ctx,
        config
    );

    setTimeout(() => atualizarGrafico(idMaquina, dados, myChart), 2000);
}

function atualizarGrafico(idMaquina, dados, myChart) {

    fetch(`/maquinas/atualizaGrafico/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) { //ESSA PORRA DE NOVO REGISTRO É A 'RESPOSTA'

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);


                if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].momento_grafico)
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")

                } else {
                    // dados.labels.shift(); // apagar o primeiro
                    // dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                    var dataIncidente = new Date(novoRegistro[0].momento_grafico);
                    var hora = dataIncidente.getUTCHours();
                    var minuto = dataIncidente.getMinutes();
                    var teste = `${hora}:${minuto}`

                    dados.labels.shift();
                    dados.labels.push(teste);

                    dados.datasets[0].data.shift();
                    dados.datasets[0].data.push(novoRegistro[0].nivelCPU);

                    dados.datasets[1].data.shift();
                    dados.datasets[1].data.push(novoRegistro[0].nivelRam);



                    // dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    // dados.datasets[0].data.push(novoRegistro[0].luminosidade); // incluir uma nova medida de umidade

                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(idMaquina, dados, myChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idMaquina, dados, myChart), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}