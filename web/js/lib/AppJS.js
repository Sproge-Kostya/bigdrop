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
        $('.banner').slick({
		  dots: false,
		  infinite: false,
		  speed: 500,
		});
    },
    init:function(){$(document).ready(AppJS.ready);},
    hundlers : {
        "[href]:click"                      : function(e){ AppJS.clickHref(e, this);},
    },
    clickHref : function(e, el) {
        $(".nav-menu li").removeClass("active");
        $(el).closest("li").addClass("active");
        var url = $(el).attr('href');
        if( url.slice(0, 4) !== 'http'){
            console.log(e, el);
            e.preventDefault();
            if(url[0] !== "#"){
                $.get({url: url, writeHistory: true, notBlock: true });
                if(!$(el).hasClass('js-noScrollLink')) $('html, body').animate({scrollTop: 0}, 300);
            }
        }
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
    ModalBox: function(elements){
        var $this = $(elements);
        $.ajax({ 
            url: $this.attr("href"),
            dataType: "html",
            success: function(res) {
                //console.log(res);
                $(res).appendTo('.bestcours');
                $("<div class='overley'></div>").appendTo('.bestcours');
                $('.mdl-content').addClass("active");
                AppJS.Tabs();
            }
        });
        return false;
    },
}
AppJS.init();