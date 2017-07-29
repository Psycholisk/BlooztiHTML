var url = "";
var currenthash = "";
var pageId = "";
var pageClass = "";
var routeUrl = "";
var ishandheld = false;
// var homeslideshowswiper = null;
var slideshow_interval = null;
var slideshowObj = null;
var product_swiper = null;

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

    resize_images_by_ratio();
//    if(currenthash == "resetpassword"){
//        OpenPasswordReset(event);
//    }
    setTimeout(function(){
        /***** Open Popups ******/

        // if(currenthash.indexOf("vidId") > -1){
        //     OpenYoutubeVideo(currenthash.replace("vidId-", ""));
        // }
        if(currenthash.indexOf("productId") > -1){
            open_product_details(currenthash.replace("productId-", ""));
        }
        if(currenthash.indexOf("listing") > -1){
            open_listing_popup(currenthash.replace("listing-", ""));
        }
        /***** Open Popups ******/
    },500);
    // Visibility animations
    $('.skills li').each(function(){
        if(isVisible(this)){
            $(this).addClass('visible');
        }
    });
    /***ON LOADS***/

    /************** Swiper functions ****************/
    start_slideshow_animation('.slideshow-container', 10000);

    init_interest_swiper();
    /************ END Swiper functions **************/

    /************ Capture document click **************/
    $('html').click(function(e){
      $('.custom-dropdown').removeClass('open');
    });
    /********** END Capture document click ************/

    /***************** window resize *******************/
    $(window).resize(function(){
        resize_images_by_ratio();
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
//******* FUNCTIONS HERE *******//
function add_to_cart(){
    $('.notification-popup').addClass('checkout-notification').addClass('open');
    setTimeout(function(){
        $('.notification-popup').removeClass('open');
    }, 4000);
}
function start_slideshow_animation(container, delay){
    var slide_count = $(container + ' .slide').length;
    slideshowObj = {container:container, delay:delay};
    slideshow_interval = setInterval(function(){
        var current_slide_index = $(container + ' .slide.active').attr('data-slide-index');
        if(parseInt(current_slide_index) + 1 >= slide_count){
            $(container + ' .slide').removeClass('active');
            $(container + ' .slide[data-slide-index="0"]').addClass('active');
        }else{
            var current_element = $(container + ' .slide.active');
            current_element.removeClass('active');
            current_element.next().addClass('active');
        }
        current_slide_index = $(container + ' .slide.active').attr('data-slide-index');
        $('.slideshow-navigation li').removeClass('active');
        $('.slideshow-navigation li[data-nav-index="' + current_slide_index + '"]').addClass('active');
    },delay);
}
function slide_to_slideshow(el){
    var nextIndex = parseInt($(el).attr('data-nav-index'));
    if(slideshowObj != null && slideshowObj != undefined){
        clearInterval(slideshow_interval);
        $(slideshowObj.container + ' .slide').removeClass('active');
        $(slideshowObj.container + ' .slide[data-slide-index="' + nextIndex + '"]').addClass('active');
        $('.slideshow-navigation li').removeClass('active');
        $('.slideshow-navigation li[data-nav-index="' + nextIndex + '"]').addClass('active');
        start_slideshow_animation(slideshowObj.container, slideshowObj.delay);
    }
}
// REVICE CODE LATER--------
// function start_fade_animation(globalVar, container, initial_slide, delay){
//     var slide_count = $(container + ' .slide').length;
//
//     $(container + ' .slide').removeClass('active');
//     $(container + ' .slide').eq(initial_slide).addClass('active');
//     var interval = setInterval(function(){
//         var current_slide_index = $(container + ' .slide').index($(container + ' .slide.active'));
//         if(current_slide_index + 1 >= slide_count){
//             $(container + ' .slide.active').removeClass('active');
//             $('.album .album-slide').eq(0).addClass('active');
//         }else{
//             var current_element = $(container + ' .slide.active');
//             current_element.removeClass('active');
//             current_element.next().addClass('active');
//         }
//     },delay);
//
//     window[globalVar] = {interval : this.interval, container : this.container,initial_slide : this.initial_slide, delay : this.delay};
// }
// function fade_to_slide(globalVar, slideIndex){
//     window[globalVar].interval.clearInterval();
//     start_fade_animation(globalVar, window[globalVar].container, window[globalVar].initial_slide, window[globalVar].delay);
// }
// REVICE CODE LATER-------

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
    if(!$(element).hasClass('half-native') || (!ishandheld && !$('html').hasClass('ie'))){
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
/********** Swipers Functions ***********/
function initialize_product_swiper(){
    if ($('.product-swiper .swiper-slide').length > 1) {
        product_swiper = new Swiper('.product-swiper', {
            speed: 1000,
            slidesPerView: 1,
            preload:true,
            preventClicks:true,
            preventClicksPropagation:false,
            onInit: function(swiper){
               $('.product-swiper .left-arrow').click(function(){
                   swiper.slidePrev();
               });
               $('.product-swiper .right-arrow').click(function(){
                   swiper.slideNext();
               });
           },
           onSlideChangeStart: function(swiper){
               if(swiper.activeIndex >= $('.product-swiper .slide').length - 1){
                   $('.product-swiper .right-arrow').addClass('inactive');
               }else{
                   $('.product-swiper .right-arrow').removeClass('inactive');
               }
               if(swiper.activeIndex <= 0){
                   $('.product-swiper .left-arrow').addClass('inactive');
               }else{
                   $('.product-swiper .left-arrow').removeClass('inactive');
               }
           }
        });
    }
}

function initial_popup_listing_swiper(){
    if ($('.popup-listing-swiper .swiper-slide').length > 1) {
        popup_listing_swiper = new Swiper('.popup-listing-swiper', {
            speed: 1200,
            slidesPerView: 5,
            loopAdditionalSlides:-1,
            preload:true,
            spaceBetween: 20,
            resistanceRatio:0.01,
            breakpoints: {
                450: {
                    slidesPerView: 1
                },
                750: {
                    slidesPerView: 2
                },
                1055: {
                    slidesPerView: 3
                },
                1355: {
                    slidesPerView: 4
                }
           },
         //   simulateTouch:false,
            onInit:function(swiper){
               $('.listing-popup .left-arrow').click(function(){
                   swiper.slidePrev();
               });
               $('.listing-popup .right-arrow').click(function(){
                   swiper.slideNext();
               });
            },
            onSlideChangeStart: function (swiper) {
                if(swiper.isEnd){
                    $('.listing-popup .right-arrow').addClass('inactive');
                }else{
                    $('.listing-popup .right-arrow').removeClass('inactive');
                }
                if(swiper.isBeginning){
                    $('.listing-popup .left-arrow').addClass('inactive');
                }else{
                    $('.listing-popup .left-arrow').removeClass('inactive');
                }
            }
        });
    }
}
function init_interest_swiper(){
    if ($('.interest-swiper .swiper-slide').length > 1) {
        popup_listing_swiper = new Swiper('.interest-swiper', {
            speed: 1200,
            slidesPerView: 5,
            loopAdditionalSlides:-1,
            preload:true,
            spaceBetween: 20,
            resistanceRatio:0.01,
            breakpoints: {
                450: {
                    slidesPerView: 1
                },
                750: {
                    slidesPerView: 2
                },
                1055: {
                    slidesPerView: 3
                },
                1355: {
                    slidesPerView: 4
                }
           },
         //   simulateTouch:false,
            onInit:function(swiper){
               $('.cart-interest-list .left-arrow').click(function(){
                   swiper.slidePrev();
               });
               $('.cart-interest-list .right-arrow').click(function(){
                   swiper.slideNext();
               });
            },
            onSlideChangeStart: function (swiper) {
                if(swiper.isEnd){
                    $('.cart-interest-list .right-arrow').addClass('inactive');
                }else{
                    $('.cart-interest-list .right-arrow').removeClass('inactive');
                }
                if(swiper.isBeginning){
                    $('.cart-interest-list .left-arrow').addClass('inactive');
                }else{
                    $('.cart-interest-list .left-arrow').removeClass('inactive');
                }
            }
        });
    }
}
/********** End Swipers Functions ***********/
/********** Pop ups ***********/
function open_product_details(productId){
    if(productId != undefined && !isNaN(parseInt(productId))){

        $('.popup .popupcontainer').removeClass('open');

        $('#product-details-popup').addClass('open');
        history.pushState(null, null, window.location.pathname + document.location.search + '#productId-' + productId);
        initialize_product_swiper();
        OpenPopup();
    }
}
function open_listing_popup(listingType){
    if(listingType != undefined && listingType != ""){

        $('.popup .popupcontainer').removeClass('open');

        $('#listing-popup').addClass('open');
        history.pushState(null, null, window.location.pathname + document.location.search + '#listing-' + listingType);

        initial_popup_listing_swiper();
        resize_images_by_ratio();
        OpenPopup();
    }

}
// function OpenYoutubeVideo(url, autoplay){
//     autoplay = autoplay || false;
//     if(url != undefined && url != ""){
//         videoId = url;
//         if(url.indexOf("youtube.com") > -1 || url.indexOf("youtu.be") > -1){
//             videoId = extractVideoID(url);
//         }
//         $('.popup .popupcontainer').removeClass('open');
//         $('#video-iframe').attr('src', 'https://www.youtube.com/embed/' + videoId + (autoplay ? '?autoplay=1' : ''));
//         $('#youtubepopup').addClass('open');
//         history.pushState(null, null, window.location.pathname + document.location.search + '#vidId-' + videoId);
//
//         OpenPopup();
//     }
// }
/********** End Pop ups ***********/

//******* DEFAULT FUNCTIONS *******//
function resize_images_by_ratio(){
    $('.resize-inner-image').each(function(){
        if($(this).find('img').length == 1){
            $(this).find('img').removeClass('extra-width');
            $(this).find('img').removeClass('extra-height');
            perfectRatio = $(this).outerHeight(true) / $(this).outerWidth(true);
            originalImageRatio = $(this).find('img').outerHeight(true) / $(this).find('img').outerWidth(true);
            if(originalImageRatio < perfectRatio){ //extra width
                $(this).find('img').addClass('extra-width');
            }else{ //extra height
                $(this).find('img').addClass('extra-height');
            }
        }
    });
}
function resize_images_by_ratio_by_id(ratioContainer){
    $(ratioContainer).each(function(){
        if($(this).find('img').length == 1){
            $(this).find('img').removeClass('extra-width');
            $(this).find('img').removeClass('extra-height');
            perfectRatio = $(this).outerHeight(true) / $(this).outerWidth(true);
            originalImageRatio = $(this).find('img').outerHeight(true) / $(this).find('img').outerWidth(true);
            if(originalImageRatio < perfectRatio){ //extra width
                $(this).find('img').addClass('extra-width');
            }else{ //extra height
                $(this).find('img').addClass('extra-height');
            }
        }
    });
}
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
