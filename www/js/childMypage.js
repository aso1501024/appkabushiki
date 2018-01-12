$(function(){
    $(document).ready(function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childTop.php',
            data:{
                'userId':localStorage.getItem('childId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                $('#child-name').append(datas[0]['name']);
                $('#child-stock-num').append(datas[0]['num'] + '株');
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/categoryProficiency.php',
            data:{
                'childId':localStorage.getItem('childId'),
            },
            success: function(data){
                var datas = JSON.parse(data);
                datas.forEach(function(data){
                    console.log(decideProficiencyClass(decideProficiency(data['num'])));
                    var appendData = '<div class="info1"><div class="' + decideProficiencyClass(decideProficiency(data['num'])) + '">'+ decideProficiency(data['num']) +'</div><div class="font4">' + data['name'] + '</div></div>';
                    $('#category').append(appendData);
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/questClearNum.php',
            data:{
                'childId':localStorage.getItem('childId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                $('#quest-clear-probability').append((parseFloat(datas[0])/parseFloat(datas[1])).toFixed(2));
                $('#quest-clear-num').append(datas[1]);
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childGraphDataStockWeek.php',
            data:{
                'childId':localStorage.getItem('childId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                datas.forEach(function(stocks){
                    weekKabu.push(stocks['price']);
                });
                weekGraph(weekKabu);
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childGraphDataStockMonth.php',
            data:{
                'childId':localStorage.getItem('childId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                datas.forEach(function(stocks){
                    monthKabu.push(stocks['price']);
                });
                //monthGraph(monthKabu);
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childGraphDataStockYear.php',
            data:{
                'childId':localStorage.getItem('childId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                datas.forEach(function(stocks){
                    yearKabu.push(stocks['price']);
                });
                //monthGraph(monthKabu);
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childGraphDataProfocoencyWeek.php',
            data:{
                'childId':localStorage.getItem('childId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                datas.forEach(function(proficiencies){
                    weekKouken.push(proficiencies['influence']);
                });
                weekGraph(weekKabu);
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childGraphDataProfocoencyMonth.php',
            data:{
                'childId':localStorage.getItem('childId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                datas.forEach(function(proficiencies){
                    monthKouken.push(proficiencies['influence']);
                });
                //monthGraph(monthKabu);
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childGraphDataProfocoencyYear.php',
            data:{
                'childId':localStorage.getItem('childId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                datas.forEach(function(proficiencies){
                    yearKouken.push(proficiencies['influence']);
                });
                //monthGraph(monthKabu);
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childGraphDataStockAll.php',
            data:{
                'childId':localStorage.getItem('childId'),
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
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/childGraphDataProfocoencyAll.php',
            data:{
                'childId':localStorage.getItem('childId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                datas.forEach(function(proficiencies){
                    allKouken.push(proficiencies['influence']);
                    var date =  proficiencies['date'].slice(5,9).replace('-','/').slice(0,1) === '0' ? proficiencies['date'].slice(5,9).replace('-','/').slice(1,5) : proficiencies['date'].slice(5,9).replace('-','/');
                    allKoukenPeriod.push(date);
                });
                console.log(allKoukenPeriod);
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
});







