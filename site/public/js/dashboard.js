const ctx = document.getElementById('dashboard');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
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
            backgroundColor:[ `rgb(54, 128, 194)`],
            tension: 0.1
        }, {
            label: 'Concluido',
            data: [8, 8, 13, 10, 13],
            fill: false,
            borderColor: 'rgb(29, 142, 74)  ',
            backgroundColor:[`rgb(29, 142, 74)`],
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