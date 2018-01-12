$(function(){    
    $(document).ready(function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/selectQuestAll.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
            },
            success: function(data){
                //console.log(data);
                var datas = JSON.parse(data);
                var cId = 0;
                var appendData = '';
                datas.forEach(function(quest){
                    if(parseInt(quest['cId']) !== parseInt(cId) && parseInt(cId) !== 0) appendData += '</div> ';
                    if(parseInt(quest['cId']) !== parseInt(cId)) appendData += '<div class="normalQuestGroup"> <div class="category" data-id="' + quest['cId'] + '">' + quest['cName'] + '</div>';
                    cId = quest['cId'];
                    appendData += '<div class="normalArticle" data-id="' + quest['qId'] + '">';
                    appendData += '<div class="normalTitle" data-content="' + quest['content'] + '">' + quest['qName'] + '</div>';
                    appendData += '<div class="weekAll">';
                    appendData += '<span class="' + weekAppendDataCreate(quest['mon']) + '">月</span>';
                    appendData += '<span class="' + weekAppendDataCreate(quest['tues']) + '">火</span>';
                    appendData += '<span class="' + weekAppendDataCreate(quest['wed']) + '">水</span>';
                    appendData += '<span class="' + weekAppendDataCreate(quest['thurs']) + '">木</span>';
                    appendData += '<span class="' + weekAppendDataCreate(quest['fri']) + '">金</span>';
                    appendData += '<span class="' + weekAppendDataCreate(quest['sat']) + '">土</span>';
                    appendData += '<span class="' + weekAppendDataCreate(quest['sun']) + '">日</span>';
                    appendData += '</div>';
                    appendData += '<div class="stockNum">' + quest['num'] + '株</div>';
                    appendData += '<button class="normalChangeButton">変更</button>';
                    appendData += '</div>';
                });
                $('.normalQuest').append(appendData);
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/selectSpecialQuestAll.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                datas.forEach(function(quest){
                    var appendData = '<div class="specialQuestArticle">';
                    appendData += '<div class="specialTitle" data-id="' + quest['id'] + '" data-content="' + quest['content'] + '" data-up-num="' + quest['upNum'] +'" data-down-num="' + quest['downNum'] + '" data-start-date="' + quest['startDate'] + '" data-end-date="' + quest['endDate'] + '">' + quest['name'] + '</div>';
                    appendData += '<button class="specialChangeButton">変更</button>';
                    var endDate = quest['endDate'].split('-');
                    endDate[2] = endDate[2].replace(' 23:59:59','');
                    appendData += '<div class="specialDeadLine">～' + endDate[0] + '年' + endDate[1] + '月' + endDate[2] + '日</div>';
                    appendData += '</div>';
                    $('.specialQuestGroup').append(appendData);
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
    $(document).on('click','#add-quest-btn',function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/categorySelect.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
            },
            success: function(data){
                var datas = JSON.parse(data);
                var appendData = '';
                datas.forEach(function(category){
                    appendData += '<option value="' + category['id'] + '">' + category['name'] + '</option>'
                });
                $('.select1').append(appendData);
                $('body').append('<div id="normal-quest-add-backimg" class="modal-backimage"></div>');
                centeringModal('#normal-quest-add-container');
                $('#normal-quest-add-backimg,#normal-quest-add-container').fadeIn("slow");
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
    $(document).on('click','#normal-quest-add-backimg,#modal-close',function(){
        $('#normal-quest-add-container,#normal-quest-add-backimg').fadeOut('slow',function(){
            $('.select1').empty();
            $('input[name="addQuestName"]').val('');
            $('#questContent').val('');
            $('input[name="num"]').val('');
            $('.allWeek1 .box1 div').each(function(){
                if($(this).hasClass('selected')) $(this).toggleClass('selected'); 
            });
        });
    });
    $(document).on('click','#normal-quest-change-backimg,#modal-close',function(){
        $('#normal-quest-change-container,#normal-quest-change-backimg').fadeOut('slow',function(){
            $('#change-select').empty();
            $('input[name="changeQuestName"]').val('');
            $('#changeQuestContent').val('');
            $('input[name="changeNum"]').val('');
            $('.allWeek2').empty();
            $('#normal-quest-change-backimg').remove();
        });
    });
    $(document).on('click','.mon,.tues,.wed,.thurs,.fri,.sat,.sun',function(){
        $(this).toggleClass('selected'); 
    });
    $(document).on('click','#quest-add-btn',function(){
        if($('input[name="addQuestName"]').val().length !== 0 && $('#questContent').val() !== 0 && $('input[name="num"]').val().length !== 0){
            var weekArray = [];
            $('.allWeek1 .box1 div').each(function(){
                if($(this).hasClass('selected')){
                    var classData = $(this).attr('class').replace(' selected','');
                    classData = classData.replace('changed ','');
                    weekArray.push(classData);
                }
            });
            $.ajax({
                type: 'POST',
                url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/questInsertNormal.php',
                data:{
                    'parentId':localStorage.getItem('parentId'),
                    'categoryId':$('[name=category]').val(),
                    'questName':$('input[name="addQuestName"]').val(),
                    'questContent':$('#questContent').val(),
                    'num':$('input[name="num"]').val(),
                    'week':weekArray
                },
                success: function(data){
                    data = data.replace(/\s+/g, "");
                    if(data === '1'){
                        alert('追加成功');
                        location.reload();
                        //console.log('成功');
                    }else{
                        alert('追加失敗');
                        //console.log('失敗');
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThtown){
                    console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
                }
            });
        }else{
            alert('未入力項目があります。');
        }
    });
    $(document).on('click','.normalChangeButton',function(){
        var cId = $(this).parent().parent().children('.category').attr('data-id');
        var qId = $(this).parent().attr('data-id');
        var content = $(this).parent().children('.normalTitle').attr('data-content');
        var qName = $(this).parent().children('.normalTitle').html();
        var weekArray = [];
        $(this).parent().children('.weekAll').children('span').each(function(){
            if($(this).hasClass('weekOn')) weekArray.push($(this).html());
        });
        var num = $(this).parent().children('.stockNum').html().replace('株','');
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/categorySelect.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
            },
            success: function(data){
                var datas = JSON.parse(data);
                var appendData = '';
                datas.forEach(function(category){
                    if(parseInt(category['id']) === parseInt(cId)){
                        appendData += '<option value="' + category['id'] + '" selected="true">' + category['name'] + '</option>';
                    }else{
                        appendData += '<option value="' + category['id'] + '">' + category['name'] + '</option>';
                    }
                });
                $('#change-select').append(appendData);
                $('input[name="changeQuestName"]').val(qName);
                $('#changeQuestContent').val(content);
                $('input[name="changeNum"]').val(num);
                appendData = '';
                $('#changeQuestName').attr('data-id',qId);
                $('.allWeek1 .box1 div').each(function(){
                    appendData = '<div class="box1">';
                    if(weekArray.indexOf($(this).html()) >= 0){
                        appendData += '<div class="changed ' + decideWeekClass($(this).html()) + ' selected">' + $(this).html() + '</div>';
                    }else{
                        appendData += '<div class="changed ' + decideWeekClass($(this).html()) + '">' + $(this).html() + '</div>';
                    }
                    appendData += '</div>';
                    $('.allWeek2').append(appendData);
                });
                $('body').append('<div id="normal-quest-change-backimg" class="modal-backimage"></div>');
                centeringModal('#normal-quest-change-container');
                $('#normal-quest-change-backimg,#normal-quest-change-container').fadeIn("slow");
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
    $(document).on('click','#quest-change-btn',function(){
        if($('input[name="changeQuestName"]').val().length !== 0 && $('#changeQuestContent').val().length !== 0 && $('input[name="changeNum"]').val().length !== 0){
            var weekArray = [];
            $('.allWeek2 .box1 div').each(function(){
                if($(this).hasClass('selected'))weekArray.push($(this).attr('class').replace(' selected','').replace('changed ',''));
            });
            $.ajax({
                type: 'POST',
                url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/questUpdateNormal.php',
                data:{
                    'parentId':localStorage.getItem('parentId'),
                    'categoryId':$('[name=changeCategory]').val(),
                    'questName':$('input[name="changeQuestName"]').val(),
                    'questContent':$('#changeQuestContent').val(),
                    'num':$('input[name="changeNum"]').val(),
                    'week':weekArray,
                    'questId':$('#changeQuestName').attr('data-id')
                },
                success: function(data){
                    //console.log(data);
                    alert('更新完了');
                    location.reload();
                },
                error: function(XMLHttpRequest, textStatus, errorThtown){
                    console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
                }
            });
        }else{
            alert('未入力項目があります。');
        }
    });
    $(document).on('click','#add-special-quest-btn',function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/allChildImpact.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
            },
            success: function(data){
                //console.log(data);
                var datas = JSON.parse(data);
                var childImpactArray = {};
                var impactArray = [];
                var name = '';
                datas.forEach(function(impact){
                    if(name !== impact['name'] && name !== ''){
                        childImpactArray[name] = decideChildImpact(impactArray);
                        impactArray = [];
                    } 
                    name = impact['name'];
                    impactArray.push(impact['num']);
                });
                childImpactArray[name] = decideChildImpact(impactArray);
                var appendData = '';
                Object.keys(childImpactArray).forEach(function (childName) {
                    appendData = '<div class="childFluctuation2">';
                    appendData += '<div class="childName2" data-num="' + childImpactArray[childName] + '">' + childName + '</div>';
                    appendData += '<div class="upChildRate2">0</div>';
                    appendData += '<div class="upChildUnit2">円</div>';
                    appendData += '<div class="downChildRate2">0</div>';
                    appendData += '<div class="downChildUnit2">円</div>';
                    appendData += '</div>';
                    $('.childFluctuationGroup2').prepend(appendData);
                });
                $('.childFluctuationGroup2').append('<button id="special-quest-add-btn" class="specialRegister2">登録</button>');
                $('#upNum').val(0);
                $('#downNum').val(0);                
                $('body').append('<div id="special-quest-add-modal-back-img" class="modal-backimage"></div>');
                centeringModal('#special-quest-add-container');
                $('#special-quest-add-modal-back-img,#special-quest-add-container').fadeIn("slow");
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
    $(document).on('click','#special-quest-add-modal-back-img,#modal-close',function(){
        $('#special-quest-add-container,#normal-quest-change-backimg').fadeOut('slow',function(){
            $('input[name="specialQuestName"]').val('');
            $('#special-quest-content').val('');
            $('input[name="upNum"]').val(0),
            $('input[name="downNum"]').val(0),
            $('input[name="start-year"]').val('');
            $('input[name="start-month"]').val('');
            $('input[name="start-day"]').val('');
            $('input[name="end-year"]').val('');
            $('input[name="end-month"]').val('');
            $('input[name="end-day"]').val('');
            $('.childFluctuationGroup2 .specialRegister2').remove();
            $('.childFluctuationGroup2 .childFluctuation2').remove();
            $('#special-quest-add-modal-back-img').remove();
        });
    });
    var decideChildImpact = function(impacts){
        var result = 0;
        impacts.forEach(function(impact){
            result += decideImpact(impact);
        });
        return result;
    };
    $('body').on('change','#upNum',function(){
        $('.childFluctuationGroup2 .childFluctuation2').each(function(){
            if($('input[name="upNum"]').val().length === 0) $('input[name="upNum"]').val(0);
            $(this).children('.upChildRate2').html(parseInt($(this).children('.childName2').attr('data-num')) * parseInt($('input[name="upNum"]').val()));
        });
    });
    $('body').on('change','#downNum',function(){
        $('.childFluctuationGroup2 .childFluctuation2').each(function(){
            if($('input[name="downNum"]').val().length === 0) $('input[name="downNum"]').val(0);
            $(this).children('.downChildRate2').html(parseInt($(this).children('.childName2').attr('data-num')) * parseInt($('input[name="downNum"]').val()));
        });
    });
    $(document).on('click','#special-quest-add-btn',function(){
        if($('input[name="specialQuestName"]').val().length !== 0 && $('#special-quest-content').val().length !== 0 && $('input[name="start-year"]').val().length !== 0 && $('input[name="start-month"]').val().length !== 0 && $('input[name="start-day"]').val().length !== 0 && $('input[name="end-year"]').val().length !== 0 && $('input[name="end-month"]').val().length !== 0 && $('input[name="end-day"]').val().length !== 0){
            $.ajax({
                type: 'POST',
                url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/questInsertSpecial.php',
                data:{
                    'parentId':localStorage.getItem('parentId'),
                    'questName':$('input[name="specialQuestName"]').val(),
                    'questContent':$('#special-quest-content').val(),
                    'upNum':$('input[name="upNum"]').val(),
                    'downNum':$('input[name="downNum"]').val(),
                    'startDate':$('input[name="start-year"]').val() + '-' + $('input[name="start-month"]').val() + '-' + $('input[name="start-day"]').val(),
                    'endDate':$('input[name="end-year"]').val() + '-' + $('input[name="end-month"]').val() + '-' + $('input[name="end-day"]').val()
                },
                success: function(data){
                    //console.log(data);
                    data = data.replace(/\s+/g, "");
                    if(data === '1'){
                        alert('追加成功');
                        location.reload();
                        console.log('成功');
                    }else{
                        alert('追加失敗');
                        console.log('失敗');
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThtown){
                    console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
                }
            });
        }else{
            alert('未入力項目があります。');
        }
    });
    $(document).on('click','.specialChangeButton',function(){
        var id = $(this).parent().children('.specialTitle').attr('data-id');
        var qName = $(this).parent().children('.specialTitle').html();
        var content = $(this).parent().children('.specialTitle').attr('data-content');
        var upNum = $(this).parent().children('.specialTitle').attr('data-up-num');
        var downNum = $(this).parent().children('.specialTitle').attr('data-down-num');
        var startDate = $(this).parent().children('.specialTitle').attr('data-start-date').split('-');
        startDate[2] = startDate[2].replace(' 00:00:00','');
        var endDate = $(this).parent().children('.specialTitle').attr('data-end-date').split('-');
        endDate[2] = endDate[2].replace(' 23:59:59','');
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/allChildImpact.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
            },
            success: function(data){
                var datas = JSON.parse(data);
                var childImpactArray = {};
                var impactArray = [];
                var name = '';
                datas.forEach(function(impact){
                    if(name !== impact['name'] && name !== ''){
                        childImpactArray[name] = decideChildImpact(impactArray);
                        impactArray = [];
                    } 
                    name = impact['name'];
                    impactArray.push(impact['num']);
                });
                childImpactArray[name] = decideChildImpact(impactArray);
                var appendData = '';
                Object.keys(childImpactArray).forEach(function (childName) {
                    appendData = '<div class="childFluctuation2">';
                    appendData += '<div class="childName2" data-num="' + childImpactArray[childName] + '">' + childName + '</div>';
                    appendData += '<div class="upChildRate2">0</div>';
                    appendData += '<div class="upChildUnit2">円</div>';
                    appendData += '<div class="downChildRate2">0</div>';
                    appendData += '<div class="downChildUnit2">円</div>';
                    appendData += '</div>';
                    $('.childFluctuationGroup2').prepend(appendData);
                });
                $('.childFluctuationGroup2').append('<button id="special-quest-chenge-btn" class="specialRegister2" data-id="' + id + '">変更</button>');
                $('input[name="specialQuestName"]').val(qName);
                $('#special-quest-content').val(content);
                $('input[name="upNum"]').val(parseInt(upNum)),
                $('input[name="downNum"]').val(parseInt(downNum)),
                $('input[name="start-year"]').val(parseInt(startDate[0]));
                $('input[name="start-month"]').val(parseInt(startDate[1]));
                $('input[name="start-day"]').val(parseInt(startDate[2]));
                $('input[name="end-year"]').val(parseInt(endDate[0]));
                $('input[name="end-month"]').val(parseInt(endDate[1]));
                $('input[name="end-day"]').val(parseInt(endDate[2]));
                $('.childFluctuationGroup2 .childFluctuation2').each(function(){
                    $(this).children('.upChildRate2').html(parseInt($(this).children('.childName2').attr('data-num')) * parseInt($('input[name="upNum"]').val()));
                });
                $('.childFluctuationGroup2 .childFluctuation2').each(function(){
                    $(this).children('.downChildRate2').html(parseInt($(this).children('.childName2').attr('data-num')) * parseInt($('input[name="downNum"]').val()));
                });
                $('body').append('<div id="special-quest-add-modal-back-img" class="modal-backimage"></div>');
                centeringModal('#special-quest-add-container');
                $('#special-quest-add-modal-back-img,#special-quest-add-container').fadeIn("slow");
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
    $(document).on('click','#special-quest-chenge-btn',function(){
        console.log();
        var id = $(this).attr('data-id');
        if($('input[name="specialQuestName"]').val().length !== 0 && $('#special-quest-content').val().length !== 0 && $('input[name="start-year"]').val().length !== 0 && $('input[name="start-month"]').val().length !== 0 && $('input[name="start-day"]').val().length !== 0 && $('input[name="end-year"]').val().length !== 0 && $('input[name="end-month"]').val().length !== 0 && $('input[name="end-day"]').val().length !== 0){
            $.ajax({
                type: 'POST',
                url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/questUpdateSpecial.php',
                data:{
                    'questId':id,
                    'parentId':localStorage.getItem('parentId'),
                    'questName':$('input[name="specialQuestName"]').val(),
                    'questContent':$('#special-quest-content').val(),
                    'upNum':$('input[name="upNum"]').val(),
                    'downNum':$('input[name="downNum"]').val(),
                    'startDate':$('input[name="start-year"]').val() + '-' + $('input[name="start-month"]').val() + '-' + $('input[name="start-day"]').val(),
                    'endDate':$('input[name="end-year"]').val() + '-' + $('input[name="end-month"]').val() + '-' + $('input[name="end-day"]').val()
                },
                success: function(data){
                    console.log(data);
                    alert('変更成功');
                    location.reload();
                },
                error: function(XMLHttpRequest, textStatus, errorThtown){
                    console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
                }
            });
        }else{
            alert('未入力項目があります。');
        }
    });
});


























