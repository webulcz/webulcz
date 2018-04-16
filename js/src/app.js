
// jQuery code
$(document).ready(function(){

    // Navigation
    $('#nav-icon1').click(function(){
        $(this).toggleClass('animate-icon');
            $('#menuoverlay').fadeToggle();
        });

        $('#menuoverlay').click(function(){
            $('#nav-icon1').removeClass('animate-icon');
        $('#menuoverlay').toggle();
    });

    // Scrollspy
    $('body').scrollspy({target: "#menuoverlay", offset: 0});
    $("#menuoverlay a, .scrollspy").on('click', function(event) {
        var h = this.hash;
        var res = h.replace("#", "");
        if ($(h).length < 1 ) {window.location=this.href;}
        else
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
                }, 800, function(){
                window.location.hash = hash;
            });
        }  // End if
    });
    

    // About typing
    function AboutTitle_type(){
        let obj =  $("#about .large-title--shrinked");
        let text = obj.attr("data-rel");
        if (!obj.hasClass("typed")) {
            setTimeout(function(){
                obj.typetype(text, {e: 0, t:20, callback: function(){
                    animationTrigger("#about .content--right",1000);
                }});
                obj.addClass("typed");
            },1000);
        }
    };

    // Animation trigger
    function Animate_Reset(section,timeout,selector){
        let sel = " .animate";
        if (selector !== undefined) sel = selector;
        let tmo = 0;
        if (timeout !== undefined) tmo = timeout;

        let objs =  $(section + sel);
        setTimeout(function(){
            objs.each(function(){
                if ($(this).hasClass("animated")) {
                    $(this).removeClass("animated");
                    $(this).removeClass($(this).attr("data-class"));
                }
            })
        },tmo);
    };

    // Animation trigger
    function animationTrigger(section,timeout,selector){
        let sel = " .animate";
        if (selector !== undefined) sel = selector;
        let tmo = 0;
        if (timeout !== undefined) tmo = timeout;

        let objs =  $(section + sel);
        setTimeout(function(){
            objs.each(function(){
                if ($(this).hasClass("animate")) {
                    $(this).removeClass("animate");
                    $(this).addClass("animated " + $(this).attr("data-class"));
                }

            })
        },tmo);
    };

    // About add background
    function About_addBack(){
        let about = $("#about .content--left");
        if (!about.hasClass("content__back"))
            about.addClass("content__back");
    }
    


    // ============== Waypoint about 15 ==============
    var waypoint_about = new Waypoint({
        element: document.querySelector("#about"),
        handler: function(direction) {
            if (direction == "down") { 
                About_addBack();
                animationTrigger("#about .content--left",1000);
                // AboutTitle_type();
                animationTrigger("#about .large-title--on-right",1000,"");
                animationTrigger("#about .content--right",2000);
             }
            else {
            }
        },
        offset: "15%"
    });

    // ============== Waypoint contact 15 ==============
    var waypoint_contact = new Waypoint({
        element: document.querySelector("#contact"),
        handler: function(direction) {
            if (direction == "down") { 
                animationTrigger("#contact",0);
             }
            else {
            }
        },
        offset: "15%"
    });
    
    // function animationStart() {
    //     $('#container').addClass('fin');
    // }
    // setTimeout(animationStart, 250)                        
    
    function disableScrolling(){
        var x=window.scrollX;
        var y=window.scrollY;
        window.onscroll=function(){window.scrollTo(x, y);};
    }
    
    function enableScrolling(){
        window.onscroll=function(){};
    }   
    
    function repeatXTimes(times, func, ms, cb){
        func();
        setTimeout(() => {
            times--;
            if (times > 0) {
                repeatXTimes(times,func,ms,cb);
            }
            else {
                if (typeof cb === "function") cb();
            }
        }, ms);
    }



    // ============== Splash animations ==============
    
    // ENTRY POINT
    // triggerSpinning();
    finishSplashIntro();


    // Trigger spin
    function triggerSpinning(){
        $(window).scrollTop(0);
        disableScrolling();
        animationTrigger(".spin",0,"");
        let counter = $("#spinCounter");
        let num = parseInt(counter.data("start"));
        // default
        if (!num) num = 99;

        repeatXTimes(num,function(){
            counter.html(num--);
        }, 1000,spinningAfter);
        
    }
    
    //Spin callback
    function spinningAfter(){
        Animate_Reset(".spin",0,"");
        setTimeout(function(){
            $(".spin").addClass("animated fadeOut");
        },100);

        setTimeout(function(){
            $(".spin").removeClass("animated").addClass("d-none");
        },1000);
        
        setTimeout(function(){
            triggerSplashStart();
        },1100);

    }
    
    // Trigger lines animation start
    function triggerSplashStart(){
        let code = $(".splash__start-line");
        code.removeClass("invisible").addClass("splash--blinking");
    }
    // triggerSplashStart();
   

    // Blinking pink line and first code line
    $("#splash__blink").bind('onAnimationEnd animationend webkitAnimationEnd mozAnimationEnd', function(){
        let code = $(".splash__line1");
        if (!code.hasClass("animated")) {
            setTimeout(function(){
                code.addClass("animated");
                splashLine1Animation();
            },700);
        }
    })

    // Splash Line 1
    function splashLine1Animation(){
        let code = $(".splash__line1__command");
        if (!code.hasClass("typed")) {
            code.delay(1000)
                .addClass("typed splash__line--cursor splash__line--dolarsign")
                .typetype(code.data("text"),{e: 0.04, t: 30, callback: function(){
                    setTimeout(function(){
                        code.removeClass("splash__line--cursor");
                        splashSystecodeLine1();
                    }, 700);
                }});
        }
    }

    // Splash Systemcode 1
    function splashSystecodeLine1(){
        var code = $(".splash__systemcode1");
        var res = $(".splash__systemcode1_result");
        setTimeout(function(){ code.prepend(".")},300);
        setTimeout(function(){ code.prepend(".")},600);
        setTimeout(function(){ code.prepend(".")},1200);
        setTimeout(function(){ res.removeClass("invisible")},2000);
        setTimeout(function(){ splashLine2Animation(); },2500);
    }

    // Splash Line 2
    function splashLine2Animation(){
        let code = $(".splash__line2__command");
        if (!code.hasClass("typed")) {
            code.delay(1000)
                .addClass("typed splash__line--cursor splash__line--dolarsign")
                .typetype(code.data("text"),{e: 0.09, t: 100, callback: function(){
                    setTimeout(function(){
                        code.removeClass("splash__line--cursor");
                        splashSystecodeLine2();
                    }, 200);
                }});
        }
    }

    // Splash Systemcode 2
    function splashSystecodeLine2(){
        var code = $(".splash__systemcode2");
        var res = $(".splash__systemcode2_result");
        setTimeout(function(){ res.removeClass("invisible")},100);
        setTimeout(function(){ splashLine3Animation(); },500);
    }

    // Splash Line 3
    function splashLine3Animation(){
        let code = $(".splash__line3__command");
        if (!code.hasClass("typed")) {
            code.delay(1000)
                .addClass("typed splash__line--cursor splash__line--dolarsign")
                .typetype(code.data("text"),{e: 0, t: 100, callback: function(){
                    setTimeout(function(){
                        code.removeClass("splash__line--cursor");
                        splashSystecodeLine3();
                    }, 200);
                }});
        }
    }

    // Splash Systemcode 3
    function splashSystecodeLine3(){
        var code = $(".splash__systemcode3");
        var res = $(".splash__systemcode3_result");
        setTimeout(function(){ res.removeClass("invisible")},100);
        setTimeout(function(){ finishSplashIntro(); },2000);
    }

    // Finish splash intro and triggers home
    function finishSplashIntro(){
        enableScrolling();
        let vid = document.getElementById("homevideo");
        vid.play();
        let obj = $(".splash");
        let home = $(".home");
        //$(window).scrollTop(0);
        obj.addClass("animated fadeOut");
        setTimeout(function(){ obj.addClass("d-none"); },2000);
        animationTrigger(".home",1500);
    }

    $(".splash__skip").on("click", finishSplashIntro);

    // ============== Common ==============

    // ESC to skip
    $("body").keyup(function(e){
        if(e.which == 27){
            let obj = $(".splash");
            if (!obj.hasClass("animated")) 
            finishSplashIntro();
        }

    });    


    // ============== Gallery ==============
    baguetteBox.run(".bb-gallery", {
        // captions: function(element) {
        //     return element.getElementsByTagName('img')[0].alt;
        // }
        // fullScreen : true
        onChange: ()=>{
            $("#baguetteBox-overlay").scrollTop(0);   
        }

    });    


    // ============== Pop Gallery ==============
    $(".popgallery").click(function(e){
        let that = $(this);
        let modalTarget = $(that.data("target"));
        $("body").addClass("popgallery--body-shrink");
        modalTarget.removeClass("popgallery__modal--hide");
    });

    $(".popgallery__close_button").click(function(e){
        let par = $(this).parent().parent();
        console.log(par);
        par.addClass("popgallery__modal--hide");
    });

    let popOverlays = document.querySelector(".popgallery__wrapper");
    popOverlays.addEventListener("click",function(e){
        let obj = e.target;
        if (obj.className === "popgallery__close__button"){
            let par = obj.parentNode.parentNode;
            $("body").removeClass("popgallery--body-shrink");
            par.classList.add("popgallery__modal--hide");
        }

    });
    
    $(".baguetteBox-button").click(function(){
        if ($("body").hasClass("popgallery--body-shrink")){
            $("#baguetteBox-overlay").scrollTop(0);   
        }
        
    });
    

    // .addEventListener(function(e){
    //     console.log(e);
    // });

    // ============== Gallery ==============
    // baguetteBox.run(".bb-gallery", {
    // captions: function(element) {
    //     return element.getElementsByTagName('img')[0].alt;
    // }
    // });
  
});



