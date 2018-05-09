$(document).ready(function() {
    $('.select-two-tema').select2();
});

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
var questaoVetor = [];
var conteudo;
var numero = 0;
var numeroVetor = [];
var tbody = `<tr style="text-align:center;">
                <td><img src="lib/img/email-logo.jpg" style="width:90%;"></td>
                <td><img src="lib/img/mensagem.png" style="width:40%;"></td>
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
    $.ajax({url: "pages/provas.html", dataType:"html", success: function(result){
        $("#main-tab-content").html(result);
    }});
}

function obterDivGerenciamento(){
    $.ajax({url: "pages/gerenciamento.html", dataType:"html", success: function(result){
        $("#main-tab-content").html(result);
    }});
}

function obterQuestoes(){
    $.ajax({url: "pages/questoes.html", dataType:"html", success: function(result){
        $("#main-tab-content").html(result);
    }});
    formulario-adicionar-questoes
}

function obterDadosProvas(){
    $.ajax({url: "data/provas.json", dataType: "json", success: function(result){
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

$("#documentos-link").click(function(){
    obterDivTabela();
    obterDadosProvas();
});

$("#gerenciamento-link").click(function(){
    obterDivGerenciamento();
});

$("#questoes-link").click(function(){
    obterQuestoes();
})

function adicionarProvas(){
    $.ajax({url: "pages/adicionarProvas.html", dataType: "html", success: function(result){
        $('#provas-form').html(result);
        $('#tabela-provas').hide();
        $('#tabela-provas_wrapper').hide();
    }});
}

function gravarProva(){
    alert("Documento salvo com sucesso!");
    window.location.href="index.html";
}

function voltar(){
    window.location.href="index.html";
}

function adicionarQuestao(){
    numero; 
    questaoVetor[numero] =  `<tr>
    <td>
        <select>
            <option>Categoria</option>
            <option>1</<option>
            <option>2</<option>
            <option>3</<option>
            <option>4</<option>
            <option>5</<option>
        </select>
    </td>
    <td>
        <select id="select-temas">
            <option value="">Tema</option>
            <option value="XP">XP</<option>
            <option value="RUP">RUP</<option>
            <option value="Elicitacao de Requisitos">Elicitação de requisitos</<option>
            <option value="Cascata">Cascata</<option>
        </select>
        <a href="javascript:void" data-temas-added="` + numero + `" onclick="adicionarTemaCategoria(this)">Add</a>
    </td>
    <td class="numero-linha">
        ` + (numero + 1) + `
    </td>
    <td>
        <input type="number">
    </td>
    <td>
        <a href='javascript:void(0)' onclick='excluirQuestao(this);' numero-exclusao='` + numero + `'>
            <i class='fa fa-trash' aria-hidden='true'>
            </i>
        </a>
    </td>
</tr>
<tr>
<td colspan="5" class="alert-danger" style="padding: 15px;">
    <a href='javascript:void(0)' onclick='limparTemas(this)'><i class='fa fa-times pull-right' aria-hidden='true'></i></a>
    <h4 style='margin-top: 10px;'>Temas Adicionados:</h4>
    <ul></ul>
</td>
</tr>`
    $('#corpo-tabela-questoes').append(questaoVetor[numero++]);
}

function excluirQuestao(row){
    var numeroLinha = parseInt($(row).attr('numero-exclusao'));
    questaoVetor.splice(numeroLinha, 1);
    $('#corpo-tabela-questoes').html("");
    addQuestoes();
}

function addQuestoes(){ 
    numero = 0;
    for(x = 0; x < questaoVetor.length; x++){
        adicionarQuestao();
    }
}

function adicionarTemaCategoria(conteudo){
    var trTemas = $(conteudo).parents('tr').next();

    var comboTemas = $(conteudo).siblings();
    var conteudoTema = $(comboTemas, 'option:selected').val();
    $(trTemas).children().find('ul').append('<li>' + conteudoTema + '</li>');

    $(trTemas).children().removeClass('alert-danger');
    $(trTemas).children().addClass('alert-success');
}

function limparTemas(conteudo){
    //var teste = $(conteudo).parents('tr').next().html('');
    var teste = $(conteudo).parents('tr').children().find('li').remove();
    console.log(teste);
    $(conteudo).parent().removeClass('alert-success');
    $(conteudo).parent().addClass('alert-danger');
}

function obterDivAnalise(){
    $.ajax({url: "pages/Analise.html", dataType:"html", success: function(result){
        $("#main-tab-content").html(result);
        gerarGraficoQuestoesErradas();
    }});
}

$("#analise-link").click(function(){
    obterDivAnalise();
});

function gerarGraficoQuestoesErradas(){
    $(function () { 
    var myChart = Highcharts.chart('grafico-questoes-erradas', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Desempenho dos alunos'
        },
        xAxis: {
            categories: ['Questão [1]', 'Questão [2]', 'Questão [3]']
        },
        yAxis: {
            title: {
                text: 'Alunos'
            }
        },
        series: [{
            name: 'Certas',
            data: [1, 0, 4]
        }, {
            name: 'Erradas',
            data: [5, 7, 3]
        }]
    });
});
}
