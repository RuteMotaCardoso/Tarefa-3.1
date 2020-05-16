const urlBase = "https://fcawebbook.herokuapp.com"
let isNew = true


//***********************************************************************************************************************/
//ARRAY COM Lista de Tipos de Tarefas Voluntários 

//***********************************************************************************************************************/
var tipoTarefasVoluntarios = [
    {"idTipoTarefa":1,"tipo":"Recepção","cor":"#90EE90","active":null},
    {"idTipoTarefa":2,"tipo":"Guarda roupa","cor":"#7fffd4","active":null},
    {"idTipoTarefa":3,"tipo":"Cafetaria","cor":"#6495ed","active":null},
    {"idTipoTarefa":4,"tipo":"Apoio nas Salas","cor":"#daa520","active":null},
    {"idTipoTarefa":5,"tipo":"Apoio nos Corredores","cor":"#e9967a","active":null},
    {"idTipoTarefa":6,"tipo":"Apoio aos Oradores e Membros da Comissão","cor":"#7fff00","active":null},
]

function standardize_color(str){
    var ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = str;
    return ctx.fillStyle;
}

 window.onload = () => {
    const btnLogout = document.getElementById("logout")
    // "logout" da área privada do back-office
    btnLogout.addEventListener("click", function() {
      // Teste
      window.location.replace("../index.html")  
    });

    $("#tblTipoTarefas").on("click", "tr", function(ev) {
        // console.log($(this).find("#cor").text());
        // console.log($(this));
        //let celulaCor = $(this).find("#cor")
        if (ev.target.tagName === 'TD') {
            $(this).css('background-color',$(this).find("#cor").text());
        }
    });

    // References to HTML objects   
    const tblTipoTarefas = document.getElementById("tblTipoTarefas")
    const frmTipoTarefa = document.getElementById("frmTipoTarefa")
  

//***********************************************************************************************************************/
//FORMULÁRIO DE tarefa DA Lista de Tipos de Tarefas Voluntários 
// ********************   OPERAÇÕES DE INSERIR E ALTERAR SÃO EFETUADAS APENAS EM MEMÓRIA!   ********************************

//***********************************************************************************************************************/
    frmTipoTarefa.addEventListener("submit", async (event) => {
        event.preventDefault()
        const txtTipo = document.getElementById("txtTipo").value
        const txtCor = document.getElementById("txtCor").value
        let txtTipoTarefaId = document.getElementById("txtTipoTarefaId").value
        if (txtTipoTarefaId === "")
            txtTipoTarefaId = tipoTarefasVoluntarios.length+1;

        // Verifica flag isNew para saber se se trata de uma adição ou de um atualização dos dados de uma tarefa voluntário
        let response
        if (isNew) {
            // Adiciona Tarefa ao array de tipoTarefasVoluntarios em memória
            const newTipoTarefa = {
                "idTipoTarefa":txtTipoTarefaId,
                "tipo":txtTipo,
                "cor":txtCor
             };
            tipoTarefasVoluntarios.push(newTipoTarefa);
        } else {
            // Atualiza Tarefa Voluntário em memória
            const newTipoTarefa = {
                "idTipoTarefa":txtTipoTarefaId,
                "tipo":txtTipo,
                "cor":txtCor
             };
            let posEditar = tipoTarefasVoluntarios.findIndex(x => x.idTipoTarefa == txtTipoTarefaId);
            tipoTarefasVoluntarios[posEditar] = newTipoTarefa;
        }
        isNew = true
        renderTipoTarefas()
    })



    const renderTipoTarefas = async () => {
        frmTipoTarefa.reset()
        //***********************************************************************************************************************/
        //FORMATAR TABELA DE APRESENTAÇÃO DA Lista de Tipos de Tarefas Voluntários 

        //***********************************************************************************************************************/
        let strHtml = `
            <thead >
                <tr><th class='w-100 text-center bg-warning' colspan='4'>Lista de Tipos de Tarefas de Voluntários</th></tr>
                <tr class='bg-info'>
                    <th class='w-2'>#</th>
                    <th class='w-50'>Tipo</th>              
                    <th class='w-20'>Cor</th>
                    <th class='w-10'>Alterar</th>              
                </tr> 
            </thead><tbody>
        `

        //***********************************************************************************************************************/
        //APRESENTAR Lista de Tipos de Tarefas Voluntários 

        //***********************************************************************************************************************/
        const tipoTarefas = tipoTarefasVoluntarios;
        let i = 1
        for (const tarefa of tipoTarefas) {
            strHtml += `
                <tr style='background-color:${tarefa.cor}'>
                    <td>${i}</td>
                    <td>${tarefa.tipo}</td>
                    <td id='cor'>${tarefa.cor}</td>
                    <td>
                        <i id='${tarefa.idTipoTarefa}' class='fas fa-edit edit'></i>
                        <i id='${tarefa.idTipoTarefa}' class='fas fa-trash-alt remove'></i>
                    </td>
                </tr>
            `
            i++
        }
        strHtml += "</tbody>"
        tblTipoTarefas.innerHTML = strHtml


        
        //***********************************************************************************************************************/
        //EDITAR tarefa DA Lista de Tipos de Tarefas Voluntários  --> colocar dados no formulário

        //***********************************************************************************************************************/
        // Gerir o clique no ícone de Editar        
        const btnEdit = document.getElementsByClassName("edit")
        for (let i = 0; i < btnEdit.length; i++) {
            btnEdit[i].addEventListener("click", () => {
                isNew = false
                for (const tarefa of tipoTarefas) {
                    if (tarefa.idTipoTarefa == btnEdit[i].getAttribute("id")) {
                        document.getElementById("txtTipoTarefaId").value = tarefa.idTipoTarefa
                        document.getElementById("txtTipo").value = tarefa.tipo
                        document.getElementById("txtCor").value = standardize_color(tarefa.cor)
                    }
                }
            })
        }




        //***********************************************************************************************************************/
        //REMOVER tarefa DA Lista de Tipos de Tarefas Voluntários em MEMÓRIA!

        //***********************************************************************************************************************/
        // Gerir o clique no ícone de Remover        
        const btnDelete = document.getElementsByClassName("remove")
        for (let i = 0; i < btnDelete.length; i++) {
            btnDelete[i].addEventListener("click", () => {
                swal({
                    title: 'Tem a certeza?',
                    text: "Não será possível reverter a remoção!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Remover'
                }).then( () => {
                    let TipoTarefaId = btnDelete[i].getAttribute("id")
                    let posApagar = tipoTarefasVoluntarios.findIndex(x => x.idTipoTarefa == TipoTarefaId);
                    if (posApagar >= 0) {
                        tipoTarefasVoluntarios.splice(posApagar, 1);
                        swal('Removido!', 'O Tipo de Tarefa Voluntário foi removido da Lista de Tipos de Tarefas.', 'success')
                    } else {
                        swal('Erro!', 'O Tipo de Tarefa Voluntário não foi encontrado na Lista de Tipos de Tarefas.', 'error')
                    }
                    renderTipoTarefas()
                })
            })
        }
    }
    renderTipoTarefas()
}