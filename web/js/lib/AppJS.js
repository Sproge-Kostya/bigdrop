var AppJS = {
    vHundlers: {},
    regHundlers: function(hs, on){
        for(var h in hs){
            var k = h.split(":",2); var _k0 = k[0].replace('--', ':');
            on ? $(document).on(k[1],_k0, hs[h]) : $(document).off(k[1],k[0], hs[h]);
        }
    },
    ready: function(){
        AppJS.regHundlers(AppJS.hundlers,true);
        $(".banner-img").slick({
            autoplay: true,
            autoplaySpeed:5000,
            dots: false,
            arrows:false,
            speed:2000,
        });
        $(".dropdown-menu").fadeOut();
    },
    init:function(){$(document).ready(AppJS.ready);},
    hundlers : {
        "body:click"                        : function(e){ AppJS.clickBody(e); },
        "[href]:click"                      : function(e){ e.preventDefault();/*AppJS.clickHref(e, this);*/},
        ".dropdown-toggle:click"            : function() { AppJS.DropDown(this);},
        ".overley:click"                    : function() { AppJS.closeAllModal();},
        ".close:click"                      : function() { AppJS.closeAllModal();},
        ".navbar-toggle:click"              : function() { AppJS.NavBarCollapse(this);},
        ".mdl:click"                        : function() { AppJS.ModalBox();},
        "#contact input:input"              : function() { console.log();if($(this).val().length > 2){$(this).addClass("invalid");}else{$(this).removeClass("invalid");}} 
    },
    NavBarCollapse : function(elem){
        var el = $(elem);
        $(".navbar-collapse:visible").fadeOut();
        if(el.closest("nav").find(".navbar-collapse:visible").length){
            el.removeClass("open");
            el.closest("nav").find(".navbar-collapse").fadeOut();
        }else{
            el.addClass("open");
            el.closest("nav").find(".navbar-collapse").fadeIn();
        }

    },
    ModalBox: function(){
        if(!$(".overley").length){
            $("<div class='overley'></div>").appendTo('body');
            $(".modal-contant").fadeIn("slow");
        }
    },
    // clickHref : function(e, el) { //без локального сервера это тоже не нужно 
    //     var url = $(el).attr('href');
    //     if( url.slice(0, 4) !== 'http'){
    //         e.preventDefault();
    //         // AppJS.Rqst(url);
    //     }
    // },
    closeAllModal: function(){
        var el = $(".modal-contant, .dropdown-menu");
        el.fadeOut("fast", function(){$(".overley").remove();});
        if($(window).width() < 992){
            elMobl = $(".navbar-collapse");
            elMobl.fadeOut("slow", function(){$(".open").removeClass("open");});
        }        
    },
    clickBody: function(e) {
          if (!$(e.target).closest(".dropdown").length) {
            $('.dropdown-menu').fadeOut();
          }
          if($(window).width() < 992){
              if (!$(e.target).closest("nav").length) {
                $('.navbar-collapse').fadeOut();
                $(".open").removeClass("open");
              }
          }
          e.stopPropagation();
    },
    openCurrency: function(elements){
        console.log(elements);
        $('.input-wrapper').removeClass('active');
        $(elements).addClass('active');
        var currencyBlock = $('.currency-field');
        if (!currencyBlock.hasClass("active")) {
            $(currencyBlock).addClass('active');
        }else{
            $(currencyBlock).removeClass('active');
        }
    },
    DropDown: function(el){
        AppJS.closeAllModal();
        $(".dropdown-menu:visible").fadeOut();
        if($(el).closest(".dropdown").find(".dropdown-menu:visible").length){
            $(el).closest(".dropdown").find(".dropdown-menu").fadeOut();
        }else{
            $(el).closest(".dropdown").find(".dropdown-menu").fadeIn();
        }
    },
    // Rqst: function(url){  //вернуть вьюху модалки когд аесть сервер илм локальный сервер
    //     $.ajax({ 
    //         url: url,
    //         success: function(res) {
    //             console.log(res);
    //             if($(res).hasClass("modal-contant")) {
    //                 if(!$(".overley").length){
    //                     AppJS.closeAllModal();
    //                     $(res).appendTo('body');
    //                     setTimeout(function(){
    //                         $(".modal-contant").fadeIn("slow");
    //                     },100);
    //                     $("<div class='overley'></div>").appendTo('body');
    //                 }
    //             }
    //         }
    //     });
    //     return false;
    // },
}
AppJS.init();