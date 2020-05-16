const urlBase = "https://fcawebbook.herokuapp.com"
let isNew = true


//***********************************************************************************************************************/
//ARRAY COM LISTA DE Tarefas Voluntários 

//***********************************************************************************************************************/
var tarefasVoluntarios = [
    {"idTarefa":1,"nome":"Verificar participantes","data":"2020-06-01","tipo":"Recepção","duracao":"1 dia", "voluntario":"Sara Silva","active":null},
    {"idTarefa":2,"nome":"Entregar documentação","data":"2020-06-01","tipo":"Recepção","duracao":"Manhã","voluntario":"Duarte Oliveira","active":null},
    {"idTarefa":3,"nome":"Servir na cafetaria","data":"2020-06-01","tipo":"Cafetaria","duracao":"Tarde","voluntario":"Sara Silva","active":null},
    {"idTarefa":4,"nome":"Encaminhar oradores","data":"2020-06-01","tipo":"Apoio aos Oradores e Membros da Comissão","duracao":"1 dia","voluntario":"Pedro Duarte","active":null},
]
var tipoTarefasVoluntarios = [
    {"idTipoTarefa":1,"tipo":"Recepção","cor":"#90EE90","active":null},
    {"idTipoTarefa":2,"tipo":"Guarda roupa","cor":"#7fffd4","active":null},
    {"idTipoTarefa":3,"tipo":"Cafetaria","cor":"#6495ed","active":null},
    {"idTipoTarefa":4,"tipo":"Apoio nas Salas","cor":"#daa520","active":null},
    {"idTipoTarefa":5,"tipo":"Apoio nos Corredores","cor":"#e9967a","active":null},
    {"idTipoTarefa":6,"tipo":"Apoio aos Oradores e Membros da Comissão","cor":"#7fff00","active":null},
]

function getCorFromTipo(tipoStr) {
    let posTipo = tarefasVoluntarios.findIndex(x => x.tipo == tipoStr);
    return tipoTarefasVoluntarios[posTipo].cor;
}

window.onload = () => {
    const btnLogout = document.getElementById("logout")
    // "logout" da área privada do back-office
    btnLogout.addEventListener("click", function() {
      // Teste
      window.location.replace("../index.html")  
    });

    // Add a "checked" symbol when clicking on a list item
    //var list = document.querySelector('tr');
    //list.addEventListener('click', function(ev) {
    // https://stackoverflow.com/questions/12065329/adding-event-listeners-to-dynamically-added-elements-using-jquery
    $("#tblTarefas").on("click", "tr", function(ev) {
        if (ev.target.tagName === 'TD') {
            $(this).toggleClass('checked');
        }
    });

    // References to HTML objects   
    const tblTarefas = document.getElementById("tblTarefas")
    const frmTarefa = document.getElementById("frmTarefa")
  

//***********************************************************************************************************************/
//FORMULÁRIO DE tarefa DA LISTA DE Tarefas Voluntários 
// ********************   OPERAÇÕES DE INSERIR E ALTERAR SÃO EFETUADAS APENAS EM MEMÓRIA!   ********************************

//***********************************************************************************************************************/
    frmTarefa.addEventListener("submit", async (event) => {
        event.preventDefault()
        const txtName = document.getElementById("txtName").value
        const txtData = document.getElementById("txtData").value
        const txtDuracao = document.getElementById("txtDuracao").value
        const txtVoluntario = document.getElementById("txtVoluntario").value
        const txtTipo = document.getElementById("txtTipo").value
        let txtTarefaId = document.getElementById("txtTarefaId").value
        if (txtTarefaId === "")
            txtTarefaId = tarefasVoluntarios.length+1;

        // Verifica flag isNew para saber se se trata de uma adição ou de um atualização dos dados de uma tarefa voluntário
        let response
        if (isNew) {
            // Adiciona Tarefa ao array de TarefasVoluntarios em memória
            const newTarefa = {
                "idTarefa":txtTarefaId,
                "nome":txtName,
                "data":txtData,
                "duracao":txtDuracao,
                "voluntario":txtVoluntario,
                "tipo":txtTipo
             };
            tarefasVoluntarios.push(newTarefa);
        } else {
            // Atualiza Tarefa Voluntário em memória
            const newTarefa = {
                "idTarefa":txtTarefaId,
                "nome":txtName,
                "foto":"",
                "data":txtData,
                "duracao":txtDuracao,
                "voluntario":txtVoluntario,
                "tipo":txtTipo
             };
            let posEditar = tarefasVoluntarios.findIndex(x => x.idTarefa == txtTarefaId);
            tarefasVoluntarios[posEditar] = newTarefa;
        }
        isNew = true
        renderTarefas()
    })



    const renderTarefas = async () => {
        frmTarefa.reset()
        //***********************************************************************************************************************/
        //FORMATAR TABELA DE APRESENTAÇÃO DA LISTA DE Tarefas Voluntários 

        //***********************************************************************************************************************/
        let strHtml = `
            <thead >
                <tr><th class='w-100 text-center bg-warning' colspan='7'>Lista de Tarefas de Voluntários</th></tr>
                <tr class='bg-info'>
                    <th class='w-2'>#</th>
                    <th class='w-20'>Tipo</th>              
                    <th class='w-20'>Nome</th>
                    <th class='w-10'>Data</th>              
                    <th class='w-10'>Duração</th>              
                    <th class='w-15'>Voluntário</th>              
                    <th class='w-10'>Alterar</th>              
                </tr> 
            </thead><tbody>
        `

        //***********************************************************************************************************************/
        //APRESENTAR LISTA DE Tarefas Voluntários 

        //***********************************************************************************************************************/
        const tarefas = tarefasVoluntarios;
        let i = 1
        for (const tarefa of tarefas) {
            let concluida = ""
            if (i == 1)
             concluida = "class=\"checked\""
            strHtml += `
                <tr ${concluida} style='background-color:${getCorFromTipo(tarefa.tipo)}'>
                    <td>${i}</td>
                    <td>${tarefa.tipo}</td>
                    <td>${tarefa.nome}</td>
                    <td>${tarefa.data}</td>
                    <td>${tarefa.duracao}</td>
                    <td>${tarefa.voluntario}</td>
                    <td>
                        <i id='${tarefa.idTarefa}' class='fas fa-edit edit'></i>
                        <i id='${tarefa.idTarefa}' class='fas fa-trash-alt remove'></i>
                    </td>
                </tr>
            `
            i++
        }
        strHtml += "</tbody>"
        tblTarefas.innerHTML = strHtml


        
        //***********************************************************************************************************************/
        //EDITAR tarefa DA LISTA DE Tarefas Voluntários  --> colocar dados no formulário

        //***********************************************************************************************************************/
        // Gerir o clique no ícone de Editar        
        const btnEdit = document.getElementsByClassName("edit")
        for (let i = 0; i < btnEdit.length; i++) {
            btnEdit[i].addEventListener("click", () => {
                isNew = false
                for (const tarefa of tarefas) {
                    if (tarefa.idTarefa == btnEdit[i].getAttribute("id")) {
                        document.getElementById("txtTarefaId").value = tarefa.idTarefa
                        document.getElementById("txtName").value = tarefa.nome
                        document.getElementById("txtData").value = tarefa.data
                        document.getElementById("txtDuracao").value = tarefa.duracao
                        document.getElementById("txtVoluntario").value = tarefa.voluntario
                        document.getElementById("txtTipo").value = tarefa.tipo
                    }
                }
            })
        }




        //***********************************************************************************************************************/
        //REMOVER tarefa DA LISTA DE Tarefas Voluntários em MEMÓRIA!

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
                    let tarefaId = btnDelete[i].getAttribute("id")
                    let posApagar = tarefasVoluntarios.findIndex(x => x.idTarefa == tarefaId);
                    if (posApagar >= 0) {
                        tarefasVoluntarios.splice(posApagar, 1);
                        swal('Removido!', 'A Tarefa Voluntário foi removido da Lista de Tarefas.', 'success')
                    } else {
                        swal('Erro!', 'A Tarefa Voluntário não foi encontrado na Lista de Tarefas.', 'error')
                    }
                    renderTarefas()
                })
            })
        }
    }
    renderTarefas()
}