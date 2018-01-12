
        //1人目の子供の名前
        var childName="陽菜";
        //1人目の所持株数
        var haveStockNum=100;
        //1人目の子供の名前
        var childName="陽菜男";
        //1人目の所持株数
        var haveStockNum=1000;
        //1週間の株データ
        //var weekKabu = [240,240,240,224,240,230,240];
        var weekKabu = [];
        //1か月の株データ
        //var monthKabu = [210,210,210,210,201,201,201,180,190,190,190,204,204,204,195,195,195,195,221,221,221,221,231,231,240,240,240,224,240,230,240];
        var monthKabu = [];
        //1年の株データ
        //var yearKabu = [192, 232, 231, 291, 290, 331, 223, 233, 239, 240, 223, 240];
        var yearKabu = [];
        //全期間の日付データ
        //allPeriod=["1/1","2/1","3/1","4/1","5/1","6/1","7/1","8/1","9/1","10/1","11/1","12/1","1/1","2/1","3/1","4/1","5/1","6/1","7/1"];
        var allPeriod=[];
        var allKoukenPeriod = [];
        //全期間の株データ
        //var allKabu = [20,45,62,85,110,140,180,192, 232, 331, 491, 390, 431, 323, 433, 439, 240, 323, 380];
        var allKabu = [];
        //兄弟2人分の1週間の貢献度データ(2次元配列)
        //var weekKouken = [[25,25,25,23,25,21,22],[11, 11, 13, 13, 13, 13, 13]];
        var weekKouken = [];
        //兄弟2人分の1か月の貢献度データ(2次元配列)
        //var monthKouken = [[24,24,22,23,25,21,25,25,25,24,24,23,14,22,20,18,19,19,21,21,22,21,20,20,23,21,22,25,28,24,22],[10,8,9,9,8,9,10,10,10,13,13,11,11,10,12,12,13,14,15,15,13,14,14,13,11, 11, 13, 13, 13, 13, 12]];
        var monthKouken = [];
        //兄弟2人分の1年の貢献度データ(2次元配列)
        //var yearKouken = [[19, 23, 33, 29, 39, 43, 32, 23, 23, 33, 32, 24],[10, 11, 12, 13, 14, 14, 14, 12, 13, 15, 15, 12]];
        var yearKouken = [];
        //兄弟2人分の全期間の貢献度データ(2次元配列)
        //var allKouken = [[2,4,6,8,11,14,18,19, 23, 33, 29, 39, 43, 32, 23, 23, 33, 32, 24],[5,10,11,10,11,13,11,10, 11, 12, 13, 14, 14, 14, 12, 13, 15, 15, 12]];
        var allKouken = [];

        //株価と貢献度の変更処理
        flg = false; //株価ならtrue 貢献度ならfalse
        function toggle(){
            if(flg == true){ 
                flg = false;
                document.getElementById("botan").value = "株価"; // ボタンのラベルの変更
                if(document.getElementById('now').value=="0" || document.getElementById('now').value==""){
                    weekKabuGraph(weekKabu);
                }else if(document.getElementById('now').value=="1"){
                    monthKabuGraph(monthKabu);
                }else if(document.getElementById('now').value=="2"){
                    yearKabuGraph(yearKabu);
                }else if(document.getElementById('now').value=="3"){
                    allKabuGraph(allPeriod,allKabu);
                }
            }else{
                flg = true;
                document.getElementById("botan").value = "貢献度"; // ボタンのラベルの変更
                if(document.getElementById('now').value=="0" || document.getElementById('now').value==""){
                    weekKoukenGraph(weekKouken);
                }else if(document.getElementById('now').value=="1"){
                    monthKoukenGraph(monthKouken);
                }else if(document.getElementById('now').value=="2"){
                    yearKoukenGraph(yearKouken);
                }else if(document.getElementById('now').value=="3"){
                    allKoukenGraph(allPeriod,allKouken);
                }
            }
        }

        //現在日付取得
        var Nowymdhms　=　new Date();
        var year = Nowymdhms.getFullYear();
        var month = Nowymdhms.getMonth() + 1;
        var day = Nowymdhms.getDate();
        //期間のセレクトボックスを選んだ時の処理
        function changeItem(obj){
            //もしも期間が一週間で株価表示だったら
            if( obj.value == 0 && flg==false){
                weekKabuGraph(weekKabu);
            }else if(obj.value == 0 && flg==true){ 
                weekKoukenGraph(weekKouken);
            }else if(obj.value == 1 && flg==false){ 
                monthKabuGraph(monthKabu);
            }else if(obj.value == 1 && flg==true){
                monthKoukenGraph(monthKouken);
            }else if(obj.value == 2 && flg==false){
                yearKabuGraph(yearKabu);
            }else if(obj.value == 2 && flg==true){
                yearKoukenGraph(yearKouken);
            }else if(obj.value == 3 && flg==false){
                allKabuGraph(allPeriod,allKabu);
            }else if(obj.value == 3 && flg==true){
                allKoukenGraph(allPeriod,allKouken);
            }
        }

        //i日前の日付を取り出す
        function beforeDaySearch(i){
        var wNames = ['日', '月', '火', '水', '木', '金', '土'];
        var nowDate = new Date();
        //本日から　i　日後のDate
        var futureDate = new Date(nowDate.getTime() + (i*24*60*60*1000));

        var txt = (futureDate.getMonth()+1) + "/" + futureDate.getDate();
        return txt;
        }

        //iか月前を取り出す
        function beforeMonthSearch(i){
            var tmp = new Date();

            // setMonthで、「現在月 = 現在月 + ｎヶ月」を行う
            tmp.setMonth( tmp.getMonth() + i );

            var year = tmp.getFullYear();
            var mon = tmp.getMonth();
            var date = year + "/" + (mon < 9 ? '0' : '') + (mon + 1);
            return date;
        }

        //ページ更新時に1週間の株価グラフ表示グラフ
        window.onload = function(){
            weekKabuGraph(weekKabu);
        }

        //1週間の株価グラフ表示
        function weekKabuGraph(info){
            oneNum = decisionMemory(info);
            data=info;
            var ctx = document.getElementById("line-chart").getContext("2d");
                var lineChartData = {
                //X軸のラベル
                labels : [beforeDaySearch(-6),beforeDaySearch(-5),beforeDaySearch(-4),beforeDaySearch(-3),beforeDaySearch(-2),beforeDaySearch(-1),beforeDaySearch(0)],
                datasets : [
                {
                    //1つ目のグラフの描画設定
                    label: "兄",
                    fillColor : /*"#f2dae8"*/"rgba(255,255,255,0.0)",//面の色・透明度
                    strokeColor : /*"#dd9cb4"*/"rgba(221,156,180,0.6)",//線の色・透明度
                    pointColor : /*"#dd9cb4"*/"rgba(255,255,255,0.0)",//点の色・透明度
                    pointStrokeColor : "rgba(221,156,180,0.6)",//値の点の枠線の色; 
                    pointHighlightFill : "rgba(221,156,180,0.6)",
                    //赤・緑・青・透明
                    pointHighlightStroke : /*"#dd9cb4"*/"rgba(221,156,180,0.6)",
                    data//labelごとのデータ
                }
                
                ]


                }

                var option = {
                    responsive: true,
                    bezierCurve: false,//線がまっすぐになります
                    // アニメーション停止
                    // animation: false
                    scaleOverride: true, //縦軸のメモリの上書き許可
                    //** ↑がtrueの場合 **
                    datasetStrokeWidth : 4,//グラフ線の太さ
                    pointDotRadius : 0.1,//グラフ点の半径
                    scaleFontSize: 10, //目盛りの文字の大きさ 
                    scaleFontStyle : "normal",//目盛りのフォントスタイル bold→太字 
                    scaleStepWidth : oneNum, //縦軸の目盛り
                    scaleSteps: 10,// 縦軸の目盛りの数
                    scaleStartValue : 0,//Number - 目盛りの最小値 
                    scaleShowLabels : true,//目盛りを表示するかどうか 
                    scaleFontFamily : "'Arial'"//目盛りのフォント
                }
                //グラフを描画する
                var myNewChart = new Chart(ctx).Line(lineChartData,option);
        }

        //1か月の株価グラフ表示
        function monthKabuGraph(info){
            oneNum = decisionMemory(info);
            data=info;
            var ctx = document.getElementById("line-chart").getContext("2d");
                var lineChartData = {
                //X軸のラベル
                labels : [beforeDaySearch(-29),"","","","",beforeDaySearch(-24),"","","","",beforeDaySearch(-19),"","","","",beforeDaySearch(-14),"","","","",beforeDaySearch(-9),"","","","",beforeDaySearch(-4),"","","",beforeDaySearch(0)],
                datasets : [
                {
                    //1つ目のグラフの描画設定
                    label: "兄",
                    fillColor : /*"#f2dae8"*/"rgba(255,255,255,0.0)",//面の色・透明度
                    strokeColor : /*"#dd9cb4"*/"rgba(221,156,180,0.6)",//線の色・透明度
                    pointColor : /*"#dd9cb4"*/"rgba(255,255,255,0.0)",//点の色・透明度
                    pointStrokeColor : "rgba(221,156,180,0.6)",//値の点の枠線の色; 
                    pointHighlightFill : "rgba(221,156,180,0.6)",
                    //赤・緑・青・透明
                    pointHighlightStroke : /*"#dd9cb4"*/"rgba(221,156,180,0.6)",
                    data//labelごとのデータ
                }
                ]


                }

                var option = {
                    responsive: true,
                    bezierCurve: false,//線がまっすぐになります
                    // アニメーション停止
                    // animation: false
                    scaleOverride: true, //縦軸のメモリの上書き許可
                    //** ↑がtrueの場合 **
                    datasetStrokeWidth : 4,//グラフ線の太さ
                    pointDotRadius : 0.1,//グラフ点の半径
                    scaleFontSize: 10, //目盛りの文字の大きさ 
                    scaleFontStyle : "normal",//目盛りのフォントスタイル bold→太字 
                    scaleStepWidth : oneNum, //縦軸の目盛り
                    scaleSteps: 10,// 縦軸の目盛りの数
                    scaleStartValue : 0,//Number - 目盛りの最小値 
                    scaleShowLabels : true,//目盛りを表示するかどうか 
                    scaleFontFamily : "'Arial'"//目盛りのフォント
                }
                //グラフを描画する
                var myNewChart = new Chart(ctx).Line(lineChartData,option);
        }

        //1年間の株価グラフ
        function yearKabuGraph(info){
            oneNum = decisionMemory(info);
            data=info
            var ctx = document.getElementById("line-chart").getContext("2d");
                var lineChartData = {
                //X軸のラベル
                labels : [beforeMonthSearch(-11),beforeMonthSearch(-10),beforeMonthSearch(-9),beforeMonthSearch(-8),beforeMonthSearch(-7),beforeMonthSearch(-6),beforeMonthSearch(-5),beforeMonthSearch(-4),beforeMonthSearch(-3),beforeMonthSearch(-2),beforeMonthSearch(-1),beforeMonthSearch(0)],
                datasets : [
                {
                    //1つ目のグラフの描画設定
                    label: "兄",
                    fillColor : /*"#f2dae8"*/"rgba(255,255,255,0.0)",//面の色・透明度
                    strokeColor : /*"#dd9cb4"*/"rgba(221,156,180,0.6)",//線の色・透明度
                    pointColor : /*"#dd9cb4"*/"rgba(255,255,255,0.0)",//点の色・透明度
                    pointStrokeColor : "rgba(221,156,180,0.6)",//値の点の枠線の色; 
                    pointHighlightFill : "rgba(221,156,180,0.6)",
                    //赤・緑・青・透明
                    pointHighlightStroke : /*"#dd9cb4"*/"rgba(221,156,180,0.6)",
                    data//labelごとのデータ
                }
                ]


                }


                var option = {
                    responsive: true,
                    bezierCurve: false,//線がまっすぐになります
                    // アニメーション停止
                    // animation: false
                    scaleOverride: true, //縦軸のメモリの上書き許可
                    //** ↑がtrueの場合 **
                    datasetStrokeWidth : 4,//グラフ線の太さ
                    pointDotRadius : 0.1,//グラフ点の半径
                    scaleFontSize: 10, //目盛りの文字の大きさ 
                    scaleFontStyle : "normal",//目盛りのフォントスタイル bold→太字 
                    scaleStepWidth : oneNum, //縦軸の目盛り
                    scaleSteps: 10,// 縦軸の目盛りの数
                    scaleStartValue : 0,//Number - 目盛りの最小値 
                    scaleShowLabels : true,//目盛りを表示するかどうか 
                    scaleFontFamily : "'Arial'"//目盛りのフォント
                }
                //グラフを描画する
                var myNewChart = new Chart(ctx).Line(lineChartData,option);
        }

        //全期間の株価グラフ
        function allKabuGraph(allPeriod,allData){
            oneNum = decisionMemory(allData);
            var labels = allPeriod;
            var data = allData;  
            var ctx = document.getElementById("line-chart").getContext("2d");
                var lineChartData = {
                //X軸のラベル
                labels,
                datasets : [
                {
                    //1つ目のグラフの描画設定
                    label: "兄",
                    fillColor : /*"#f2dae8"*/"rgba(255,255,255,0.0)",//面の色・透明度
                    strokeColor : /*"#dd9cb4"*/"rgba(221,156,180,0.6)",//線の色・透明度
                    pointColor : /*"#dd9cb4"*/"rgba(255,255,255,0.0)",//点の色・透明度
                    pointStrokeColor : "rgba(221,156,180,0.6)",//値の点の枠線の色; 
                    pointHighlightFill : "rgba(221,156,180,0.6)",
                    //赤・緑・青・透明
                    pointHighlightStroke : /*"#dd9cb4"*/"rgba(221,156,180,0.6)",
                    data//labelごとのデータ
                }
                ]


                }


                var option = {
                    responsive: true,
                    bezierCurve: false,//線がまっすぐになります
                    // アニメーション停止
                    // animation: false
                    scaleOverride: true, //縦軸のメモリの上書き許可
                    //** ↑がtrueの場合 **
                    datasetStrokeWidth : 4,//グラフ線の太さ
                    pointDotRadius : 0.1,//グラフ点の半径
                    scaleFontSize: 10, //目盛りの文字の大きさ 
                    scaleFontStyle : "normal",//目盛りのフォントスタイル bold→太字 
                    scaleStepWidth : oneNum, //縦軸の目盛り
                    scaleSteps: 10,// 縦軸の目盛りの数
                    scaleStartValue : 0,//Number - 目盛りの最小値 
                    scaleShowLabels : true,//目盛りを表示するかどうか 
                    scaleFontFamily : "'Arial'"//目盛りのフォント
                }
                //グラフを描画する
                var myNewChart = new Chart(ctx).Line(lineChartData,option);
        }

        
        //1週間の貢献度グラフ表示
        function weekKoukenGraph(info){
            oneNum = decisionMemoryArray(info);
            //ユーザの貢献データを入れるための配列の初期化
            var datasets= [];
            var strokeColor= /*"#dd9cb4"*/"rgba(255,0,0,0.6)";
            //描画設定の連想配列の初期化
            for(var i=0;i<info.length;i++){
                if(i==1){
                    strokeColor= /*"#dd9cb4"*/"rgba(0,0,255,0.6)";
                }
                var data=info[i];
                var hoge={
                label: "兄",
                fillColor : /*"#f2dae8"*/"rgba(255,255,255,0.0)",//面の色・透明度
                strokeColor,//線の色・透明度
                pointColor : /*"#dd9cb4"*/"rgba(255,255,255,0.0)",//点の色・透明度
                pointStrokeColor : "rgba(221,156,180,0.6)",//値の点の枠線の色; 
                pointHighlightFill : "rgba(221,156,180,0.6)",
                //赤・緑・青・透明
                pointHighlightStroke : /*"#dd9cb4"*/"rgba(221,156,180,0.6)",
                data
                }
            datasets.push(hoge);
            }
            
            var ctx = document.getElementById("line-chart").getContext("2d");
                var lineChartData = {
                //X軸のラベル
                labels : [beforeDaySearch(-6),beforeDaySearch(-5),beforeDaySearch(-4),beforeDaySearch(-3),beforeDaySearch(-2),beforeDaySearch(-1),beforeDaySearch(0)],
                datasets
                }

                var option = {
                    responsive: true,
                    bezierCurve: false,//線がまっすぐになります
                    // アニメーション停止
                    // animation: false
                    scaleOverride: true, //縦軸のメモリの上書き許可
                    //** ↑がtrueの場合 **
                    datasetStrokeWidth : 4,//グラフ線の太さ
                    pointDotRadius : 0.1,//グラフ点の半径
                    scaleFontSize: 10, //目盛りの文字の大きさ 
                    scaleFontStyle : "normal",//目盛りのフォントスタイル bold→太字 
                    scaleStepWidth : oneNum, //縦軸の目盛り
                    scaleSteps: 10,// 縦軸の目盛りの数
                    scaleStartValue : 0,//Number - 目盛りの最小値 
                    scaleShowLabels : true,//目盛りを表示するかどうか 
                    scaleFontFamily : "'Arial'",//目盛りのフォント
                }
                //グラフを描画する
                var myNewChart = new Chart(ctx).Line(lineChartData,option);
        }

        //1か月の貢献度グラフ表示
        function monthKoukenGraph(info){
            oneNum = decisionMemoryArray(info);
            //ユーザの貢献データを入れるための配列の初期化
            var datasets= [];
            var strokeColor= /*"#dd9cb4"*/"rgba(255,0,0,0.6)";
            //描画設定の連想配列の初期化
            for(var i=0;i<info.length;i++){
                if(i==1){
                    strokeColor= /*"#dd9cb4"*/"rgba(0,0,255,0.6)";
                }
                var data=info[i];
                var hoge={
                label: "兄",
                fillColor : /*"#f2dae8"*/"rgba(255,255,255,0.0)",//面の色・透明度
                strokeColor,//線の色・透明度
                pointColor : /*"#dd9cb4"*/"rgba(255,255,255,0.0)",//点の色・透明度
                pointStrokeColor : "rgba(221,156,180,0.6)",//値の点の枠線の色; 
                pointHighlightFill : "rgba(221,156,180,0.6)",
                //赤・緑・青・透明
                pointHighlightStroke : /*"#dd9cb4"*/"rgba(221,156,180,0.6)",
                data
                }
            datasets.push(hoge);
            }
            var ctx = document.getElementById("line-chart").getContext("2d");
                var lineChartData = {
                //X軸のラベル
                labels : [beforeDaySearch(-29),"","","","",beforeDaySearch(-24),"","","","",beforeDaySearch(-19),"","","","",beforeDaySearch(-14),"","","","",beforeDaySearch(-9),"","","","",beforeDaySearch(-4),"","","",beforeDaySearch(0)],
                datasets


                }

                var option = {
                    responsive: true,
                    bezierCurve: false,//線がまっすぐになります
                    // アニメーション停止
                    // animation: false
                    scaleOverride: true, //縦軸のメモリの上書き許可
                    //** ↑がtrueの場合 **
                    datasetStrokeWidth : 4,//グラフ線の太さ
                    pointDotRadius : 0.1,//グラフ点の半径
                    scaleFontSize: 10, //目盛りの文字の大きさ 
                    scaleFontStyle : "normal",//目盛りのフォントスタイル bold→太字 
                    scaleStepWidth : oneNum, //縦軸の目盛り
                    scaleSteps: 10,// 縦軸の目盛りの数
                    scaleStartValue : 0,//Number - 目盛りの最小値 
                    scaleShowLabels : true,//目盛りを表示するかどうか 
                    scaleFontFamily : "'Arial'"//目盛りのフォント
                }
                //グラフを描画する
                var myNewChart = new Chart(ctx).Line(lineChartData,option);
        }

        //1年間の貢献度グラフ
        function yearKoukenGraph(info){
            oneNum = decisionMemoryArray(info);
            console.log(info);
            console.log(oneNum);
            //ユーザの貢献データを入れるための配列の初期化
            var datasets= [];
            var strokeColor= /*"#dd9cb4"*/"rgba(255,0,0,0.6)";
            //描画設定の連想配列の初期化
            for(var i=0;i<info.length;i++){
                if(i==1){
                    strokeColor= /*"#dd9cb4"*/"rgba(0,0,255,0.6)";
                }
                var data=info[i];
                var hoge={
                label: "兄",
                fillColor : /*"#f2dae8"*/"rgba(255,255,255,0.0)",//面の色・透明度
                strokeColor,//線の色・透明度
                pointColor : /*"#dd9cb4"*/"rgba(255,255,255,0.0)",//点の色・透明度
                pointStrokeColor : "rgba(221,156,180,0.6)",//値の点の枠線の色; 
                pointHighlightFill : "rgba(221,156,180,0.6)",
                //赤・緑・青・透明
                pointHighlightStroke : /*"#dd9cb4"*/"rgba(221,156,180,0.6)",
                data
                }
            datasets.push(hoge);
            }
            var ctx = document.getElementById("line-chart").getContext("2d");
                var lineChartData = {
                //X軸のラベル
                labels : [beforeMonthSearch(-11),beforeMonthSearch(-10),beforeMonthSearch(-9),beforeMonthSearch(-8),beforeMonthSearch(-7),beforeMonthSearch(-6),beforeMonthSearch(-5),beforeMonthSearch(-4),beforeMonthSearch(-3),beforeMonthSearch(-2),beforeMonthSearch(-1),beforeMonthSearch(0)],
                datasets
                }


                var option = {
                    responsive: true,
                    bezierCurve: false,//線がまっすぐになります
                    // アニメーション停止
                    // animation: false
                    scaleOverride: true, //縦軸のメモリの上書き許可
                    //** ↑がtrueの場合 **
                    datasetStrokeWidth : 4,//グラフ線の太さ
                    pointDotRadius : 0.1,//グラフ点の半径
                    scaleFontSize: 10, //目盛りの文字の大きさ 
                    scaleFontStyle : "normal",//目盛りのフォントスタイル bold→太字 
                    scaleStepWidth : oneNum, //縦軸の目盛り
                    scaleSteps: 10,// 縦軸の目盛りの数
                    scaleStartValue : 0,//Number - 目盛りの最小値 
                    scaleShowLabels : true,//目盛りを表示するかどうか 
                    scaleFontFamily : "'Arial'"//目盛りのフォント
                }
                //グラフを描画する
                var myNewChart = new Chart(ctx).Line(lineChartData,option);
        }

        //全期間の貢献度グラフ
        function allKoukenGraph(allPeriod,allData){
            oneNum = decisionMemoryArray(allData);
            //ユーザの貢献データを入れるための配列の初期化
            var datasets= [];
            var strokeColor= /*"#dd9cb4"*/"rgba(255,0,0,0.6)";
            //描画設定の連想配列の初期化
            for(var i=0;i<allPeriod.length;i++){
                if(i==1){
                    strokeColor= /*"#dd9cb4"*/"rgba(0,0,255,0.6)";
                }
                var data=allData[i];
                var hoge={
                label: "兄",
                fillColor : /*"#f2dae8"*/"rgba(255,255,255,0.0)",//面の色・透明度
                strokeColor,//線の色・透明度
                pointColor : /*"#dd9cb4"*/"rgba(255,255,255,0.0)",//点の色・透明度
                pointStrokeColor : "rgba(221,156,180,0.6)",//値の点の枠線の色; 
                pointHighlightFill : "rgba(221,156,180,0.6)",
                //赤・緑・青・透明
                pointHighlightStroke : /*"#dd9cb4"*/"rgba(221,156,180,0.6)",
                data
                }
            datasets.push(hoge);
            }
            var labels = allPeriod; 
            var ctx = document.getElementById("line-chart").getContext("2d");
                var lineChartData = {
                //X軸のラベル
                labels,
                datasets


                }


                var option = {
                    responsive: true,
                    bezierCurve: false,//線がまっすぐになります
                    // アニメーション停止
                    // animation: false
                    scaleOverride: true, //縦軸のメモリの上書き許可
                    //** ↑がtrueの場合 **
                    datasetStrokeWidth : 4,//グラフ線の太さ
                    pointDotRadius : 0.1,//グラフ点の半径
                    scaleFontSize: 10, //目盛りの文字の大きさ 
                    scaleFontStyle : "normal",//目盛りのフォントスタイル bold→太字 
                    scaleStepWidth : oneNum, //縦軸の目盛り
                    scaleSteps: 10,// 縦軸の目盛りの数
                    scaleStartValue : 0,//Number - 目盛りの最小値 
                    scaleShowLabels : true,//目盛りを表示するかどうか 
                    scaleFontFamily : "'Arial'"//目盛りのフォント
                }
                //グラフを描画する
                var myNewChart = new Chart(ctx).Line(lineChartData,option);
        }