$(function(){
    
    var changeCategoryId;
    
    $(document).ready(function(){
        $.ajax({
            type: 'POST',
            url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/categorySelect.php',
            data:{
                'parentId':localStorage.getItem('parentId'),
            },
            success: function(data){
                console.log(data);
                var datas = JSON.parse(data);
                datas.forEach(function(idNameArray){
                    var appendData = '<div class="list">';
                    appendData += '<div  class="font3" data-id="' + idNameArray['id'] + '">' + idNameArray['name'] + '</div>';
                    appendData += '<button class="changecategory">変更</burron>';
                    appendData += '</div>';
                    $('.categoryBox').append(appendData);
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThtown){
                console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
            }
        });
    });
    $(document).on('click','.categoryadd',function(){
        $('#category-add-modal').append('<input id="category-add-btn" class="addbtn" type="button" value="登録">');
        $('body').append('<div id="category-backimg" class="modal-backimage"></div>');
        centeringModal('#category-add-modal');
        $('#category-backimg,#category-add-modal').fadeIn("slow");
    });
    $(document).on('click','#category-backimg,#modal-close',function(){
        $('#category-add-modal,#category-backimg').fadeOut('slow',function(){
            $('input[name="categoryName"]').val('');
            $('#category-add-btn').remove();
            $('#category-backimg').remove();
        });
    });
    $(document).on('click','#change-modal-backimg,#modal-close',function(){
        $('#category-add-modal,#change-modal-backimg').fadeOut('slow',function(){
            $('input[name="categoryName"]').val('');
            $('#category-change-btn').remove();
            $('#change-modal-backimg').remove();
        });
    });
    $(document).on('click','#category-add-btn',function(){
        if($('input[name="categoryName"]').val().length !== 0){
            $.ajax({
                type: 'POST',
                url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/categoryInsert.php',
                data:{
                    'parentId':localStorage.getItem('parentId'),
                    'categoryName':$('input[name="categoryName"]').val()
                },
                success: function(data){
                    console.log(data);
                    var appendData = '<div class="list">';
                    appendData += '<div  class="font3" data-id="' + data + '">' + $('input[name="categoryName"]').val() + '</div>';
                    appendData += '<button class="changecategory">変更</burron>';
                    appendData += '</div>';
                    $('.categoryBox').append(appendData);
                    alert('追加成功');
                },
                error: function(XMLHttpRequest, textStatus, errorThtown){
                    console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
                }
            });
        }else{
            
        }
    });
    $(document).on('click','.changecategory',function(){
        $('#category-add-modal').append('<input id="category-change-btn" class="addbtn" type="button" value="変更">');
        changeCategoryId = $(this).parent().children('.font3').attr('data-id');
        $('body').append('<div id="change-modal-backimg" class="modal-backimage"></div>');
        centeringModal('#category-add-modal');
        $('#change-modal-backimg,#category-add-modal').fadeIn("slow");
    });
    $(document).on('click','#category-change-btn',function(){
        console.log(changeCategoryId);
        if($('input[name="categoryName"]').val().length !== 0){
            $.ajax({
                type: 'POST',
                url: 'http://flowerknightgirl-hshs.mydns.jp/kabu/categoryChange.php',
                data:{
                    'parentId':localStorage.getItem('parentId'),
                    'categoryId':changeCategoryId,
                    'categoryName':$('input[name="categoryName"]').val()
                },
                success: function(data){
                    console.log(data);
                    location.reload();
                },
                error: function(XMLHttpRequest, textStatus, errorThtown){
                    console.log(XMLHttpRequest + ":" + textStatus + ":" + errorThtown);
                }
            });
        }else{
            
        }
    });
});




























