let fkEmpresa = sessionStorage.ID_EMPRESA;
let MyChart;
let dados;

let gerou = false;
let weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
let hoje = new Date();

checkAgora.checked = true;
window.onload = obterDadosGrafico(fkEmpresa);
window.onload = obterDadosKPI(fkEmpresa);

// function alterarTitulo(fkEmpresa) {
//     var tituloAquario = document.getElementById("tituloAquario")
//     tituloAquario.innerHTML = "Últimas medidas de Temperatura e Umidade do <span style='color: #e6005a'>Aquário " + fkEmpresa + "</span>"
// }

// O gráfico é construído com três funções:
// 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
// 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela
// 3. atualizarGrafico -> Atualiza o gráfico, trazendo novamente dados do Banco

// Esta função *obterDadosGrafico* busca os últimos dados inseridos em tabela de medidas.
// para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
// A função *obterDadosGrafico* também invoca a função *plotarGrafico*

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models

var maqTotais;

function obterDadosKPI(fkEmpresa) {
    ano = hoje.getFullYear();
    mes = hoje.getMonth() + 1;
    dia = hoje.getDate();

    contaMaq(fkEmpresa);

    let data = "" + ano + "-" + mes + "-" + dia;
    let maqPendente;
    let maqProgresso;
    let maqFunfando;

    for (c = 1; c < 3; c++) {
        fetch(`/medidas/ultimas/${fkEmpresa}/${data}/${c}/0`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();
                    switch (resposta[0].conjunto) {
                        case 1:
                            maqProgresso = resposta[0].contagem;
                            document.getElementById('numConcerto').innerHTML = `${maqProgresso}`;
                            break;
                        case 2:
                            maqPendente = resposta[0].contagem;
                            document.getElementById('numAlerta').innerHTML = `${maqPendente}`;
                            break;
                    }
                });

                if (maqProgresso !== undefined && maqPendente !== undefined) {
                    maqFunfando = (maqTotais - maqPendente) - maqProgresso;
                    document.getElementById('numOperacao').innerHTML = `${maqFunfando}`;
                }
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });
    }



    setTimeout(() => obterDadosKPI(fkEmpresa), 5000);

}

function contaMaq(fkEmpresa) {
    fetch(`/medidas/contaMaq/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                maqTotais = resposta[0].contagem;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }

    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function obterDadosGrafico(fkEmpresa) {
    // alterarTitulo(fkEmpresa)
    let ano;
    let mes;
    let semana;
    let diaMaximo;
    let diaInicio;

    if (document.getElementById('checkAgora').checked) {
        let hoje = new Date();
        ano = hoje.getFullYear();
        mes = hoje.getMonth() + 1;
        diaMaximo = hoje.getDate();
    } else {
        ano = document.getElementById('ano').value;
        mes = document.getElementById('mes').value;
        semana = document.getElementById('semana').value;
        diaMaximo = 7 * semana;
        console.log("To entrando aqui")
    }
    diaInicio = diaMaximo - 6;

    let resultadoGeral =
    {
        pendentes: [],
        progresso: [],
        concluidos: [],
        dias: []
    };

    for (c = 0; c < 3; c++) {

        for (i = diaInicio; i <= diaMaximo; i++) {
            console.log("To entrando na dash")
            let data = "" + ano + "-" + mes + "-" + i;
            let dataDate = new Date(data);

            if (dataDate > hoje) {
                break;
            }

            if (c == 0 && valDate(ano, mes, i)) {
                resultadoGeral.dias.push(data);
            }

            fetch(`/medidas/ultimas/${fkEmpresa}/${data}/${c}/${i}`, { cache: 'no-store' }).then(function (response) {
                if (response.ok) {
                    response.json().then(function (resposta) {
                        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                        resposta.reverse();
                        switch (resposta[0].conjunto) {
                            case 0:
                                resultadoGeral.concluidos[resultadoGeral.dias.indexOf("" + ano + "-" + mes + "-" + resposta[0].dia)] = resposta[0].contagem;
                                break;
                            case 1:
                                resultadoGeral.progresso[resultadoGeral.dias.indexOf("" + ano + "-" + mes + "-" + resposta[0].dia)] = resposta[0].contagem;
                                break;
                            case 2:
                                resultadoGeral.pendentes[resultadoGeral.dias.indexOf("" + ano + "-" + mes + "-" + resposta[0].dia)] = resposta[0].contagem;
                                console.log(resultadoGeral);
                                break;
                        }
                        chamaGraf(resultadoGeral);
                    });
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                }
            })
                .catch(function (error) {
                    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
                });
        }
    }
}

function chamaGraf(resultadoGeral) {
    if (gerou) {
        atualizarGrafico(resultadoGeral, dados, MyChart)
    } else {
        gerou = true;
        plotarGrafico(resultadoGeral);
    }
}
// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e,
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resultadoGeral) {

    let labels = [];

    for (i = 0; i < 7; i++) {
        dia = resultadoGeral.dias[i];
        labels.push(`${dia}`);
    }

    // console.log(labels);
    // Criando estrutura para plotar gráfico - dados
    dados = {
        labels: labels,
        datasets: [{
            label: 'Pendentes',
            data: resultadoGeral.pendentes,
            fill: false,
            borderColor: 'rgb(222, 42, 37)',
            backgroundColor: [`rgb(222, 42, 37)`],
            tension: 0.1
        }, {
            label: 'Em Progresso',
            data: resultadoGeral.progresso,
            fill: false,
            borderColor: 'rgb(54, 128, 194)',
            backgroundColor: [`rgb(54, 128, 194)`],
            tension: 0.1
        }, {
            label: 'Concluido',
            data: resultadoGeral.concluidos,
            fill: false,
            borderColor: 'rgb(29, 142, 74)',
            backgroundColor: [`rgb(29, 142, 74)`],
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    // console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    // for (i = 0; i < resposta.length; i++) {
    //     var registro = resposta[i];
    //     labels.push(registro.momento_grafico);
    //     dados.datasets[0].data.push(registro.umidade);
    //     dados.datasets[1].data.push(registro.temperatura);
    // }

    // console.log('----------------------------------------------')
    // console.log('O gráfico será plotado com os respectivos valores:')
    // console.log('Labels:')
    // console.log(labels)
    // console.log('Dados:')
    // console.log(dados.datasets)
    // console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'line',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela
    MyChart = new Chart(
        document.getElementById('dashboard'),
        config
    )
}

function atualizarGrafico(resultadoGeral, dados, myChart) {

    dados.labels = []; // apagar o primeiro
    dados.datasets[0].data = [];  // apagar o primeiro de umidade
    dados.datasets[1].data = [];  // apagar o primeiro de temperatura
    dados.datasets[2].data = [];  // apagar o primeiro de temperatura

    for (i = 0; i < resultadoGeral.dias.length; i++) {
        dia = new Date(resultadoGeral.dias[i]);
        dados.labels.push(`${weekdays[dia.getDay()]}`);
        dados.datasets[0].data.push(resultadoGeral.pendentes[i]);
        dados.datasets[1].data.push(resultadoGeral.progresso[i]);
        dados.datasets[2].data.push(resultadoGeral.concluidos[i]);
    }
    myChart.update();
}

function valDate(ano, mes, i) {


    let day = i;
    let month = mes;
    let year = ano;

    let listaDias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month == 1 || month > 2) {
        if (day > listaDias[month - 1]) {
            return false;
        }
    } else if (month == 2) {
        let bissexto = false;
        if ((!(year % 4) && year % 100) || !(year % 400)) bissexto = true;

        if ((bissexto == false) && (day >= 29)) {
            return false;
        }
        else
            if ((bissexto == true) && (day > 29)) {
                return false;
            }
    }
    return true;
}