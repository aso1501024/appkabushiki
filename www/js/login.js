$(function(){
    $(document).ready(function(){
        
    });
    $(document).on('click','#loginBtn',function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/login.php',
            data:{
                'userId':$('input[name="userId"]').val(),
                'password':$('input[name="password"]').val()
            },
            success: function(data){
                data = data.replace(/\s+/g, "");
                if(data == '親ログイン成功'){
                    localStorage.setItem('parentId',$('input[name="userId"]').val());
                    location.href = 'parentTop.html';
                }else if(data == '子ログイン成功'){
                    localStorage.setItem('childId',$('input[name="userId"]').val());
                    location.href = 'childTop.html';
                }else{
                    alert('ログイン失敗');
                    //if($('#login .not').length === 0)$('#login').prepend('<div class="not">ログイン失敗</div>');
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
});