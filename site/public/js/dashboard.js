const ctx = document.getElementById('dashboard');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
            label: 'Tarefas',
            data: [12, 12, 14, 5, 2],
            backgroundColor: [`rgb(222, 42, 37)`],
            borderWidth: 3
        }, {
            label: 'Progresso',
            data: [10, 20, 21, 17, 15],
            backgroundColor:[ `rgb(54, 128, 194)`],
            borderWidth: 3
        }, {
            label: 'Concluido',
            data: [8, 8, 13, 10, 13],
            backgroundColor:[`rgb(29, 142, 74)`],
            borderWidth: 3
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