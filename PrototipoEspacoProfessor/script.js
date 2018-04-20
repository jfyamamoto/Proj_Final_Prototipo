$('thead').html(
    `<tr style="background-color:#f5f5f5;">
            <th style="width:8%;"></th>
            <th style="width:8%;"></th>
            <th colspan="3" style="text-align:center;color:#353535;">Recebidas</th>
        </tr>`
);

$('tfoot').html(
    `<<tr style="background-color:#f5f5f5;">
    <th colspan="5" style="height:35px;"></th>
    </tr>`
);

var language = {
    "lengthMenu": "Mostrando _MENU_ provas/exercícios por página",
    "zeroRecords": "Não foi encontrado nenhum arquivo",
    "info": "Mostrando página _PAGE_ de _PAGES_",
    "oPaginate": {
        "sNext": "Próximo",
        "sPrevious": "Anterior",
        "sFirst": "Primeiro",
        "sLast": "Último"
    },
    "decimal": ".",
    "thousands": ",",
    "sLoadingRecords": "Carregando...",
    "sProcessing": "Processando...",
    "sSearch": "Pesquisar "
}

var i;
var dados;
var conteudo;
var tbody = `<tr style="text-align:center;">
                <td><img src="email-logo.jpg" style="width:90%;"></td>
                <td><img src="mensagem.png" style="width:40%;"></td>
                <td style="color:gray;text-align=left;">cabeçalho da mensagem</td>
                <td style="color:gray;text-align=left;">08/04/2018 às 12:00</td>
                <td style="color:gray;text-align:left;width:50%;"><a href="#">Mensagem gerada aleatoriamente para teste</a></td>
             </tr>`;

$('tbody').html(function(){
        for (i = 0; i < 5; i++) {
            conteudo += tbody;
            }
            return conteudo;
});

function obterDivTabela(){
    $.ajax({url: "provas.html", dataType:"html", success: function(result){
        $("#main-tab-content").html(result);
    }});
}

function obterDadosProvas(){
    $.ajax({url: "provas.json", dataType: "json", success: function(result){
        montarTabela(result);
    }});
}

function montarTabela(dados){
    $('#tabela-provas').DataTable({
        language: language,
        data: dados,
        columns: [
            { data: 'nome',  title: 'Nome'},
            { data: 'materia',  title: 'Matéria' },
            { data: 'tema',  title: 'Tema' },
            { data: 'excluir', title: 'Excluir'},
            { data: 'editar', title: 'Editar'},
            { data: 'imprimir',  title: 'Imprimir' }
        ],
        fnRowCallback: function (nRow, aData, iDisplayIndex) {
            $("td:eq(0)", nRow).css("text-align", "center").css("vertical-align", "middle");
            $("td:eq(1)", nRow).css("text-align", "center").css("vertical-align", "middle");
            $("td:eq(2)", nRow).css("text-align", "center").css("vertical-align", "middle");
            $("td:eq(3)", nRow).css("text-align", "center").css("vertical-align", "middle");
            $("td:eq(4)", nRow).css("text-align", "center").css("vertical-align", "middle");
            $("td:eq(5)", nRow).css("text-align", "center").css("vertical-align", "middle");
        }
});
}

$("#questoes-link").click(function(){
    // $.ajax({url: "questoes.html", dataType:"html", success: function(result){
    //     $("#main-tab-content").html(result);
    //}});
    obterDivTabela();
    obterDadosProvas();
});

function adicionarProvas(){
    $.ajax({url: "adicionarProvas.html", dataType: "html", success: function(result){
        $('#provas-form').html(result);
        $('#tabela-provas').hide();
        $('#tabela-provas_wrapper').hide();
    }});
}

function gravarProva(){
    alert("Documento salvo com sucesso!");
    window.location.href="index.html";
}
