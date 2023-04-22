const ctx = document.getElementById('dashboard');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['semana 1', 'semana 2', 'semana 3', 'semana 4'],
        datasets: [{
            label: 'Progresso',
            data: [10, 20, 21, 17, 15],
            borderWidth: 1
        }, {
            label: 'Tarefas',
            data: [12, 12, 14, 5, 2],
            borderWidth: 1,
        }, {
            label: 'Concluido',
            data: [8, 8, 13, 10, 13],
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