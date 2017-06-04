var url = "";
var currenthash = "";
var pageId = "";
var pageClass = "";
var routeUrl = "";
var ishandheld = false;
var homeslideshowswiper = null;

$(document).ready(function(){
    url = window.location.href;
    currenthash = window.location.hash.substr(1);
    pageId = $('body').attr('id');
    pageClass = $('body').attr('class');
    routeUrl = $('#routeUrl').val();
    ishandheld = isHandheld();

    if(pageClass === undefined){
        pageClass = "";
    }

    /****ON LOADS***/
    if (!window.location.origin) {
      window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }
    if(msieversion() != false){
        $('html').addClass('ie');
    }
    if(isIOS()){
        $('html').addClass('ios');
    }
    if(isIpad()){
        $('html').addClass('ipad-device');
    }
    if(isHandheld()){
        $('html').addClass('handheld');
    }


//    if(currenthash == "resetpassword"){
//        OpenPasswordReset(event);
//    }

    // Visibility animations
    $('.skills li').each(function(){
        if(isVisible(this)){
            $(this).addClass('visible');
        }
    });
    /***ON LOADS***/

    /************** Swiper functions ****************/

    if ($('.slideshow .swiper-slide').length > 1) {
        homeslideshowswiper = new Swiper('.slideshow', {
            speed: 800,
            slidesPerView: 1,
            loop:true,
            autoplay:10000,
            preload:true,
            direction: 'vertical',
            preventClicks:true,
            preventClicksPropagation:false,
            simulateTouch:false,
            onInit:function(swiper){
            },
            onSlideChangeStart: function (swiper) {
                swiper.startAutoplay();
            },
            onSlideChangeEnd: function (swiper) {
                swiper.startAutoplay();
            }
        });
    }
    /************ END Swiper functions **************/

    /************ Capture document click **************/
    $('html').click(function(e){
      $('.custom-dropdown').removeClass('open');
    });
    /********** END Capture document click ************/

    /***************** window resize *******************/
    $(window).resize(function(){

    });
    /*************** END window resize *****************/

    /*************** On Clicks *****************/
    $('.custom-dropdown .dropdown-content').click(function(e){
      e.stopPropagation();
    });
    /************* END On Clicks ***************/


    /************* On Hover ***************/
    /************* END On Hover ***************/


    /************** Mouse Move *****************/
    /************** Mouse Move *****************/

    /************* On Focus ***************/

    $(".searchbox input").focus(function() {
        $(this).parent().addClass('focused');
    });
    $(".searchbox input").focusout(function() {
        if($(this).val() === undefined || $(this).val() === ""){
            $(this).parent().removeClass('focused');
        }
    });
    //----ANIMATE LABEL----//
//    $("input.labelup, select.labelup, textarea.labelup").focus(function() {
//            $(this).parent().addClass('inputfilled');
//    });
//    $("input.labelup, select.labelup, textarea.labelup").focusout(function() {
//        value= $(this).val();
//        if(value == undefined || value == ""){
//            $(this).parent().removeClass('inputfilled');
//        }else{
//            $(this).parent().addClass('inputfilled');
//        }
//    });

    /************* END On Focus ***************/

    /************* On change ***************/
    /************* END On change ***************/


    /************* On Tap ***************/
    /************* END On Tap ***************/


    /************ Handle Keydown  *****************/
    $(document).keydown(function(e) {
        // ESCAPE
        if (e.keyCode == 27) {
        }
        //LEFT
        if (e.keyCode == 37) {
        }
        //RIGHT
        if (e.keyCode == 39) {
        }
        // ENTER
        if(e.which == 13) {
        }
    });

    $("input.numbersonly").keydown(function (event) {
        if (event.keyCode == 13 || event.keyCode == 9 || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) // 0-9 or numpad 0-9
       {
       }
       else if (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39) // not esc, del, left or right
       {
           event.preventDefault();
       }
    });
    /********** END Handle Keydown ***************/


    /************ Capture Scroll *****************/
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();


    });
    /********** END Capture Scroll ***************/


    /************ LOAD MAP *****************/

    /********** END LOAD MAP ***************/

});
function remove_filter_label(el){
  $(el).closest('.keyword-label').remove();
  if($('.labels-listing .keyword-label').length){
    $('.labels-listing').removeClass('no-filters');
  }else{
    $('.labels-listing').addClass('no-filters');
  }
}
function toggle_custom_dropdown(element, event){
    event.stopPropagation();
    if(!ishandheld && !$('html').hasClass('ie')){
        if($(element).hasClass('open')){
            $(element).removeClass('open');
        }else{
            $(".custom-dropdown").removeClass('open');
            $(element).addClass('open');
            $(element).find('li').not('.not-clickable').find('label').click(function(){
                var entryIndex = $(element).find('li').index($(this).parent());
                $(element).find('select option').eq(entryIndex).prop('selected', true);
                $(this).closest('ul').find('li').removeClass('active');
                $(this).closest('li').addClass('active');

            });
        }
    }
}
//******* DEFAULT FUNCTIONS *******//

function coming_soon_button(event, el){
    event.stopPropagation();
    $(el).addClass('show-message');
    setTimeout(function(){
        $(el).removeClass('show-message');
    }, 1500);
}
function AnimateToElement(id, offset, speed){
    var toPosition = $(id).offset().top + offset;
    $('html,body').animate({ scrollTop: toPosition }, speed);
}

function BackToTop(){
    $('html,body').animate({ scrollTop: 0 }, $(document).height() / 7);
}
function ToggleActive(id){
    if($(id).hasClass('active')){
        $(id).removeClass('active');
    }else{
        $(id).addClass('active');
    }
}
function ToggleOpen(id, event){
  if(event != undefined){
    event.stopPropagation();
  }
    if($(id).hasClass('open')){
        $(id).removeClass('open');
    }else{
        $(id).addClass('open');
    }
}
function ToggleCustomClass(id, customClass){
    if($(id).hasClass(customClass)){
        $(id).removeClass(customClass);
    }else{
        $(id).addClass(customClass);
    }
}
function ResetContainerInputs(id){
    $(id + " input").val('');
    $(id + " input:checkbox").removeAttr('checked');
    $(id + " input:radio").removeAttr('checked');
    $(id + " textarea").val('');
    $(id + " select").val('');
}

function isInteger(x) {
    return parseInt(x, 10) === x;
}

function isVisible(el){
    windowHeight = $(window).height();
    distanceFromTop = $(document).scrollTop();
    minVisibleArea = distanceFromTop;
    maxVisibleArea = distanceFromTop + windowHeight;

    elementTopPosition = $(el).offset().top;
    elementBottomPosition = elementTopPosition + $(el).height();

    if((elementTopPosition > minVisibleArea && elementTopPosition < maxVisibleArea) || (elementBottomPosition > minVisibleArea && elementBottomPosition < maxVisibleArea) || (elementTopPosition < minVisibleArea && elementBottomPosition > maxVisibleArea)){
        return true;
    }
    return false;
}
//******* DEFAULT FUNCTIONS *******//

/************ SOCIAL BUTTONS ***********/
function LoadSocialMedia() {
    if ($(".fb-like").length > 0)
    {
                if (typeof (FB) != 'undefined') {
                    FB.init({ status: true, cookie: true, xfbml: true });
                }
                else
                {
                    $.getScript("http://connect.facebook.net/en_US/all.js#xfbml=1", function (){
                      FB.init({ status: true, cookie: true, xfbml: true });
                    });
                }

    }
    $.getScript('http://platform.twitter.com/widgets.js');
    $(".twitter-share-button").show();
    // After the DOM has loaded...

    var gbuttons = $(".g-plusone");
    if (gbuttons.length > 0) {
        if (typeof (gapi) != 'undefined') {
        gbuttons.each(function () {
        gapi.plusone.render($(this).get(0));
        });
        }
        else
        {
        $.getScript('https://apis.google.com/js/plusone.js');
        }
    }
}
/************ SOCIAL BUTTONS ***********/
