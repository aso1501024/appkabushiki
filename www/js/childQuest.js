$(function(){
    $(document).ready(function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childQuest.php',
            data:{
                'childId':localStorage.getItem('childId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                var cId = 0;
                var appendData = '';
                datas.forEach(function(quest){
                    if(parseFloat(quest['cId']) !== parseFloat(cId) && parseFloat(cId) !== 0) appendData += '</div> ';
                    if(parseFloat(quest['cId']) !== parseFloat(cId)) appendData += '<div class="categoryGroup"> <div class="category"> <span class="proficiency ' + decideProficiencyClass(decideProficiency(quest['pNum'])) + '">' + decideProficiency(quest['pNum']) + '</span> <span class="categoryName">' + quest['cName']  + '</span> </div>';
                    cId = quest['cId'];
                    if(parseFloat(quest['result']) === 1 || parseInt(quest['result']) === 4){
                        appendData += '<div class="normalQuestClearGroup" data-id="' + quest['qId'] + '" data-content="' + quest['content'] + '">';
                    }else if(parseFloat(quest['result']) === 0){
                        appendData += '<div class="normalQuestReceptGroup" data-id="' + quest['qId'] + '" data-content="' + quest['content'] + '">';
                    }else if(parseFloat(quest['result']) === 3){
                        appendData += '<div class="normalQuestConfirmGroup" data-id="' + quest['qId'] + '" data-content="' + quest['content'] + '">';
                    }else{
                        appendData += '<div class="normalQuestNotGroup" data-id="' + quest['qId'] + '" data-content="' + quest['content'] + '">';
                    }
                    if(parseFloat(quest['result']) !== 1 && parseFloat(quest['result']) !== 0 && parseFloat(quest['result']) !== 3){
                        appendData += '<div class="normalQuestTitle">' + quest['qName'] + '</div>';
                    }else{
                        appendData += '<div class="normalQuestReceptTitle">' + quest['qName'] + '</div>';
                    }
                    if(parseFloat(quest['result']) !== 1 && parseFloat(quest['result']) !== 0 && parseFloat(quest['result']) !== 3)appendData += '<div class="normalQuestReward">' + quest['cNum'] + '株</div>';
                    if(parseFloat(quest['result']) === 0)appendData += '<button id="comp" class="normalQuestKanryoButton">完了</button> <button id="quest-cancel" class="normalQuestCancelButton">取消</button>';
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
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childSpecialQuest.php',
            data:{
                'childId':localStorage.getItem('childId'),
            },
            success: function(data){
                datas = JSON.parse(data);
                var appendData = '';
                datas.forEach(function(quest){
                    if(parseInt(quest['result']) === 1 || parseInt(quest['result']) === 4){
                        appendData += '<div class="specialQuestClearGroup">';
                    }else if(parseInt(quest['result']) === 0){
                        appendData += '<div class="specialQuestReceptGroup">';
                    }else if(parseInt(quest['result']) === 3){
                        appendData += '<div class="specialQuestConfirmGroup">';
                    }
                    appendData += '<div class="specialQuestTitle" data-id="' + quest['id'] + '" data-content="' + quest['content'] + '" data-up-num="' + quest['upNum'] +'" data-down-num="' + quest['downNum'] + '" data-start-date="' + quest['startDate'] + '" data-end-date="' + quest['endDate'] + '">' + quest['name'] + '</div>';
                    var endDate = quest['endDate'].split('-');
                    endDate[2] = endDate[2].replace(' 23:59:59','');
                    appendData += '<div class="specialQuestDeadline">～' + endDate[0] + '年' + endDate[1] + '月' + endDate[2] + '日</div>';
                    if(parseInt(quest['result']) === 0) appendData += '<button id="special-comp" class="specialQuestReceptButton">完了</button>';
                    appendData += '</div>';
                });
                $('.specialQuest').append(appendData);
                console.log(appendData);
                console.log($('.specialQuest').html());
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
    $(document).on('click','.normalQuestNotGroup',function(){
        console.log();
        $('#quest-name').html($(this).children('.normalQuestTitle').html());
        $('#quest-name').attr({'data-id':$(this).attr('data-id')});
        $('#quest-content').html($(this).attr('data-content'));
        $('body').append('<div id="order-add-modal-backimg" class="modal-backimage"></div>');
        centeringModal('#order-add-modal');
        $('#order-add-modal-backimg,#order-add-modal').fadeIn("slow");
    });
    $(document).on('click','#order-add-modal-backimg,.modalCancel',function(){
        $('#order-add-modal,#order-add-modal-backimg').fadeOut('slow',function(){
            $('#quest-name').html('');
            $('#quest-content').html('');
            $('#order-add-modal-backimg').remove();
        });
    });
    $(document).on('click','#order-btn',function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childOrderAdd.php',
            data:{
                'childId':localStorage.getItem('childId'),
                'questId':$('#quest-name').attr('data-id')
            },
            success: function(data){
                console.log(data);
                alert('クエストを受注しました。');
                location.reload();
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    })
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
    $(document).on('click','.specialQuestTitle',function(){
        var upNum = parseInt($(this).parent().children('.specialQuestTitle').attr('data-up-num'));
        var downNum = parseInt($(this).parent().children('.specialQuestTitle').attr('data-down-num'));
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childImpact.php',
            data:{
                'childId':localStorage.getItem('childId'),
            },
            success: function(data){
                console.log(data);
                datas = JSON.parse(data);
                var pro = 0;
                datas.forEach(function(pros){
                    pro = parseInt(pro) + parseInt(decideImpact(pros['num']));
                });
                console.log(pro);
                $('.winValue2').html(parseInt(pro) * parseInt(upNum));
                $('.loseValue2').html(parseInt(pro) * parseInt(downNum));
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $('#special-quest-name').html($(this).parent().children('.specialQuestTitle').html());
        $('#special-quest-content').html($(this).parent().children('.specialQuestTitle').attr('data-content'));
        var startDate = $(this).parent().children('.specialQuestTitle').attr('data-start-date').split('-');
        startDate[2] = startDate[2].replace(' 00:00:00','');
        var endDate = $(this).parent().children('.specialQuestTitle').attr('data-end-date').split('-');
        endDate[2] = endDate[2].replace(' 23:59:59','');
        $('#start-year').html(startDate[0]);
        $('#start-month').html(startDate[1]);
        $('#start-day').html(startDate[2]);
        $('#end-year').html(endDate[0]);
        $('#end-month').html(endDate[1]);
        $('#end-say').html(endDate[2]);
        $('body').append('<div id="order-view-modal-backimg" class="modal-backimage"></div>');
        centeringModal('#order-view-modal');
        $('#order-view-modal-backimg,#order-view-modal').fadeIn("slow");
    });
    $(document).on('click','#order-view-modal-backimg,.modal-cancel',function(){
        $('#order-view-modal,#order-view-modal-backimg').fadeOut('slow',function(){
            $('#order-view-modal-backimg').remove();
        });
    });
});
























