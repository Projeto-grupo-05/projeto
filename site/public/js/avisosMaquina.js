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
                    avisos.innerHTML += `<tr>
                        <td>Máquina: id${resposta[i].idMaquina}</td>
                        <td>Nome: ${resposta[i].nome}</td>
                        <td>Problema: ${resposta[i].descricaoProblema}</td>
                        <td>Solucao: ${resposta[i].descricaoSolucao}</td>
                        <td>-</td>
                        </tr>`;
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