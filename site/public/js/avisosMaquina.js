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
                        <div class="box-content sbold-16">
                            <div><span class="xbold-16">Data e hora do incidente: </span><span>${dia}/${mes}/${ano} às ${hora}:${minuto}</span></div>
                            <div class="mt-10"><span class="xbold-16">Data e hora do início da manutenção: </span><span>${diaM}/${mesM}/${anoM} às ${horaM}:${minutoM}</span></div>
                            <div class="mt-10"><span class="xbold-16">Responsável: </span><span>${resposta[i].nome}</span></div>
                            <hr>
                            <div class="mt-10"><span class="xbold-16">Problema: </span><span>${resposta[i].descricaoProblema}</span></div>
                            <div class="mt-10"><span class="xbold-16">Solução: </span><span>${resposta[i].descricaoSolucao}</span></div>
                            <div class="mt-10"><span class="xbold-16">Data e hora de conclusão: </span><span>${diaS}/${mesS}/${anoS} às ${horaS}:${minutoS}</span></div>
                            <div class="mt-10"><span class="xbold-16">Componente: </span><span></span></div>
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

/**/

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
                            <i class="ri-arrow-right-circle-fill atribuir-icon" onclick="atribuirIncidente()"></i>
                        </div>
                        <div class="box-content-alerta box-content sbold-16">
                            <div class="mt-10"><span class="xbold-16">Data e hora do incidente: </span><span>${dia}/${mes}/${ano} às ${hora}:${minuto}</span></div>
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
                            <td><button onclick="configuraModal(${resposta[i].idMaquina})" type="button" class="btn" data-toggle="modal" data-target="#ExemploModalCentralizado">
                                            <i class="ri-error-warning-line"></i>
                                        </button>
                                    </td>
                        </div>
                        <div class="box-content sbold-16">
                            <div class="mt-10"><span class="xbold-16">Data e hora do incidente: </span><span>${dia}/${mes}/${ano} às ${hora}:${minuto}</span></div>
                            <div class="mt-10"><span class="xbold-16">Data e hora do início da manutenção: </span><span>${diaM}/${mesM}/${anoM} às ${horaM}:${minutoM}</span></div>
                            <div class="mt-10"><span class="xbold-16">Responsável: </span><span>${resposta[i].nome}</span></div>
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

function atribuirIncidente(){

        fetch(`/maquinas/atribuirIncidente}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                hostname: iptHostname.value,
                fabricante: iptFabricante.value,
                modelo: iptModelo.value,
                cor: iptCor.value
            })
        }).then(function (resposta) {

            if (resposta.ok) {
                aviso.innerHTML = "Máquina atualizada com sucesso!";
                setTimeout(function () {
                    window.location = "./listagem_maquina.html"
                }, 4000);


            } else if (resposta.status == 404) {
                aviso.innerHTML = "ERRO 404!";
            } else {
                // throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}
