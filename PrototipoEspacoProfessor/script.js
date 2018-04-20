$('thead').html(
    `<tr style="background-color:#f5f5f5;">
            <th style="width:8%;"></th>
            <th style="width:8%;"></th>
            <th></th>
            <th></th>
            <th>Recebidas</th>
        </tr>`
);

var i;
var conteudo;
var tbody = `<tr style="text-align:center;">
                <td><img src="email-logo.jpg" style="width:90%;"></td>
                <td><img src="mensagem.png" style="width:40%;"></td>
                <td style="color:gray;">cabeçalho da mensagem</td>
                <td></td>
                <td style="color:gray;text-align:left;width:50%;"><a href="#">Mensagem gerada aleatoriamente para teste</a></td>
             </tr>`;

$('tbody').html(function(){
        for (i = 0; i < 5; i++) {
            conteudo += tbody;
            }
            return conteudo;
});

$("#questoes-link").click(function(){
    $.ajax({url: "questoes.html", success: function(result){
        $("#quadros").html(result);
    }});
});
