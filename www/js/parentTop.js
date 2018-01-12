$(function(){
    $(document).ready(function(){
        var firstFlg = localStorage.getItem('first');
        if(firstFlg){
            //console.log('二回以降');
        }else{
            //console.log('初期起動');
            localStorage.setItem('first','true');
            $('body').append('<div id="modal-backimage"></div>');
            centeringModal('#first-modal-container');
            $('#modal-backimage,#first-modal-container').fadeIn("slow");        
        }
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childStockNum.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
            },
            success: function(data){
                var datas = JSON.parse(data);
                datas.forEach(function(child){
                    var appendData = '<div class="childStockArticle">';
                    appendData += '<span class="childName">' + child['name'] + '</span>';
                    appendData += '<span class="rightContent">';
                    appendData += '<span><img class="stockImage" src="img/allStock.png"></span>';
                    appendData += '<span class="stockNum">' + child['num'] + '</span>';
                    appendData += '<span class="stockNumUnit">株</span>';
                    appendData += '</span>';
                    appendData += '</div>';
                    $('.stockChildGroup').append(appendData);
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/parentGraphDataStockWeek.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                datas.forEach(function(stocks){
                    weekKabu.push(stocks['price']);
                });
                weekKabuGraph(weekKabu);
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/parentGraphDataStockMonth.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                datas.forEach(function(stocks){
                    monthKabu.push(stocks['price']);
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/parentGraphDataStockYear.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                datas.forEach(function(stocks){
                    yearKabu.push(stocks['price']);
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/parentGraphDataStockAll.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                datas.forEach(function(stocks){
                    allKabu.push(stocks['price']);
                    var date =  stocks['date'].slice(5,9).replace('-','/').slice(0,1) === '0' ? stocks['date'].slice(5,9).replace('-','/').slice(1,5) : stocks['date'].slice(5,9).replace('-','/');
                    allPeriod.push(date);
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/parentGraphDataProfocoencyWeek.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                datas.forEach(function(proficiencies){
                    var childdProficiency = [];
                    proficiencies.forEach(function(proficiency){
                        childdProficiency.push(proficiency['influence']);
                    })
                    weekKouken.push(childdProficiency);
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/parentGraphDataProfocoencyMonth.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                datas.forEach(function(proficiencies){
                    var childdProficiency = [];
                    proficiencies.forEach(function(proficiency){
                        childdProficiency.push(proficiency['influence']);
                    })
                    monthKouken.push(childdProficiency);
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/parentGraphDataProfocoencyYear.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                datas.forEach(function(proficiencies){
                    var childdProficiency = [];
                    proficiencies.forEach(function(proficiency){
                        childdProficiency.push(proficiency['influence']);
                    })
                    yearKouken.push(childdProficiency);
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/parentGraphDataProfocoencyAll.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                datas.forEach(function(proficiencies){
                    var childdProficiency = [];
                    proficiencies.forEach(function(proficiency){
                        childdProficiency.push(proficiency['influence']);
                        var date =  proficiency['date'].slice(5,9).replace('-','/').slice(0,1) === '0' ? proficiency['date'].slice(5,9).replace('-','/').slice(1,5) : proficiency['date'].slice(5,9).replace('-','/');
                        allKoukenPeriod.push(date);
                    })
                    allKouken.push(childdProficiency);
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
    /*
    $(document).on('click','.plus',function(){
        var appendData = '<div id="child-add-modal-close" class="modal-close">×</div>';
        appendData += '<div>名前:<input type="text" name="childName"/></div>';
        appendData += '<div id="child-Id-input">ID:'+ localStorage.getItem('parentId') +'<input type="text" name="childId"/></div>';
        appendData += '<div>PASSWORD:<input type="password" name="childPassword"/></div>';
        appendData += '<button id="childAdd">追加</button>';
        $('#child-add-modal-container').append(appendData);
        $('body').append('<div class="modal-back-img"></div>');
        centeringModal('#child-add-modal-container');
        $('#first-modal-container').fadeOut('slow');
        $('.modal-back-img,#child-add-modal-container').fadeIn("slow");
    });
    $(document).on('click','#childAdd',function(){
        if($('input[name="childId"]').val().length !== 0 && $('input[name="childName"]').val().length && $('input[name="childPassword"]').val().length){
            childIdCheck();
        }else{
            if($('#child-add-modal-container .not').length === 0) $('#child-add-modal-close').after('<div class="not">未入力項目があります。</div>');
        }
    });
    $(document).on('click','#child-add-modal-close',function(){
        childAddEnd();
    });
    $(document).on('click','#first-modal-submit',function(){
        if($('#child-add-zone-container div').length === 0){
            if($('#child-container .not').length === 0) $('#child-container').prepend('<div class="not">子どもを一人は追加してください。</div>');
        }else{
            if($('input[name="firstPrice"]').val().length === 0 || $('input[name="dividendYield"]').val().length === 0){
                $('#child-container').prepend('<div class="not">入力されていない項目があります。</div>');
            }else{
                $.ajax({
                    type: 'POST',
                    url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/firstSettingInsert.php',
                    data:{
                        'parentId':localStorage.getItem('parentId'),
                        'price':$('input[name="firstPrice"]').val(),
                        'dividendYield':$('input[name="dividendYield"]').val()
                    },
                    success: function(data){
                        $('#first-modal-container,#modal-backimage').fadeOut('slow',function(){
                            $('#modal-backimage').remove();
                        });
                    },
                    error: function(XMLHttpRequest, textStatus, errorThtown){
                        console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
                    }
                });
            }
        }
    });
    var childAddEnd = function(){
        $('#child-add-modal-container').empty();
        $('#child-add-modal-container,.modal-back-img').fadeOut("slow",function(){
            $('.modal-back-img').remove();
        });
        $('#first-modal-container').fadeIn('normal');
    };
    var childAddBeforeModalAdd = function(){
        childAddRegister();
        var appendData = '<div class="child-added">';
        appendData += '<div>名前:' + $('input[name="childName"]').val() + '</div>';
        appendData += '<div>ID:' + $('input[name="childId"]').val() + '</div>';
        $('#child-add-zone-container').append(appendData);
        childAddEnd();
    };
    var childAddRegister = function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childIdInsert.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
                'childId':localStorage.getItem('parentId') + $('input[name="childId"]').val(),
                'childName':$('input[name="childName"]').val(),
                'password':$('input[name="childPassword"]').val()
            },
            success: function(data){
                console.log(data);
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    };
    var childIdCheck = function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childIdCheck.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
                'childId':localStorage.getItem('parentId') + $('input[name="childId"]').val()
            },
            success: function(data){
                console.log(data);
                if(data === '1'){
                    childAddBeforeModalAdd();   
                }else{
                    $('#child-Id-input').before('<div>このIDは使用できません</div>');
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    };
    */
    $(document).on('click','.history',function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/notificationCheck.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
            },
            success: function(data){
                console.log(data);
                datas = JSON.parse(data);
                var appendData = '';
                Object.keys(datas).forEach(function (key) {
                    datas[key].forEach(function(notifications){
                        console.log(notifications['name']);
                        appendData += '<div class="modalArticle1 " data-flg="' + key + '">';
                        if(key === 'quest'){
                            appendData += '<div class="childName1">' + notifications['name'] + 'から</div>';
                            appendData += '<div class="modalContent1">クエスト完了申請が届いています。</div>';
                        }else{
                            appendData += '<div class="childName1">' + notifications['name'] + 'から</div>';
                            appendData += '<div class="modalContent1">売却申請が届いています。</div>';
                        }
                        appendData += '</div>';
                    });
                });
                $('.modalArticleGroup1').append(appendData);
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $('body').append('<div id="history-modal-backimg" class="modal-backimage"></div>');
        centeringModal('#history-modal');
        $('#history-modal-backimg,#history-modal').fadeIn("slow");        
    });
    $(document).on('click','.batsuButton1,#history-modal-backimg',function(){
        $('.modalArticleGroup1').empty();
        $('#history-modal,#history-modal-backimg').fadeOut("slow",function(){
            $('#history-modal-backimg').remove();
        });
    });
    $(document).on('click','.modalArticle1',function(){
        if($(this).attr('data-flg') === 'quest'){
            questModal($(this).children('.childName1').html());
        }else{
            stockModal($(this).children('.childName1').html());
        }
    });
    var questModal = function(name){
        name = name.replace('から','');
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/notificationQuest.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
                'childName': name
            },
            success: function(data){
                console.log(data);
                datas = JSON.parse(data);
                datas.forEach(function(quest){
                    var appendData = '<div class="quest4" data-id="' + quest['id'] + '" data-name="' + name + '">';
                    appendData += '<div class="questTitle4">' + quest['name'] + '</div>';
                    appendData += '<button class="confirmButton4">承認</button>';
                    appendData += '<button class="DenialButton4">拒否</button>';
                    appendData += '</div>';
                    $('.questGroup4').append(appendData);
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $('body').append('<div class="modal-back-img"></div>');
        centeringModal('#quest-modal');
        $('#history-modal').fadeOut('slow');
        $('.modal-back-img,#quest-modal').fadeIn("slow");
    };
    var stockModal = function(name){
        name = name.replace('から','');
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/notificationStock.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
                'childName': name
            },
            success: function(data){
                console.log(data);
                datas = JSON.parse(data);
                var appendData = '<span class="saleFrom2">' + name + 'からの売却申請</span><span class="batsuButton2">×</span>';
                datas.forEach(function(stock){
                    appendData += '<div class="sale-container" data-date="' + stock['changeDate'] + '" data-name="' + name + '">';
                    appendData += '<div class="stockNum2">' + stock['num'] + '株</div>';
                    appendData += '<div class="saleNum2">' + parseInt(stock['num']) * parseInt(stock['price']) + '円</div>';
                    appendData += '<button class="syoninButton2">承認</button><button class="kyohiButton2">拒否</button>';
                    appendData += '</div>';
                });
                $('.wrap2_1').append(appendData);
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $('body').append('<div class="modal-back-img"></div>');
        centeringModal('#stock-sale-modal');
        $('#history-modal').fadeOut('slow');
        $('.modal-back-img,#stock-sale-modal').fadeIn("slow");
    };
    $(document).on('click','.modal-back-img,.batsuButton2,.batsuButton4,.arrowButtonSize4',function(){
        $('.wrap2_1').empty();
        $('.questGroup4').empty();
        $('.modal-back-img,#quest-modal,#stock-sale-modal').fadeOut("slow",function(){
            $('.modal-back-img').remove();
        });
        $('#history-modal').fadeIn('slow');
    });
    $(document).on('click','.confirmButton4',function(){
        console.log($(this).parent().attr('data-id'));
        console.log($(this).parent().attr('data-name'));
        var i = $(this).parent();
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/questApproval.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
                'questId': $(this).parent().attr('data-id'),
                'childName': $(this).parent().attr('data-name')
            },
            success: function(data){
                console.log(data);
                i.hide();
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
    $(document).on('click','.DenialButton4',function(){
        console.log($(this).parent().attr('data-id'));
        console.log($(this).parent().attr('data-name'));
        var i = $(this).parent();
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/questRejection.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
                'questId': $(this).parent().attr('data-id'),
                'childName': $(this).parent().attr('data-name')
            },
            success: function(data){
                console.log(data);
                i.hide();
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
    $(document).on('click','.DenialButton4',function(){
        console.log($(this).parent().attr('data-id'));
    });
    $(document).on('click','.syoninButton2',function(){
        console.log($(this).parent().attr('data-date'));
        console.log($(this).parent().attr('data-name'));
        var i = $(this).parent();
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/stockApproval.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
                'date': $(this).parent().attr('data-date'),
                'childName': $(this).parent().attr('data-name')
            },
            success: function(data){
                console.log(data);
                i.hide();
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });        
    });
    $(document).on('click','.kyohiButton2',function(){
        console.log($(this).parent().attr('data-date'));
        console.log($(this).parent().attr('data-name'));
        var i = $(this).parent();
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/stockRejection.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
                'date': $(this).parent().attr('data-date'),
                'childName': $(this).parent().attr('data-name')
            },
            success: function(data){
                console.log(data);
                i.hide();
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });        
    }); 
});





















