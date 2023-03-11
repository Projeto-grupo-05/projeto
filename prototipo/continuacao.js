const proximo = document.getElementById('butao');
const caixadados2 = document.getElementById('formulario');
const caixadados = document.getElementById('formulario-back');
const seta = document.getElementById('arrowLeft');

proximo.addEventListener('click', () => {
    
    setTimeout(() => {
        caixadados2.style.opacity = 1;
        caixadados.style.opacity = 0;
        arrowLeft.style.opacity = 1;            
    }, 500);
    caixadados2.style.display = 'flex';
    caixadados.style.display = 'none';
    arrowLeft.style.display = 'flex';
})

seta.addEventListener('click', () => {
    
    setTimeout(() => {
        caixadados2.style.opacity = 0;
        caixadados.style.opacity = 1;           
        seta.style.opacity = 0;
        setTimeout(() => {
            caixadados.style.display = 'flex';
            caixadados2.style.display = 'none';
            seta.style.display = 'none';
        }, 400);
    }, 400);
    
})