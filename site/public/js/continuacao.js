
function swalLoginError() {
    Swal.fire(
        'Falha ao entrar!',
        'Preencha todos os campos para prosseguir.',
        'warning'
    )
}

function swalEmailError() {
    Swal.fire(
        'Falha ao entrar!',
        'Fornceça um e-mail válido!',
        'error'
    )
}

function swalEmailAlreadyExists() {
    Swal.fire(
        'Falha ao Cadastrar!',
        'Email já esta em uso!',
        'error'
    )
}

function swalEmptyFields() {
    Swal.fire(
        'Falha ao Cadastrar!',
        'Há campos vazios!',
        'error'
    )
}

function swalPassword() {
    Swal.fire(
        'Senha inválida!',
        'Digite uma senha maior que 5 caracteres!',
        'error'
    )
}

function swalWrongPassword() {
    Swal.fire(
        'Senha inválida!',
        'Confirme novamente sua senha!',
        'error'
    )
}

function swalLoginInexistente() {
    Swal.fire({
        icon: 'error',
        title: 'Erro ao entrar!',
        text: 'Parece que não está cadastrado em nosso sistema!',
        footer: '<a href="cadastroFunc.html">Deseja cadastrar-se? Clique aqui!</a>'
    })
}

function verificarValidacao() {
    const regexEmail = /\S+@\S+.\S+/;
    const verificaEmail = regexEmail.test(inputEmail.value);


    if (inputEmail.value == "" || inputSenha.value == "" || inputConfirmaSenha.value == "") {
        swalEmptyFields();
    } else if(inputSenha.value.length <= 4) {
        swalPassword();
    } else if(inputConfirmaSenha.value != inputSenha.value){
        swalWrongPassword();
    } else if (!verificaEmail) {
        swalEmailError();
    } else {
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
    }
}
