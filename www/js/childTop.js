$(function(){
    $(document).ready(function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childTop.php',
            data:{
                'userId':localStorage.getItem('childId'),
            },
            success: function(data){
                var datas = JSON.parse(data);
                $('.name').append(datas[0]['name']);
                $('#child-stock-num').append(datas[0]['num'] + '株');
                $('#one-stock-price').append(datas[0]['price'] + '円/株');
                $('#all-stock-price').append(datas[0]['num'] * datas[0]['price'] + '円');               
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childQuest.php',
            data:{
                'childId':localStorage.getItem('childId'),
            },
            success: function(data){
                var datas = JSON.parse(data);
                var cId = 0;
                var appendData = '';
                datas.forEach(function(quest){
                    if(parseFloat(quest['result']) === 0){
                        if(parseFloat(quest['cId']) !== parseFloat(cId) && parseFloat(cId) !== 0) appendData += '</div> ';
                        if(parseFloat(quest['cId']) !== parseFloat(cId)) appendData += '<div class="categoryGroup"> <div class="category"> <span class="proficiency ' + decideProficiencyClass(decideProficiency(quest['pNum'])) + '">' + decideProficiency(quest['pNum']) + '</span> <span class="categoryName">' + quest['cName']  + '</span> </div>';
                        cId = quest['cId'];
                        appendData += '<div class="normalQuestReceptGroup" data-id="' + quest['qId'] + '" data-content="' + quest['content'] + '">';
                        appendData += '<div class="normalQuestReceptTitle">' + quest['qName'] + '</div>';
                        appendData += '<button id="comp" class="normalQuestKanryoButton">完了</button> <button id="quest-cancel" class="normalQuestCancelButton">取消</button>';
                        appendData += '</div>';
                    }
                });
                $('.normalQuest').append(appendData);
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childSpecialQuest.php',
            data:{
                'childId':localStorage.getItem('childId'),
            },
            success: function(data){
                console.log(data);
                datas = JSON.parse(data);
                datas.forEach(function(quest){
                    var appendData = '';
                    if(parseInt(quest['result']) === 0){
                        appendData += '<div class="specialQuestReceptGroup">';
                        appendData += '<div class="specialQuestTitle" data-id="' + quest['id'] + '" data-content="' + quest['content'] + '" data-up-num="' + quest['upNum'] +'" data-down-num="' + quest['downNum'] + '" data-start-date="' + quest['startDate'] + '" data-end-date="' + quest['endDate'] + '">' + quest['name'] + '</div>';
                        var endDate = quest['endDate'].split('-');
                        endDate[2] = endDate[2].replace(' 23:59:59','');
                        appendData += '<div class="specialQuestDeadline">～' + endDate[0] + '年' + endDate[1] + '月' + endDate[2] + '日</div>';
                        appendData += '<button id="special-comp" class="specialQuestReceptButton">完了</button>';
                        appendData += '</div>';
                    }
                    $('.specialQuest').append(appendData);
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
    $(document).on('click','#comp',function(){
        console.log($(this).parent().attr('data-id'));
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childOrderComp.php',
            data:{
                'childId':localStorage.getItem('childId'),
                'questId':$(this).parent().attr('data-id')
            },
            success: function(data){
                console.log(data);
                alert('完了報告しました。');
                location.reload();
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
    $(document).on('click','#quest-cancel',function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childOrderCancel.php',
            data:{
                'childId':localStorage.getItem('childId'),
                'questId':$(this).parent().attr('data-id')
            },
            success: function(data){
                console.log(data);
                alert('クエストをキャンセルしました。');
                location.reload();
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
    $(document).on('click','#special-comp',function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childOrderComp.php',
            data:{
                'childId':localStorage.getItem('childId'),
                'questId':$(this).parent().children('.specialQuestTitle').attr('data-id')
            },
            success: function(data){
                console.log(data);
                alert('完了報告しました。');
                location.reload();
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
    $(document).on('click','.history',function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childHistories.php',
            data:{
                'childId':localStorage.getItem('childId'),
            },
            success: function(data){
                console.log(data);
                datas = JSON.parse(data);
                datas.forEach(function(quest){
                    var date = quest['date'].split('-');
                    date[2] = date[2].replace(' 00:00:00','');
                    if(quest['downNum'] === null && parseInt(quest['result']) === 1){
                        var appendData = '<div class="list">';
                        appendData += '<div class="days">';
                        appendData += date[0] + '/' + date[1] + '/' + date[2];
                        appendData += '</div>';
                        appendData += '<div class="questCont">';
                        appendData += '『' + quest['name'] + '』達成報酬 ' + quest['upNum'] + '株 獲得';
                        appendData += '</div>';
                        appendData += '</div>';
                        $('.listBox').append(appendData);
                    }else if(quest['downNum'] !== null && parseInt(quest['result']) === 1){
                        var appendData = '<div class="list">';
                        appendData += '<div class="days">';
                        appendData += date[0] + '/' + date[1] + '/' + date[2];
                        appendData += '</div>';
                        appendData += '<div class="specialQuestCont">';
                        appendData += '『' + quest['name'] + '』達成報酬 ' + quest['upNum'] * quest['allNum'] + '円up';
                        appendData += '</div>';
                        appendData += '</div>';
                        $('.listBox').append(appendData);
                    }else if(quest['downNum'] !== null){
                        var appendData = '<div class="list">';
                        appendData += '<div class="days">';
                        appendData += date[0] + '/' + date[1] + '/' + date[2];
                        appendData += '</div>';
                        appendData += '<div class="specialQuestCont">';
                        appendData += '『' + quest['name'] + '』失敗 ' + quest['downNum'] * quest['allNum'] + '円down';
                        appendData += '</div>';
                        appendData += '</div>';
                        $('.listBox').append(appendData);
                    }
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $('body').append('<div id="history-backimg" class="modal-backimage"></div>');
        centeringModal('#history-modal');
        $('#history-backimg,#history-modal').fadeIn("slow");
    });
    $(document).on('click','#history-backimg,#modal-close',function(){
        $('#history-backimg,#history-modal').fadeOut('slow',function(){
            $('.listBox').empty();
            $('#history-backimg').remove();
        });
    });
});



















