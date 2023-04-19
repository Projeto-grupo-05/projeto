const fkGerente = (sessionStorage.FK_GERENTE);
const menuU = document.getElementById('menuLateral');
const menuG = document.getElementById('menuLateralG');

if (fkGerente != 'null') {
    // Configuração do menu
    menuU.style.setProperty("display", "block", "important");

    menuG.style.setProperty("display", "none", "important");
}else{
    menuU.style.setProperty("display", "none", "important");
    
    menuG.style.setProperty("display", "block", "important");
}