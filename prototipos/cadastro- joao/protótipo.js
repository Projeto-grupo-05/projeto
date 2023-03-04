const proximo = document.getElementById('oi');
const seta = document.getElementById('arrowLeft');
const caixadados2 = document.getElementById('caixadados2');

proximo.addEventListener('click', () => {
    
    setTimeout(() => {
        caixadados2.style.opacity = 1;
        arrowLeft.style.opacity = 1;            
    }, 200);
    caixadados2.style.display = 'flex';
    arrowLeft.style.display = 'flex';

})
7
seta.addEventListener('click', () => {
    
    setTimeout(() => {
        caixadados2.style.opacity = 0;            
        seta.style.opacity = 0;
        setTimeout(() => {
            caixadados2.style.display = 'none'
            seta.style.display = 'none';
        }, 400);
    }, 400);
    
})