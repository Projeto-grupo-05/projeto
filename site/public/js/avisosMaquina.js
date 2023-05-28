function listarAvisos() {

    // sessionStorage.HOSTNAME = null;
    // sessionStorage.FABRICANTE = null;
    // sessionStorage.COR = null;
    // sessionStorage.MODELO = null;

    var fkEmpresa = sessionStorage.ID_EMPRESA;


    if (fkEmpresa == "") {
        console.log('Sem empresa!');
        return false;
    }

    fetch(`/maquinas/listarAvisos/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                var quantidadeIncidente = resposta.length;
                
                campoQtdeInc.innerHTML = quantidadeIncidente;

                for (let i = 0; i < resposta.length; i++) {
                    // INCIDENTE
                    var dataIncidente = new Date(resposta[i].dataHoraIncidente);
                    var dia = dataIncidente.getDate();
                    var mes = dataIncidente.getMonth() + 1;
                    var ano = dataIncidente.getFullYear();

                    var hora = dataIncidente.getUTCHours();
                    var minuto = dataIncidente.getMinutes();

                    // MANUTENÇÃO
                    var dataManutencao = new Date(resposta[i].dataHoraManutencao);
                    var diaM = dataManutencao.getDate();
                    var mesM = dataManutencao.getMonth() + 1;
                    var anoM = dataManutencao.getFullYear();

                    var horaM = dataManutencao.getUTCHours();
                    var minutoM = dataManutencao.getMinutes();

                    // CONCLUSAO
                    var dataConclusao = new Date(resposta[i].dataHoraSolucao);
                    var diaS = dataConclusao.getDate();
                    var mesS = dataConclusao.getMonth() + 1;
                    var anoS = dataConclusao.getFullYear();

                    var horaS = dataConclusao.getUTCHours();
                    var minutoS = dataConclusao.getMinutes();


                    avisos.innerHTML += `
                    <div class="box-maquina">
                        <div class="bg-verde-agua box-title">
                            <span class="bold-24">Máquina: ${resposta[i].hostname}</span>
                        </div>
                        <div class="box-content sbold-16" onclick="toDashboard(${resposta[i].idMaquina})">
                            <div><span class="xbold-16">Data e hora do incidente: </span><span>${dia}/${mes}/${ano} às ${hora}:${minuto}</span></div>
                            <div class="mt-10"><span class="xbold-16">Data e hora do início da manutenção: </span><span>${diaM}/${mesM}/${anoM} às ${horaM}:${minutoM}</span></div>
                            <div class="mt-10"><span class="xbold-16">Responsável: </span><span>${resposta[i].nome}</span></div>
                            <hr>
                            <div class="mt-10"><span class="xbold-16">Problema: </span><span>${resposta[i].descricaoProblema}</span></div>
                            <div class="mt-10"><span class="xbold-16">Solução: </span><span>${resposta[i].descricaoSolucao}</span></div>
                            <div class="mt-10"><span class="xbold-16">Data e hora de conclusão: </span><span>${diaS}/${mesS}/${anoS} às ${horaS}:${minutoS}</span></div>
                            <hr>
                        <div class="mt-10"><span class="xbold-16">Urgência RAM: </span><span>${resposta[i].urgenciaRAM}</span></span></div>
                            <div class="mt-10"><span class="xbold-16">Urgência CPU: </span><span>${resposta[i].urgenciaCPU}</span></span></div>
                            <div class="mt-10"><span class="xbold-16">Urgência Disco: </span><span>${resposta[i].urgenciaDisco}</span></span></div>
                        </div>
                    </div>
                    <hr>
                        `
                }

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function listarAvisosPendentes() {

    // sessionStorage.HOSTNAME = null;
    // sessionStorage.FABRICANTE = null;
    // sessionStorage.COR = null;
    // sessionStorage.MODELO = null;

    var fkEmpresa = sessionStorage.ID_EMPRESA;


    if (fkEmpresa == "") {
        console.log('Sem empresa!');
        return false;
    }

    fetch(`/maquinas/listarAvisosPendentes/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {

        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                var quantidadeIncidente = resposta.length;
                
                campoQtdeIncPen.innerHTML = quantidadeIncidente;

                for (let i = 0; i < resposta.length; i++) {
                    // INCIDENTE
                    var dataIncidente = new Date(resposta[i].dataHoraIncidente);
                    var dia = dataIncidente.getDate();
                    var mes = dataIncidente.getMonth() + 1;
                    var ano = dataIncidente.getFullYear();

                    var hora = dataIncidente.getUTCHours();
                    var minuto = dataIncidente.getMinutes();
                    avisosPendentes.innerHTML += `
                    <div class="box-alerta box-maquina">
                        <div class="box-title-alerta box-title">
                            <i class="ri-arrow-right-circle-fill atribuir-icon opacity-0" height="32" width="32"></i>
                            <span class="bold-24">Máquina: ${resposta[i].hostname}</span>
                            <i class="ri-arrow-right-circle-fill atribuir-icon" onclick="atribuirIncidente(${resposta[i].idIncidente}, ${resposta[i].fkUsuario}); dataAtual()"></i>
                        </div>
                        <div class="box-content-alerta box-content sbold-16" onclick="toDashboard(${resposta[i].idMaquina})">
                            <div class="mt-10"><span class="xbold-16">Data e hora do incidente: </span><span>${dia}/${mes}/${ano} às ${hora}:${minuto}</span></div>
                            <hr>
                            <div class="mt-10"><span class="xbold-16">Urgência RAM: </span><span>${resposta[i].urgenciaRAM}</span></span></div>
                            <div class="mt-10"><span class="xbold-16">Urgência CPU: </span><span>${resposta[i].urgenciaCPU}</span></span></div>
                            <div class="mt-10"><span class="xbold-16">Urgência Disco: </span><span>${resposta[i].urgenciaDisco}</span></span></div>
                        </div>
                    </div>
                    <hr>
                        `
                }

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}


function atribuirIncidente(idIncidente, idUsuario, data) {
    sessionStorage.ID_INCIDENTE = idIncidente;
    idIncidente = sessionStorage.ID_INCIDENTE;
    
    idUsuario = sessionStorage.ID_USUARIO;
    data = sessionStorage.DATE_TIME;

    fetch(`/maquinas/atribuirIncidente/${idIncidente}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario,
            dataServer: data
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            setTimeout(function () {
                console.log('deu certo a atribuirIncidente')
            }, 3000);


        } else if (resposta.status == 404) {
            console.log("ERRO 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function dataAtual(){
    const dataManutencao = new Date();
    const dia = dataManutencao.getDate();
    const mes = dataManutencao.getMonth() + 1;
    const ano = dataManutencao.getFullYear();

    const hora = dataManutencao.getHours();
    const minuto = dataManutencao.getMinutes();

    const formatada = `${ano}-${mes}-${dia} ${hora}:${minuto}`
    console.log(formatada);
    sessionStorage.DATE_TIME = `${ano}-${mes}-${dia} ${hora}:${minuto}`;
}

function listarAvisosProgresso() {

    // sessionStorage.HOSTNAME = null;
    // sessionStorage.FABRICANTE = null;
    // sessionStorage.COR = null;
    // sessionStorage.MODELO = null;

    var fkEmpresa = sessionStorage.ID_EMPRESA;


    if (fkEmpresa == "") {
        console.log('Sem empresa!');
        return false;
    }

/**/

    fetch(`/maquinas/listarAvisosProgresso/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {

        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                
                var quantidadeIncidente = resposta.length;
                
                campoQtdeIncPro.innerHTML = quantidadeIncidente;

                for (let i = 0; i < resposta.length; i++) {
                                        // INCIDENTE
                                        var dataIncidente = new Date(resposta[i].dataHoraIncidente);
                                        var dia = dataIncidente.getDate();
                                        var mes = dataIncidente.getMonth() + 1;
                                        var ano = dataIncidente.getFullYear();
                    
                                        var hora = dataIncidente.getUTCHours();
                                        var minuto = dataIncidente.getMinutes();
                    
                                        // MANUTENÇÃO
                                        var dataManutencao = new Date(resposta[i].dataHoraManutencao);
                                        var diaM = dataManutencao.getDate();
                                        var mesM = dataManutencao.getMonth() + 1;
                                        var anoM = dataManutencao.getFullYear();
                    
                                        var horaM = dataManutencao.getUTCHours();
                                        var minutoM = dataManutencao.getMinutes();
                    avisosProgresso.innerHTML += `
                    <div class="box-maquina">
                        <div class="bg-amarelo box-title">
                            <span class="bold-24">Máquina: ${resposta[i].hostname}</span>
                            <td><button onclick="configuraModal(${resposta[i].idIncidente})" type="button" class="btn" data-toggle="modal" data-target="#ExemploModalCentralizado">
                                            <i class="ri-error-warning-line"></i>
                                        </button>
                                    </td>
                        </div>
                        <div class="box-content sbold-16" onclick="toDashboard(${resposta[i].idMaquina})">
                            <div class="mt-10"><span class="xbold-16">Data e hora do incidente: </span><span>${dia}/${mes}/${ano} às ${hora}:${minuto}</span></div>
                            <div class="mt-10"><span class="xbold-16">Data e hora do início da manutenção: </span><span>${diaM}/${mesM}/${anoM} às ${horaM}:${minutoM}</span></div>
                            <div class="mt-10"><span class="xbold-16">Responsável: </span><span>${resposta[i].nome}</span></div>
                            <hr>
                        <div class="mt-10"><span class="xbold-16">Urgência RAM: </span><span>${resposta[i].urgenciaRAM}</span></span></div>
                            <div class="mt-10"><span class="xbold-16">Urgência CPU: </span><span>${resposta[i].urgenciaCPU}</span></span></div>
                            <div class="mt-10"><span class="xbold-16">Urgência Disco: </span><span>${resposta[i].urgenciaDisco}</span></span></div>
                        </div>
                        
                    </div>
                    <hr>
                        `
                }

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function toDashboard(idMaquina) {
  
    sessionStorage.ID_MAQUINA = idMaquina;
    window.location = "telaUnitaria.html";

}