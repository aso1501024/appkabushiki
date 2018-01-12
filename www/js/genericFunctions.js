var weekAppendDataCreate = function(flg){
    var appendClass = 'weekOff';
    if(parseInt(flg) === 1) appendClass = 'weekOn';
    return appendClass;
}
var centeringModal = function(target){
    var w = $(window).width();
    var h = $(window).height();
    var mw = $(target).outerWidth();
    var mh = $(target).outerHeight();
    var pxleft = Math.round(((w - mw)/2));
    var pxtop = Math.round(((h - mh)/2));
    $(target).css({'left': pxleft + 'px'});
    $(target).css({'top': pxtop + 'px'});
};
var decideWeekClass = function(weekStr){
    console.log(weekStr);
    var weekClass = '';
    switch(weekStr){
        case '月': 
            weekClass = 'mon';
            break;
        case '火': 
            weekClass = 'tues';
            break;
        case '水': 
            weekClass = 'wed';
            break;
        case '木': 
            weekClass = 'thurs';
            break;
        case '金': 
            weekClass = 'fri';
            break;
        case '土': 
            weekClass = 'sat';
            break;
        case '日': 
            weekClass = 'sun';
            break;
    }
    return weekClass;
}
var decideImpact = function(num){
    var proficiency = 0;
    var num = parseInt(num);
    if(num >= 100000){
        proficiency = 13;
    }else if(num >= 10000){
        proficiency = 12;
    }else if(num >= 1500){
        proficiency = 11;
    }else if(num >= 1000){
        proficiency = 10;
    }else if(num >= 750){
        proficiency = 9;
    }else if(num >= 500){
        proficiency = 8;
    }else if(num >= 300){
        proficiency = 7;
    }else if(num >= 200){
        proficiency = 6;
    }else if(num >= 150){
        proficiency = 5;
    }else if(num >= 100){
        proficiency = 4;
    }else if(num >= 80){
        proficiency = 3;
    }else if(num >= 50){
        proficiency = 2;
    }else if(num >= 15){
        proficiency = 1;
    }else{
        proficiency = 0;
    }
    return proficiency;
}
var decideProficiency = function(num){
    var proficiency = '';
    var num = parseInt(num);
    if(num >= 100000){
        proficiency = 'L';
    }else if(num >= 10000){
        proficiency = 'SS';
    }else if(num >= 1500){
        proficiency = 'S+';
    }else if(num >= 1000){
        proficiency = 'S';
    }else if(num >= 750){
        proficiency = 'S-';
    }else if(num >= 500){
        proficiency = 'A+';
    }else if(num >= 300){
        proficiency = 'A';
    }else if(num >= 200){
        proficiency = 'A-';
    }else if(num >= 150){
        proficiency = 'B+';
    }else if(num >= 100){
        proficiency = 'B';
    }else if(num >= 80){
        proficiency = 'B-';
    }else if(num >= 50){
        proficiency = 'C+';
    }else if(num >= 15){
        proficiency = 'C';
    }else{
        proficiency = 'C-';
    }
    return proficiency;
}
var decideProficiencyClass = function(proficiency){
    console.log(proficiency);
    var proficiencyClass = '';
    switch(proficiency){
        case 'L': 
            proficiencyClass = 'font3_6';
            break;
        case 'SS': 
            proficiencyClass = 'font3_5';
            break;
        case 'S+': 
        case 'S':
        case 'S-':
            proficiencyClass = 'font3_4';
            break;
        case 'A+': 
        case 'A':
        case 'A-':
            proficiencyClass = 'font3_3';
            break;
        case 'B+': 
        case 'B':
        case 'B-':
            proficiencyClass = 'font3_2';
            break;
        case 'C+': 
        case 'C':
        case 'C-':
            proficiencyClass = 'font3_1';
            break;
    }
    console.log(proficiencyClass);
    return proficiencyClass;
}
var decisionMemory = function(values){
    var bigValue=0;
    values.forEach(function(value) {
        if(parseInt(bigValue)<parseInt(value)){
            bigValue=value;
        }
    });
    var digit = String(bigValue).length
    var digitNum = '1';
    for(i=0;i<digit-1;i++){
        digitNum = digitNum + '0';
    }
    bigValue = bigValue / parseInt(digitNum);
    bigValue = Math.ceil(bigValue);
    return parseInt(bigValue) * parseInt(digitNum) / 10;
}
var decisionMemoryArray = function(info){
    var bigValue=0;
    for(var i in info){
        for(var j in info[i]){
            if(parseInt(bigValue)<parseInt(info[i][j])){
                bigValue=info[i][j];
            }
        }
    }
    console.log(bigValue);
    var digit = String(bigValue).length
    var digitNum = '1';
    for(i=0;i<digit-1;i++){
        digitNum = digitNum + '0';
    }
    bigValue = bigValue / parseInt(digitNum);
    bigValue = Math.ceil(bigValue);
    return parseInt(bigValue) * parseInt(digitNum) / 10;
}



































