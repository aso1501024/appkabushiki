$(function(){
    $(document).ready(function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp//kabu/childTop.php',
            data:{
                'userId':localStorage.getItem('childId'),
            },
            success: function(data){
                var datas = JSON.parse(data);
                $('#child-stock-num').html(datas[0]['num']);
                $('#one-stock-price').html(datas[0]['price']);
                $('#remain-stock').html(datas[0]['num'] + '株');
                $('.stockNumSaleMoney').html(0);
                var stockNumLength = datas[0]['price'].length;
                var fontSize = '0vw';
                switch(parseInt(stockNumLength)){
                    case 1:
                    case 2:
                    case 3:
                        fontSize = '10vw';
                        break;
                    case 4:
                        fontSize = '7vw';
                        break;
                    default:
                        fontSize = '5vw';
                        break;
                }
                $('#one-stock-price').css({'font-size': fontSize});
                $('#slider').slider({
                    min: 0,
                    max: datas[0]['num'],
                    step: 1,
                    value: 0,
                    range: 'max',
                    change: function(e, ui) {
                        $('#stock-num').html(ui.value + '株');
                        $('#stock-sale').html(parseInt($('#one-stock-price').html()) * ui.value + '円');
                        $('#remain-stock').html(parseInt($('#child-stock-num').html().replace('株','')) - ui.value + '株');
                    },
                    create: function(e, ui) {
                        $('#stock-num').html($(this).slider('option', 'value') + '株');
                    },
                    slide: function(e, ui){
                        $('#stock-num').html($(this).slider('option', 'value') + '株');
                        $('#stock-sale').html(parseInt($('#one-stock-price').html()) * ui.value + '円');
                        $('#remain-stock').html(parseInt($('#child-stock-num').html().replace('株','')) - ui.value + '株');
                    }
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
    $(document).on('click','#saleSubmit',function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/stockSale.php',
            data:{
                'childId':localStorage.getItem('childId'),
                'changeNum':$('#stock-num').html().replace('株','')
            },
            success: function(data){
                console.log(data);
                alert('申請しました。');
                location.reload();
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
    $(document).on('click','#stock-plus,.huga',function(){
        var vol = parseInt($('#stock-num').html().replace('株',''));
        vol = (parseInt(vol) + parseInt(1)).toString();
        $("#slider").slider("value", vol);
    })
    $(document).on('click','#stock-minus,.hoge',function(){
        var vol = parseInt($('#stock-num').html().replace('株',''));
        vol = (parseInt(vol) - parseInt(1)).toString();
        $("#slider").slider("value", vol);
    });
});



















