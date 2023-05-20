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

                for (let i = 0; i < resposta.length; i++) {
                    avisos.innerHTML += `
                    <div class="box-maquina">
                        <div class="box-title">
                            <span class="bold-24">Máquina: ${resposta[i].hostname}</span>
                        </div>
                        <div class="box-content sbold-16">
                            <div><span class="xbold-16">Responsável: </span><span>${resposta[i].nome}</span></div>
                            <div class="mt-10"><span class="xbold-16">Problema: </span><span>${resposta[i].descricaoProblema}</span></div>
                            <div class="mt-10"><span class="xbold-16">Solucao: </span><span>${resposta[i].descricaoSolucao}</span></div>
                            <div class="mt-10"><span class="xbold-16">Data e hora: </span><span>${resposta[i].dataHora}</span></div>
                            <div class="mt-10"><span class="xbold-16">Componente: </span><span></span></div>
                        </div>
                    </div>
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

/*<div class="box-content sbold-16">
                            <div><span class="xbold-16">Responsável: </span><span>${resposta[i].nome}</span></div>
                            <div class="mt-10"><span class="xbold-16">Problema: </span><span>${resposta[i].descricaoProblema}</span></div>
                            <div class="mt-10"><span class="xbold-16">Solucao: </span><span>${resposta[i].descricaoSolucao}</span></div>
                            <div class="mt-10"><span class="xbold-16">Data e hora: </span><span>${resposta[i].dataHora}</span></div>
                            <div class="mt-10"><span class="xbold-16">Componente: </span><span></span></div>
                        </div>*/

    fetch(`/maquinas/listarAvisosPendentes/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {

        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                for (let i = 0; i < resposta.length; i++) {
                    avisosPendentes.innerHTML += `
                    <div class="box-maquina">
                        <div class="box-title">
                            <span class="bold-24">Máquina: ${resposta[i].hostname}</span>
                        </div>
                        
                    </div>
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