function verificarMaquina() {
    //aplicar variável do session storage
    // var idMaquina = 3;
    // Enviando o valor da nova input

    fetch(`/maquinas/verificarMaquina/${sessionStorage.ID_MAQUINA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                // FALTA NOME DA MÁQUINA
                nomeMaquina.innerHTML = resposta[0].hostname;
                buscarSO.innerHTML = resposta[0].SO;
                buscarRAM.innerHTML = resposta[0].RAM;
                buscarArmazenamento.innerHTML = resposta[0].armazenamento;
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

const ctx = document.getElementById('graficoIncidente');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['10:30', '10:35', '10:40', '10:45', '10:50', '10:55'],
        datasets: [{
            label: '# CPU',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
        }, {
            label: '# RAM',
            data: [2, 4, 13, 10, 7, 12],
            borderWidth: 1
        }, {
            label: '# HDD/SSD',
            data: [10, 39, 26, 33, 27, 15],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
