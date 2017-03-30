$(function() {
    var offset = $('.main').offset();
    var windowHeight = $(window).height();


    $(window).scroll(function () {
        fixMenu(offset);

        //アニメーション管理
        var topWindow = $(window).scrollTop();
        $('.animation').each(function(){
            var targetPosition = $(this).offset().top;
            if(topWindow > targetPosition - windowHeight + 100){
                if($(this).hasClass('BIU')){
                    setAnimation($(this),"bounceInUp");
                }
                if($(this).hasClass('FIL')){
                    setAnimation($(this),'fadeInLeft');
                }
            }
        });
    });

    //基本メニューによる画面移動処理
    $('.scroll').click(function(e){
        e.preventDefault();
        var url = this.href;
        scrollView(url);
    });

    //ドロワーメニューによる画面移動処理
    $('.drawr_scroll').click(function(e){
        e.preventDefault();
        console.log("called");
        var url = this.href;
        scrollView(url);
        $('.drawr').animate({ width: 'toggle' }, {
            complete: function () {
                $('.main.menu_small').show();
            }
        });
    })

    //ドロワーメニュー表示
    $('.drawr').css('height',windowHeight)
    $('.open_menu').click(function() {
        $('.drawr').animate({width:'toggle'});
        $('.main').hide();
    });

    //ドロワーメニューを閉じる
    $('.close_menu').click(function(e) {
        closeDrawr();
    });

    //リサイズ処理
    $(window).on('resize',function() {
        if(window.matchMedia('(min-width: 681px)').matches){
            $('.menu_large').css({
                'display': 'block'
            });
            $('.menu_small').css({
                'display': 'none'
            });
            $('.drawr').css({
                'display': 'none'
            });
        } else {
            $('.menu_large').css({
                'display': 'none'
            });
            $('.menu_small').css({
                'display': 'block'
            });
            $('.drawr').css({
                'display': 'none'
            });
        }
    })
});

const scrollView = (url) => {
        var target = url.split("#")[1];
        var target_top = $("#"+ target).offset().top - 70;
        if($('.main').hasClass('fixed') == false){
            target_top -= 46;
        }
        $('html,body').animate({scrollTop:target_top},'slow');
}

const closeDrawr = () => {
    $('.drawr').animate({width:'toggle'},'normal',function() {
        $('.main.menu_small').show();
    });
}

const fixMenu = (offset) => {
    var adjustment = $('#about').offset().top - 20;
    //メインメニュー固定
    if ($(window).scrollTop() > offset.top + adjustment) {
        $('.main').addClass('fixed');
    } else {
        $('.main').removeClass('fixed');
    }
}

const setAnimation = (jQueryObject,AnimationName) => {
    jQueryObject.css({'visibility': 'visible'});
    jQueryObject.addClass("animated "+ AnimationName);
    
}