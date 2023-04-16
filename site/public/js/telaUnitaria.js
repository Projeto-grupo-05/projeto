function verificarMaquina() {
    //aplicar variável do session storage
    //sessionStorage.ID_MAQUINA = idMaquina;
    var idMaquina = 3;
    // Enviando o valor da nova input
    
    fetch(`/maquinas/verificarMaquina/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                // comentário
                buscarSO.innerHTML =  resposta[0].SO;
                buscarRAM.innerHTML = resposta[0].RAM;
                buscarArmazenamento.innerHTML = resposta[0].armazenamento;
                buscarUCP.innerHTML = resposta[0].UCP;
                buscarModelo.innerHTML = resposta[0].modelo;
                buscarCor.innerHTML = resposta[0].cor;
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
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
