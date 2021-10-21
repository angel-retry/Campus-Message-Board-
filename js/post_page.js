let serverURL = 'https://script.google.com/macros/s/AKfycbzsDoH3bOwykNzAC6vTl1mn6VLS-zFX78Ioq4gV_AHtTnrM2h0ble_mZQE2-C8Yqojp/exec'
let articleNum = 1;
let event_ary = ['input[type=text]', 'textarea'];

$(document).ready(function(){
    initBtnFunc();
    setProgress();
    showAni();
});

for(let i=0;i<event_ary.length;i++){
    $(event_ary[i]).focusout(function(event){
        if($(this).val() == ''){
            setTip($(this));
        }
    });

    $(event_ary[i]).keyup(function(event){
        if($(this).val() != ''){
            removeTip($(this));
        }
    });
}

$('input[type=radio]').change(function(event){
    removeTip($(this));
});
$('select').change(function(event){
    removeTip($(this));
});
$('input[type=checkbox]').change(function(event){
    removeTip($(this));
});

function initBtnFunc(){
    $('.btn-next').click(function(event) {
        checkField();
    });
    $('.btn-prev').click(function(event) {
        switchArticle('prev');
    });
    $('.btn-send').click(function(event) {
        sendToServer();
    });
    $('.btn-prev').hide();
    $('.btn-send').hide();
}

function checkField(){
    switch(articleNum){
        case 2:
            if($('input[name=userName]').val() == ''){
                setTip($('input[name=userName]'));
                return false;
            }

            if($('input[name=schoolName]').val() == ''){
                setTip($('input[name=schoolName]'));
                return false;
            }

            switchArticle('next');
            break;
        case 3:
            if($('select').val() == null){
                setTip($('select'));
                return false;
            }
            if($('input[name=title]').val() == ''){
                setTip($('input[name=title]'));
                return false;
            }
            if($('textarea[name=writing]').val() == ''){
                setTip($('textarea[name=writing]'));
                return false;
            }
            break;
        default:
            switchArticle('next');
    }
}

function setTip(dom){
    let template = $('#tipTemplate01');
    let node = $('#tipTemplate01').html();
    if(dom.closest('.main-group').find('.tip').length == 0){
        dom.closest('.main-group').append(node);
        dom.closest('.main-group').addClass('bdr');
    }
}

function removeTip(dom){
    dom.closest('.main-group').find('.tip').remove();
    dom.closest('.main-group').removeClass('bdr');
}

function switchArticle(situation) {
    switch(situation){
        case 'next':
            if(articleNum < 8){
                $('nav').hide();
                gsap.to('#article' +articleNum , {
                    duration: 1,
                    x: $('.container').width()*-1,
                    onComplete: backToCenter,
                    onCompleteParams: [articleNum, situation]
                });
                $('.img'+articleNum).hide();
                $('.img'+articleNum).removeClass('newPosi');
                articleNum++;
                $('#article' +articleNum).show();
                gsap.to('#article'+articleNum,{duration: 0,x: $('.container').width()});
                gsap.to('#article'+articleNum,{duration: 1,x: 0});
                setProgress();
            }
            break;
        case 'prev':
            if(articleNum > 1){
                $('nav').hide();
                gsap.to('#article' +articleNum , {
                    duration: 1,
                    x: $('.container').width(),
                    onComplete: backToCenter,
                    onCompleteParams: [articleNum,situation]
                });
                $('.img'+articleNum).hide();
                $('.img'+articleNum).removeClass('newPosi');
                articleNum--;
                $('#article' +articleNum).show();
                gsap.to('#article'+articleNum,{duration: 0,x: $('.container').width()*-1});
                gsap.to('#article'+articleNum,{duration: 1,x: 0});
                setProgress();
            }
            break;

    }
}

function backToCenter(oldNum,situation) {
    $('#article' +oldNum).hide();
    gsap.to('#article' +oldNum , {duration: 0, x: 0});
    $('nav').show();
    showAni();
    switch(situation){
        case 'next':
            $('nav').show();
            $('.btn-next').show();
            $('.btn-prev').show();
            if(articleNum == 3){
                $('.btn-next').hide();
                $('.btn-send').show();
            }else if(articleNum == 4){
                $('nav').hide();
            }
            break;
        case 'prev':
            $('nav').show();
            $('.btn-next').show();
            $('.btn-prev').show();
            if(articleNum == 1){
                $('.btn-prev').hide();
            }
            
        break;
    }
    
}

function showAni() {
    $('.img'+articleNum).show();
    setTimeout(function(){
        $('.img'+articleNum).addClass('newPosi');
    },100);
}

function setProgress() {
    let w = Math.floor((articleNum/4)*100);
    $('.progress-bar').css('width',w+'%');
}

function sendToServer(){
    let parameter = {};
    parameter.userName = $('input[name=userName]').val();
    parameter.schoolName = $('input[name=schoolName]').val();
    parameter.schoolType = $('input[name=schoolType]:checked').val();
    parameter.feeling = $('select[name=feeling]').val();
    parameter.title = $('input[name=title]').val();
    parameter.writing = $('textarea[name=writing]').val();
    parameter.method = "write1";

    console.log(parameter);

    $('.cover').css('display','grid');
    $.post(serverURL, parameter, function(data){
        console.log(data);
        if(data.result = 'sus'){
            alert('送出成功');
            switchArticle('next');
            $('.cover').css('display','none');
        }else{
            $('.cover').css('display','none');
            alert('送出失敗，請檢查後再試試看');
        }
    }).fail(function(data){
        alert('送出失敗');
        console.log(data);
    });
}