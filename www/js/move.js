$(function(){
    $(document).on('click','#childTop',function(){
        location.href = 'childTop.html';
    });
    $(document).on('click','#childQuest',function(){
        location.href = 'childQuest.html';
    });
    $(document).on('click','#childStockSale',function(){
        location.href = 'childStockSale.html';
    });
    $(document).on('click','#childMypage',function(){
        location.href = 'childMypage.html';
    });
    $(document).on('click','#parentTop',function(){
        location.href = 'parentTop.html';
    });
    $(document).on('click','#parentQuest',function(){
        location.href = 'parentQuest.html';
    });
    $(document).on('click','#parentSetting',function(){
        location.href = 'parentMypage.html';
    });
    $(document).on('click','.jumpCategory,.updateIconPlace',function(){
        location.href = 'parentCategory.html';
    });
    $(document).on('click','.jumpQuest,.changeQuest',function(){
        location.href = 'parentQuest.html';
    });
    
});