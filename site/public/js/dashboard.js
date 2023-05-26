const ctx = document.getElementById('dashboard');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
        datasets: [{
            label: 'Tarefas',
            data: [12, 12, 14, 5, 2],
            fill: false,
            borderColor: 'rgb(222, 42, 37)',
            backgroundColor: [`rgb(222, 42, 37)`],
            tension: 0.1
        }, {
            label: 'Progresso',
            data: [10, 20, 21, 17, 15],
            fill: false,
            borderColor: 'rgb(54, 128, 194)',
            backgroundColor: [`rgb(54, 128, 194)`],
            tension: 0.1
        }, {
            label: 'Concluido',
            data: [8, 8, 13, 10, 13],
            fill: false,
            borderColor: 'rgb(29, 142, 74)',
            backgroundColor: [`rgb(29, 142, 74)`],
            tension: 0.1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                borderWidth: 30
            },
            x: {
                grid: {
                    offset: true
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 16
                    }
                }
            }
        }
    }
});

/*<option value="">Janeiro</option>
<option value="">Fevereiro</option>
<option value="">Março</option>
*/

let fkEmpresa = sessionStorage.ID_EMPRESA;

// window.onload = obterDadosGrafico(fkEmpresa);

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
function obterDadosGrafico(fkEmpresa) {
    // alterarTitulo(fkEmpresa)

    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let semana = document.getElementById('semana').value;


    fetch(`/medidas/ultimas/${fkEmpresa}/${ano}/${mes}/${semana}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta, fkEmpresa);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resposta, fkEmpresa) {
    console.log('iniciando plotagem do gráfico...');
    let weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    let labels = [];

    for(i = 0; i < 7; i++){
        dia = resposta.dias[i];
        labels.push(`${dia} + " - " + ${weekdays[getDay(dia)]}`);
    }

    console.log(labels);
    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Tarefas',
            data: [12, 12, 14, 5, 2],
            fill: false,
            borderColor: 'rgb(222, 42, 37)',
            backgroundColor: [`rgb(222, 42, 37)`],
            tension: 0.1
        }, {
            label: 'Progresso',
            data: [10, 20, 21, 17, 15],
            fill: false,
            borderColor: 'rgb(54, 128, 194)',
            backgroundColor: [`rgb(54, 128, 194)`],
            tension: 0.1
        }, {
            label: 'Concluido',
            data: [8, 8, 13, 10, 13],
            fill: false,
            borderColor: 'rgb(29, 142, 74)',
            backgroundColor: [`rgb(29, 142, 74)`],
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

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
    let myChart = new Chart(
        document.getElementById('dashboard'),
        config
    )
}
