
function telefone(v) {
    v = v.replace(/\D/g, "")                 //Remove tudo o que não é dígito
    v = v.replace(/^(\d\d)(\d)/g, "($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d{4})(\d)/, "$1-$2")    //Coloca hífen entre o quarto e o quinto dígitos
    input_telefone.value = v;
}

function CNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, "");
    cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
    cnpj = cnpj.replace(/^(\d{2})[.](\d{3})(\d)/, "$1.$2.$3");
    cnpj = cnpj.replace(/^(\d{2})[.](\d{3})[.](\d{3})(\d)/, "$1.$2.$3/$4");
    cnpj = cnpj.replace(/^(\d{2})[.](\d{3})[.](\d{3})[/](\d{4})(\d)/, "$1.$2.$3/$4-$5");
    input_cnpj.value = cnpj;
};

function CEP(cep){
    cep = cep.replace(/\D/g, "");
    cep = cep.replace(/^(\d{5})(\d)/, "$1-$2");
    input_cep.value = cep;
}