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
        "[href]:click"                      : function(e){ AppJS.clickHref(e, this);},
        ".dropdown-toggle:click"            : function() { AppJS.DropDown(this);},
        ".overley:click"                    : function() { AppJS.closeAllModal();},
        ".close:click"                      : function() { AppJS.closeAllModal();},
        ".navbar-toggle:click"              : function() { AppJS.NavBarCollapse(this);}
    },
    NavBarCollapse : function(elem){
        var el = $(elem);
        $(".navbar-collapse:visible").fadeOut();
        if(el.closest("nav").find(".navbar-collapse:visible").length){
            el.closest("nav").find(".navbar-collapse").fadeOut();
        }else{
            el.closest("nav").find(".navbar-collapse").fadeIn();
        }

    },
    clickHref : function(e, el) {
        var url = $(el).attr('href');
        if( url.slice(0, 4) !== 'http'){
            e.preventDefault();
            AppJS.Rqst(url);
        }
    },
    closeAllModal: function(){
        $(".modal-contant").fadeOut("slow", function(){$(".overley").remove()});
    },
    clickBody: function(e) {
          if (!$(e.target).closest(".dropdown").length) {
            $('.dropdown-menu').fadeOut();
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
        $(".dropdown-menu:visible").fadeOut();
        if($(el).closest(".dropdown").find(".dropdown-menu:visible").length){
            $(el).closest(".dropdown").find(".dropdown-menu").fadeOut();
        }else{
            $(el).closest(".dropdown").find(".dropdown-menu").fadeIn();
        }
    },
    Rqst: function(url){
        $.ajax({ 
            url: url,
            success: function(res) {
                console.log(res);
                if($(res).hasClass("modal-contant")) {
                    $("<div class='overley'></div>").appendTo('body');
                    $(res).appendTo('.overley');
                    setTimeout(function(){
                        $(".modal-contant").fadeIn("slow");
                    },100);
                }
            }
        });
        return false;
    },
}
AppJS.init();