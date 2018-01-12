$(function(){
    $(document).ready(function(){
        //console.log("きてあ");
    });
    $(document).on('click','#registBtn',function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/regist.php',
            data : {
                'userId' : $('input[name="userId"]').val(),
                'password' : $('input[name="pass"]').val(),
                'userName' : $('input[name="userName"]').val(),
                'mailAddress' : $('input[name="mailAddress"]').val()
            },
            success: function(data){
                console.log(data);
                alert(data);
                location.href = 'index.html';
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
});