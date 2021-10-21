$('.container-1').hide();

setTimeout(init,500);

function init(){
    $('.container-1').show();
    gsap.to('.text',{duration:0,y:-3000,opacity: 0});
    gsap.to('.img1',{duration:0,x:-5000,opacity: 0});
    gsap.to('.img3',{duration:0,x:5000,opacity: 0});
    gsap.to('.img2',{duration:0,y:5000,opacity: 0});
    gsap.to('.text',{duration:0.5,y:0,opacity: 1,onComplete:action2});

    function action2(){
        gsap.to('.img1',{duration:1,x:0,opacity: 1,onComplete:action3});
    }

    function action3(){
        gsap.to('.img2',{duration:0.5,y:0,opacity: 1,onComplete:action4});
    }

    function action4(){
        gsap.to('.img3',{duration:0.5,x:0,opacity: 1});
    }
    
    
    
}