var pageId = "";
var pageClass = "";
var routeUrl = "";
var url = "";
var currenthash = "";
var controllername = "";
var localisation = "en";
var actionname = "";
var ismobile = false;
var ishandheld = false;
var header_menu_dropdowns = [];
var fullwidth_gradient_swipers = [];
var tables_swipers = [];
var slideshow_swiper = null;
var home_services_swiper = null;
var insterest_swiper = null;
var home_footer_services_swiper = null;
var compare_cards_swiper = null;
var subsidiaries_swiper = null;
var properties_swiper = null;
var slideshow_video = null;
//var slideshow_video_interval = null;
var subpage_navigation_swiper = null;
var timeline_swiper = null;
var gallery_swiper = null;
var thumbs_swiper = null;
var charts_swiper = null;
var printwindow = null;
var milestones_description_swiper = null;
var temp_top = 0;
var header_menu_timeout;
var datepicker_width = 0;
var thumbs_swiper_breakpoint = 1083;
var ipad_size_breakpoint= 998;
var temp_scroll_pos = 0;
var loadingProperties = false;
var isFilteringCards = false;
var windowWidth = 0;
var isSingleVideoAutoplay = false;
//var temp_datepicker = null;


var vh_elements = [
  {
    selector: '.fixed-bar',
    vh: 100,
  }
];

//Constants
var FIX_HEADER_CONS = 300;


$(document).ready(function(){
    pageId = $('body').attr('id');
    pageClass = $('body').attr('class');
    routeUrl = $('#routeUrl').val();
    url = window.location.href;
    localisation = $('#langCode').val();
    currenthash = window.location.hash.substr(1);
    controllername = $('#controllername').val();
    actionname = $('#actionname').val();
    ismobile = ($(window).width() > 750 ? false : true);
    ishandheld = isHandheld();
    windowWidth = $(window).width();
  //  alert(1);
    thumbs_flag_horizontal = ($(window).width() > thumbs_swiper_breakpoint ? false : true);
    ipad_size_flag = ($(window).width() > ipad_size_breakpoint ? false : true);

    resize_images_by_ratio();

    if(pageClass == undefined){
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
    $('select').each(function(){
        DropdownPlaceholder(this);
    });
    setTimeout(function(){
        if(currenthash.indexOf("service-form-") > -1){
            var hash_form_id = currenthash.split('-')[2];
            $('.home-services .home-services-swiper .swiper-slide[attr-form-id=' + hash_form_id + ']').click();
        }
        if(currenthash.indexOf("page-pos-") > -1){
            var hash_section_id = currenthash.split('-')[2];
            animate_to('#section-' + hash_section_id);
        }
        if(currenthash == 'locate-us'){
            $('.home-services .home-services-swiper .swiper-slide[attr-form-id=' + currenthash + ']').click();
        }
        /***** Open Popups ******/

        if(currenthash.indexOf("vidId") > -1){
            OpenYoutubeVideo(currenthash.replace("vidId-", ""));
        }
        /***** Open Popups ******/
        if($('.corporate-accordian').length){
            CalibrateAccordian();
        }
    },500);

 //   var vhFix = new VHChromeFix(vh_elements);

    ConvertDateInputs();
    if(!ismobile){
        calc_footer();
    }

    show_hide_bar();
    fix_internal_header();

    if($('.video-chat').length){
        handle_video_chat_box();
    }

    if($('#slideshow-video').length){
        slideshow_video = document.getElementById("slideshow-video");
        slideshow_video.onpause = function() {
                slideshow_swiper.startAutoplay();
            if (slideshow_video.ended == true && isSingleVideoAutoplay) {
                setTimeout(function(){
                    slideshow_video.play();
                },300);
            }
            $('.slideshow-play-btn').removeClass('playing');
        };
        slideshow_video.onplay = function() {
            $('.slideshow-play-btn').addClass('playing');
            slideshow_swiper.stopAutoplay();
        };
    }

    if($('#compare-cards-container .slide').length){
        arrange_selected_cards();
    }
    if($('.fixed-bar').length){
        if(!$('.interest-section').length){
            $('.fixed-bar .similar-item').remove();
        }
    }
    //******** Animations set visible *******//

    //******** End Animations set visible *******//

    if(pageId == "home"){
        if($('.home-slideshow-container .album .album-slide').length > 1){
            start_album_animation(7000);
        }
    }
    if($('.properties-filtering-container').length){
        regulate_properties_page_heights();
    }
    if(!$('#financial-highlights-parent-container .downloadable-listing').length){
        $('#financial-highlights-parent-container .no-results-found').removeClass('hidden');
    }
    if(!$('#financial-result-parent-container .downloadable-listing').length){
        $('#financial-result-parent-container .no-results-found').removeClass('hidden');
    }
    /***END ON LOADS***/

    /************** Swiper functions ****************/
    initialize_milestones_content_swiper();
    if($('.slideshow-swiper .swiper-slide').length){
        var loop = true;
        if($('.slideshow-swiper .swiper-slide').length == 1){
            loop = false;
        }
        slideshow_swiper = new Swiper('.slideshow-swiper', {
            autoplay: 5000,
            speed: 1200,
            autoplayDisableOnInteraction: false,
//            spaceBetween: 30,
            simulateTouch : false,
            loop:loop,
            effect: 'fade',
            onInit: function(swiper){
                if(!loop){
                    var isVideo = $('.slideshow-swiper .swiper-slide-active').attr('data-slide-type');
                    var isAutoplay = 0;
                    if(isVideo != undefined && isVideo == "mp4"){
    //                    slideshow_video.load();
                        isAutoplay = $('.slideshow-swiper .swiper-slide-active').attr('data-autoplay');
                    }
                    if(isAutoplay == 1){
                        isSingleVideoAutoplay = true;
                        setTimeout(function(){
                            slideshow_video.play();
                        },500);
                    }
               //    isSingleVideoSlide = true;
               }
            },
            onSlideChangeStart: function(swiper){ //onSlideChangeStart

                var isVideo = $('.slideshow-swiper .swiper-slide-active').attr('data-slide-type');
                if(isVideo != undefined && isVideo == "mp4"){
                    slideshow_video.load();
                }
            },
            onSlideChangeEnd: function(swiper){ //onSlideChangeStart

                var isVideo = $('.slideshow-swiper .swiper-slide-active').attr('data-slide-type');
                var isAutoplay = 0;
                if(isVideo != undefined && isVideo == "mp4"){
//                    slideshow_video.load();
                    isAutoplay = $('.slideshow-swiper .swiper-slide-active').attr('data-autoplay');
                }
                if(isAutoplay == 1){
                    slideshow_video.play();
                }else{
                    swiper.startAutoplay();
                }
            }
        });
        $('.home-slideshow-container .right-arrow').click(function(){
            slideshow_swiper.slideNext();
        });
        $('.home-slideshow-container .left-arrow').click(function(){
            slideshow_swiper.slidePrev();
        });
    }
    $('.header-menu-dropdown .swiper-container').each(function(){
        if($(this).find('.swiper-slide').length > 1){
            var initial_slide = 0;
            if($(this).find('.slide.active').length){
                initial_slide = $(this).find('.slide').index($(this).find('.slide.active'));
            }
            var tempElement = this;
            var tempswiper = new Swiper(tempElement, {
                speed: 800,
                slidesPerView: 'auto',
                noSwipingClass: 'do_not_swipe',
                loop:false,
                initialSlide:initial_slide,
                preventClicks: false,
                preventClicksPropagation: true,
                breakpoints: {
                    750: {
                        slidesPerView: 3
                    },
                    950: {
                        slidesPerView: 4
                    },
                    1150: {
                        slidesPerView: 5
                    },
                    1350: {
                        slidesPerView: 6
                    },
                    1600: {
                        slidesPerView: 7
                    },
                    1800: {
                        freeMode : false,
                        slidesPerView: 8
                    }
               },
                onInit: function (swiper) {
                //    var wrapper_width = 0;
//                    $(tempElement).find('.swiper-slide').each(function(){
//                        wrapper_width += $(this).outerWidth(true) + 4;
//                    });

                 //   $(tempElement).find('.swiper-wrapper').css('width', wrapper_width);
                 //   console.log($(tempElement).find('.swiper-wrapper').outerWidth(true) + ' >= ' + $(tempElement).outerWidth(true));
                    if($(tempElement).find('.swiper-wrapper').outerWidth(true) >= $(tempElement).outerWidth(true)){
                        $(tempElement).find('.swiper-wrapper').removeClass('do_not_swipe');
                        $(tempElement).parent().find('.arrows').removeClass('hidden');
                    }else{
                        $(tempElement).find('.swiper-wrapper').addClass('do_not_swipe');
                        $(tempElement).parent().find('.arrows').addClass('hidden');
                    }
                     $(tempElement).parent().find('.left-arrow').click(function () {
                        tempswiper.slidePrev();
                    });
                    $(tempElement).parent().find('.right-arrow').click(function () {
                        tempswiper.slideNext();
                    });

                },
                onSlideChangeStart: function (swiper) {
                    swiper.startAutoplay();
                },
                onSlideChangeEnd: function (swiper) {
                    swiper.startAutoplay();
                }
            });
            header_menu_dropdowns.push(tempswiper);

        }
    });
    $('.fullwidth-gradient-swiper').each(function(){
        if($(this).find('.swiper-slide').length > 1){
            var tempElement = this;
            var tempswiper = new Swiper(tempElement, {
                speed: 800,
                slidesPerView: 4,
                noSwipingClass: 'do_not_swipe',
                loop:false,
                breakpoints: {
                    500: {
                        freeMode : false,
                        slidesPerView: 1
                    },
                    850: {
                        freeMode : false,
                        slidesPerView: 2
                    },
                    1110: {
                        freeMode : false,
                        slidesPerView: 3
                    }
              },
                onInit: function (swiper) {

                    check_fullwidth_gradient_swiper_wrapper();

                },
                onSlideChangeStart: function (swiper) {
                    swiper.startAutoplay();
                },
                onSlideChangeEnd: function (swiper) {
                    swiper.startAutoplay();
                }
            });
            fullwidth_gradient_swipers.push(tempswiper);
            $(this).parent().find('.left-arrow').click(function () {
                tempswiper.slidePrev();
            });
            $(this).parent().find('.right-arrow').click(function () {
                tempswiper.slideNext();
            });
        }
    });

     if ($('.home-services-swiper .swiper-slide').length > 1) {
        home_services_swiper = new Swiper('.home-services-swiper', {
            speed: 800,
            slidesPerView: 'auto',
            noSwipingClass: 'do_not_swipe',
            loop:false,
            preventClicks: false,
            freeMode : true,
            resistance:true,
            resistanceRatio:0.05,
            slidesOffsetAfter:30,
            preventClicksPropagation: true,
            onInit: function (swiper) {
                calc_home_services_wrapper();
            },
            breakpoints: {
                350: {
                    slidesPerView: 1
                },
                480: {
                    slidesPerView: 2
                },
                600: {
                    slidesPerView: 3
                },
                767: {
                    freeMode : false,
                    slidesPerView: 4,
                    slidesOffsetAfter:0
                }
          }
        });

        $('.home-services .left-arrow').click(function () {
            home_services_swiper.slidePrev();
        });
        $('.home-services .right-arrow').click(function () {
            home_services_swiper.slideNext();
        });
    }
     if ($('.footer-services .swiper-slide').length > 1) {
        home_footer_services_swiper = new Swiper('.footer-services .swiper-container', {
            speed: 800,
            slidesPerView: 7,
            noSwipingClass: 'do_not_swipe',
            loop:false,
            preventClicks: false,
          //  freeMode : true,
            resistance:true,
            resistanceRatio:0.05,
            preventClicksPropagation: true,
            breakpoints: {
                450: {
                    slidesPerView: 1
                },
                600: {
                    slidesPerView: 2
                },
                750: {
                    slidesPerView: 3
                },
                950: {
                    slidesPerView: 4
                },
                1100: {
                    slidesPerView: 5
                },
                1300: {
                    slidesPerView: 6
                }
          },
            onInit: function (swiper) {
                $('.footer-services .swiper-wrapper').addClass('do_not_swipe');
                $('.footer-services .arrows').addClass('hidden');
                if($(window).width() <= 1300){
                    $('.footer-services .swiper-wrapper').removeClass('do_not_swipe');
                    $('.footer-services .arrows').removeClass('hidden');
                }else{
                    $('.footer-services .swiper-wrapper').addClass('do_not_swipe');
                    $('.footer-services .arrows').addClass('hidden');
                }
            }
        });
        $('.footer-services .left-arrow').click(function () {
            home_footer_services_swiper.slidePrev();
        });
        $('.footer-services .right-arrow').click(function () {
            home_footer_services_swiper.slideNext();
        });

    }

//    if ($('.compared-cards-swiper .swiper-slide').length > 1) {
        compare_cards_swiper = new Swiper('.compared-cards-swiper', {
            speed: 800,
          //  width: 220,
            slidesPerView: 4,
            noSwipingClass: 'do_not_swipe',
            loop:false,
            spaceBetween:85,
            preventClicks: false,
            freeMode : true,
            resistance:true,
            observer:true,
            resistanceRatio:0.05,
            preventClicksPropagation: true,
            breakpoints: {
                580: {
                    slidesPerView: 1
                },
                767: {
                    slidesPerView: 2,
                    spaceBetween:20
                },
                950: {
                    slidesPerView: 1
                },
                1450: {
                    slidesPerView: 2,
                    spaceBetween:45
                },
                1650: {
                    slidesPerView: 3
                }
          },
            onInit:function (swiper){
                calc_compare_swiper();
                manage_compare_section();
            }
        });
        $('.compared-cards-container .left-arrow').click(function () {
            compare_cards_swiper.slidePrev();
        });
        $('.compared-cards-container .right-arrow').click(function () {
            compare_cards_swiper.slideNext();
        });
//    }
    if ($('.subsidiaries-swiper .swiper-slide').length > 1) {
        subsidiaries_swiper = new Swiper('.subsidiaries-swiper', {
            speed: 800,
            slidesPerView: 'auto',
            noSwipingClass: 'do_not_swipe',
            loop:false,
            freeMode : true,
            resistance:true,
            resistanceRatio:0.05
//            preventClicks: true,
//            preventClicksPropagation: true
        });
        $('.subsidiaries-swiper .swiper-slide').click(function(){
            var clickedElement = $(this);
            var clickedIndex = $('.subsidiaries-swiper .swiper-slide').index(clickedElement);
            subsidiaries_swiper.slideTo(clickedIndex);
            $('.subsidiaries-swiper .swiper-slide').removeClass('active');
            clickedElement.addClass('active');
            $('#subsidiary-content').addClass('fade-out');
            setTimeout(function(){
            //    console.log(clickedElement.find('.slide-content').html());
                $('#subsidiary-content').html(clickedElement.find('.slide-content').html());
                $('#subsidiary-content').removeClass('fade-out');
            },500);
        });
    }

    if ($('.subpage-navigation-swiper .swiper-slide').length > 1) {
        var initialSlide = $('.subpage-navigation-swiper .slide').index($('.subpage-navigation-swiper .active'));
        initialSlide = initialSlide != undefined ? initialSlide : 0;
        subpage_navigation_swiper = new Swiper('.subpage-navigation-swiper', {
            speed: 800,
            initialSlide:initialSlide,
            slidesPerView: 6,
            noSwipingClass: 'do_not_swipe',
            loop:false,
            preventClicks: false,
         //   freeMode : true,
            resistance:true,
            resistanceRatio:0.05,
            preventClicksPropagation: true,
            breakpoints: {
                900: {
                    slidesPerView: 2
                },
                1000: {
                    slidesPerView: 3
                },
                1200: {
                    slidesPerView: 4
                },
                1460: {
                    slidesPerView: 5
                }
          }
        });
    }
    if ($('.timeline-swiper .swiper-slide').length > 1) {
        timeline_swiper = new Swiper('.timeline-swiper', {
            speed: 800,
            slidesPerView: 'auto',
            noSwipingClass: 'do_not_swipe',
            loop:false,
            spaceBetween:80,
        //    centeredSlides:true,
        //    slidesOffsetBefore:-600,
         //   preventClicks: false,
        //    freeMode : true,
            resistance:true,
         //   slideToClickedSlide:true,
            resistanceRatio:0.4,
        //    preventClicksPropagation: true,
            onInit:function (swiper){
               // $('.timeline-swiper .swiper-wrapper').css('transform', 'translate3d(0px, 0px, 0px)');
                $('.timeline-swiper .swiper-slide').click(function(){
                    var clickedIndex = $('.timeline-swiper>.swiper-wrapper>.swiper-slide').index(this);
                    timeline_swiper.slideTo(clickedIndex);
                    $('.timeline-swiper>.swiper-wrapper>.swiper-slide').removeClass('swiper-slide-active');
                    $('.timeline-swiper>.swiper-wrapper>.swiper-slide').eq(clickedIndex).addClass('swiper-slide-active');
                    $('.timeline-container .floating-info-box').html($(this).find('.slide-content').html());
                    initialize_milestones_content_swiper();
                });
            },
            onSlideChangeStart: function (swiper) {
            },
            onSlideChangeEnd: function (swiper) {
                swiper.startAutoplay();
            }
        });
        $('.timline-navigation .left-arrow').click(function () {
            var currentSlideIndex = $('.timeline-swiper .swiper-slide').index($('.timeline-swiper .swiper-slide.swiper-slide-active'));
            if($('.timeline-swiper .swiper-slide.swiper-slide-active').prev().hasClass('swiper-slide-prev')){
                timeline_swiper.slidePrev();
            }else{
               if(currentSlideIndex > 0){
                    $('.timeline-swiper .swiper-slide').removeClass('swiper-slide-active');
                    $('.timeline-swiper .swiper-slide').eq(currentSlideIndex - 1).addClass('swiper-slide-active');
               }
            }
            $('.timeline-container .floating-info-box').html($('.timeline-swiper .swiper-slide.swiper-slide-active .slide-content').html());
            initialize_milestones_content_swiper();
        });
        $('.timline-navigation .right-arrow').click(function () {
            var currentSlideIndex = $('.timeline-swiper .swiper-slide').index($('.timeline-swiper .swiper-slide.swiper-slide-active'));
            if($('.timeline-swiper .swiper-slide.swiper-slide-active').next().hasClass('swiper-slide-next')){
                timeline_swiper.slideNext();
               if(timeline_swiper.previousIndex == timeline_swiper.activeIndex){
                   if($('.timline-navigation .swiper-slide').length - 1 > timeline_swiper.activeIndex){
                        $('.timeline-swiper .swiper-slide').removeClass('swiper-slide-active');
                        $('.timeline-swiper .swiper-slide').eq(currentSlideIndex + 1).addClass('swiper-slide-active');
                   }
               }
            }else{
               if($('.timline-navigation .swiper-slide').length - 1 > currentSlideIndex){
                    $('.timeline-swiper .swiper-slide').removeClass('swiper-slide-active');
                    $('.timeline-swiper .swiper-slide').eq(currentSlideIndex + 1).addClass('swiper-slide-active');
               }
            }
            $('.timeline-container .floating-info-box').html($('.timeline-swiper .swiper-slide.swiper-slide-active .slide-content').html());
            initialize_milestones_content_swiper();
        });
    }

     if ($('.properties-categories-swiper .swiper-slide').length > 1) {
        properties_swiper = new Swiper('.properties-categories-swiper', {
            speed: 800,
            slidesPerView: 8,
            noSwipingClass: 'do_not_swipe',
            loop:false,
            preventClicks: false,
         //   freeMode : true,
            resistance:true,
            resistanceRatio:0.05,
            preventClicksPropagation: true,
            breakpoints: {
                450: {
                    slidesPerView: 1
                },
                640: {
                    slidesPerView: 2
                },
                900: {
                    slidesPerView: 3
                },
                1150: {
                    slidesPerView: 4
                },
                1360: {
                    slidesPerView: 6
                }
            },
            onInit: function (swiper) {
                calc_properties_wrapper();
                $('.properties-categories-swiper .swiper-wrapper').addClass('inline-swiper');
            }
        });
        $('.properties-categories-container .left-arrow').click(function () {
            properties_swiper.slidePrev();
        });
        $('.properties-categories-container .right-arrow').click(function () {
            properties_swiper.slideNext();
        });

    }
     if ($('.gallery-swiper .swiper-slide').length > 1) {
        gallery_swiper = new Swiper('.gallery-swiper', {
            speed: 800,
            slidesPerView: 1,
            loop:false,
            resistanceRatio:0.5,
            onSlideChangeStart:function(){
                thumbs_swiper.slideTo(gallery_swiper.activeIndex);
                $('.thumbnails-container .swiper-slide').removeClass('active');
                $('.thumbnails-container .swiper-slide').eq(gallery_swiper.activeIndex).addClass('active');
            }
           // direction:'vertical'
        });

    }
    $('.table-gradient.table-responsive .swiper-container').each(function(){


        if($(this).find('.swiper-slide').length > 1){
            var tempElement = this;
            var tempswiper = new Swiper(tempElement, {
                speed: 800,
                slidesPerView: 1,
                noSwipingClass: 'do_not_swipe',
                loop:false,
                resistanceRatio:0.01,
                onSlideChangeStart: function (swiper) {
                    swiper.startAutoplay();
                },
                onSlideChangeEnd: function (swiper) {
                    swiper.startAutoplay();
                }
            });
            tables_swipers.push(tempswiper);
            $(this).parent().find('.left-arrow').click(function () {
                tempswiper.slidePrev();
            });
            $(this).parent().find('.right-arrow').click(function () {
                tempswiper.slideNext();
            });
        }
    });


    InitializeThumbsSwiper();


    if ($('.charts-swiper .swiper-slide').length) {
        var maxHeight = 0;
        $('.charts-swiper').each(function(){
            if($(this).outerHeight(true) > maxHeight){
                maxHeight = $(this).outerHeight(true);
            }
        });
        $('.charts-container').css('height', maxHeight);
         charts_swiper = new Swiper('.charts-swiper ', {
            slidesPerView: 'auto',
            resistanceRatio:0.01,
            freeMode:true
        });
    }

    /************ END Swiper functions **************/

    /************ Scroll bar Functions **************/
    if($(window).width() > 998){
        $(".left-navigation .nav-content").mCustomScrollbar({
            axis:"y", // horizontal scrollbar
            callbacks:{
                alwaysTriggerOffsets:false,
                onTotalScrollOffset:300,
                onTotalScroll:function(){
                    load_more_search(true);
                }
            }
        });
        $(".left-submenu .submenu-content").mCustomScrollbar({
            axis:"y" // horizontal scrollbar
        });
        $(".right-search .search-content").mCustomScrollbar({
            axis:"y", // horizontal scrollbar
            callbacks:{
                alwaysTriggerOffsets:false,
                onTotalScrollOffset:300,
                onTotalScroll:function(){
                    load_more_search();
                }
            }
        });
        $(".left-submenu .submenu-content .overflow-scroll").mCustomScrollbar({
            axis:"y" // horizontal scrollbar
        });
        $(".all-cards-dropdown").mCustomScrollbar({
            axis:"y" // horizontal scrollbar
        });

    }

//    $(".home-services .service-form .multi-step-form .form-step .service-apply-block").mCustomScrollbar({
//        axis:"y" // horizontal scrollbar
//    });
//    $(".home-services .service-form .multi-step-form .form-step .result-container").mCustomScrollbar({
//        axis:"y" // horizontal scrollbar
//    });
    /********** End Scroll bar Functions ************/

    /************ Autocomplete Functions **************/

    /********** End Autocomplete Functions ************/

    /************ Capture document click **************/
    $('html').click(function(e){
        $('.custom-dropdown').removeClass('open');

        close_all_cards_compare();
        $('.page-filter').removeClass('open');
//        alert($(window).height());
//        alert(window.innerHeight);
    });
    /********** END Capture document click ************/

    /******* orientation change *********/
    $( window ).on( "orientationchange", function( event ) {
        UNFIX_BODY();
        $('body').removeClass('fix-position');
        $('body').removeClass('overflow-element');
    });
    /********end orientation change ******/

    /***************** window resize *******************/
    $(window).resize(function(){
        if(windowWidth != $(window).width()){
            calc_home_services_wrapper();
            resize_images_by_ratio();
        }
        windowWidth = $(window).width();
     //   CalcHeader();

        /*** Swipers On resize ****/

        check_menu_dropdowns_wrapper();

        check_fullwidth_gradient_swiper_wrapper();


        calc_properties_wrapper();

      //  calc_home_footer_services_wrapper();

        calc_compare_swiper();

        show_hide_interest_swiper_arrows();


        /*** Swipers On resize ****/

         if($('.corporate-accordian').length){
            CalibrateAccordian();
        }

        if($('.properties-filtering-container').length){
            regulate_properties_page_heights();
        }

        if($(window).width() <= 1300){
            $('.footer-services .swiper-wrapper').removeClass('do_not_swipe');
            $('.footer-services .arrows').removeClass('hidden');
        }else{
            $('.footer-services .swiper-wrapper').addClass('do_not_swipe');
            $('.footer-services .arrows').addClass('hidden');
        }
        if($('.thumbnails-container').length){
            if(windowWidth > thumbs_swiper_breakpoint ){
                if(thumbs_flag_horizontal){
                    thumbs_flag_horizontal = false;
                    thumbs_swiper.destroy(false, true);
                    InitializeThumbsSwiper();
                }
                thumbs_flag_horizontal = false;
            }else{
                if(!thumbs_flag_horizontal){
                    thumbs_flag_horizontal = true;
                    thumbs_swiper.destroy(false, true);
                    InitializeThumbsSwiper();
                }
                thumbs_flag_horizontal = true;
            }
        }
        if(windowWidth > ipad_size_breakpoint ){
            if(ipad_size_flag){
                ipad_size_flag = false;
                close_left_menu();
                close_lowest_submenu();
            }
            ipad_size_flag = false;
        }else{
            if(!ipad_size_flag){
                ipad_size_flag = true;
                close_left_menu();
                close_lowest_submenu();
            }
            ipad_size_flag = true;
        }

        if(windowWidth > 750 ){
            if(ismobile){
                console.log("mobile -> desktop");
                close_left_menu();
                close_lowest_submenu();
                load_menu_search_links($('#desktop-menu-search').val());
            }
            ismobile = false;
        }else{
            if(!ismobile){
                console.log("desktop -> mobile");

                setTimeout(function(){
                    PositionPopup();
                },500);
                close_left_menu();
                close_lowest_submenu();
                load_menu_search_links($('#mobile-menu-search').val());

                $('header').addClass('notransitions');

                setTimeout(function(){
                    PositionPopup();
                },500);



            }
            ismobile = true;
        }

        if($('.video-chat').length){
            handle_video_chat_box();
        }
//        $('#ui-datepicker-div').hide();
//        if($('.input.dateinput:focus, .input.date-input:focus').length){
//            $('html').click();
//        }
        $('.input.dateinput, .input.date-input').datepicker('hide');
        if(!ismobile){
            calc_footer();
        }
        show_hide_bar();

        if($(window).width() > 998){
            $(".left-navigation .nav-content").mCustomScrollbar({
                axis:"y" // horizontal scrollbar
            });
            $(".left-submenu .submenu-content").mCustomScrollbar({
                axis:"y" // horizontal scrollbar
            });
            $(".left-submenu .submenu-content .overflow-scroll").mCustomScrollbar({
                axis:"y" // horizontal scrollbar
            });
        }else{
            $(".left-navigation .nav-content").mCustomScrollbar('destroy');
            $(".left-navigation .submenu-content").mCustomScrollbar('destroy');
            $(".left-submenu .submenu-content .overflow-scroll").mCustomScrollbar('destroy');
        }
        $('header').removeClass('notransitions');
       // ConvertDateInputs();

    });
    /*************** END window resize *****************/

    /*************** On Clicks **************/
    $('.left-navigation .nav-item').click(function(){
        if($(this).hasClass('active')){
            $('.left-navigation .nav-links .nav-item').removeClass('active');
            $('body').removeClass('faded-menu-items');
        }else{
            $('.left-navigation .nav-links .nav-item').removeClass('active');
            $(this).addClass('active');
            $('body').addClass('faded-menu-items');
        }
        var submenu_id = $(this).attr('attr-submenu-id');
        $('#submenu-mobile-parent-title').text($(this).text());
        open_left_submenu(submenu_id);
        calc_body_height();
    });
    $('.view-all-cards').click(function(e){
        e.stopPropagation();
    });
    $('.add-compare-column .add-compare').click(function(e){
        e.stopPropagation();
    });
    $('.input.dateinput, .input.date-input').click(function(){
       // console.log(1);
     //   temp_datepicker = this;
        var left_pos = $(this).offset().left;
        datepicker_width = $(this).outerWidth(true);
        if($(this).parent().hasClass('template1')){
            left_pos = $(this).parent().offset().left;
            datepicker_width = $(this).parent().outerWidth(true);
        }
        $('#ui-datepicker-div').css('left', left_pos);
        $('#ui-datepicker-div').css('width', datepicker_width);

        datepicker_arrows_events();
     //   temp_datepicker= null;
    });

    $('header, #container, footer').click(function(e){

        close_bar_items(e);
    });

    $('.page-filter').click(function(e){

       e.stopPropagation();
    });
    $('.properties-categories-swiper .slide').click(function(){
        if($(this).attr('data-cat-id') == 0){
            if(!$(this).hasClass('active')){
                $('.properties-categories-swiper .slide').removeClass('active');
                $(this).addClass('active');
                    search_properties(localisation);
//                if($('.properties-results-section').hasClass('open')){
//                }
            }
        }else{
            if($(this).hasClass('active')){
                $(this).removeClass('active');
            }else{
                $(this).addClass('active');
                $('.properties-categories-swiper .slide-all').removeClass('active');
            }
                search_properties(localisation);
//            if($('.properties-results-section').hasClass('open')){
//            }
        }
    });
    /************* END On Clicks ************/


    /************* On Hover *****************/
    if(!isHandheld()){
        $( ".header-menu-dropdown" ).hover(
              function() {
            //      alert('enter');
                $(this).prev().addClass('rolled');
              }, function() {
              //    alert('leave');
                $(this).prev().removeClass('rolled');
              }
        );
    }

//    $( "#hover-scroll-section" ).hover(
//          function() {
//              if($(document).scrollTop() < 200){
//                AnimateToElement($('body'), 200, 500);
//              }
//          }, function() {
//          }
//    );

//    $( "#hover-scroll-section" ).hover(
//          function() {
//        $('body').addClass('slideshow-margin');
//          }, function() {
//        $('body').removeClass('slideshow-margin');
//          }
//    );
//    $( "#hover-scroll-section")
//      .mouseover(function() {
//          //  skip_slideshow()
//        $('body').addClass('slideshow-margin');
//              //  AnimateToElement($('body'), 200, 500);
//      })
//      .mouseout(function() {
//        $('body').removeClass('slideshow-margin');
//      });
//    $( ".header-menu>li").hover(
//          function() {
//            clearTimeout(header_menu_timeout);
//            $(".header-menu").addClass('delayed');
//          }, function() {
//            header_menu_timeout = setTimeout(function(){
//                $(".header-menu").removeClass('delayed');
//            },500);
//          }
//    );
    /************* END On Hover *************/


    /************** Mouse Move **************/
    /************** Mouse Move **************/

    /************* On Focus *****************/
    /************* END On Focus *************/

    /************* On change ****************/

    $('.searchmenu .dateinput, .searchmenu select').change(function(){
        $('.searchmenu').click();
    });
    $('select').change(function(){
        DropdownPlaceholder(this);
    });
    $('input[type=checkbox][name=cards-filter]').change(function() {
        var parent_el = $(this).closest('.page-filter');
        var input_value = parent_el.find('input:checked').next().text();
        parent_el.find('.mobile-selected-value').text(input_value);
    });
    $('#loacte-us-region-picker').change(function() {
        change_locate_us_region($(this).val());
    });
    $('#financial-highlights-year-filter, #financial-highlights-type-filter').change(function() {
        change_highlights_year_and_types();
    });
    $('#financial-result-year-filter, #financial-result-type-filter').change(function() {
        change_financial_results_year_and_types();
    });
    $('#publication-newsletter-filter').change(function() {
        change_publication_newsletter_year();
    });
    $('#stock-exchange-year-filter').change(function() {
        change_stock_exchange_year();
    });
    $('#fact-sheets-filter').change(function() {
        fetch_fact_sheets_by_year();
    });
    $('input[name="cards-filter"]').change(function() {
        if($(this).val() == ""){
            $('input[name="cards-filter"]').not('#cards-all').prop("checked", false);
        }else{
            if($('input[name="cards-filter"]:checked').not('#cards-all').length){
                $('#cards-all').prop("checked", false);
            }else{
                $('#cards-all').prop("checked", true);
            }
        }
        fetch_cards_by_type();
       // console.log($('input[name="cards-filter"]:checked').val());
    });
    $('.all-cards-dropdown input').change(function() {
        if(!isFilteringCards){
            var card = $(this);
            var cardId = card.val();
            if(this.checked){
                $.ajax({
                    type: "POST",
                    url: routeUrl + localisation + "/Personal/GetCompareCard?id=" + cardId,
                    data: "",
                    success: function successFunc(data, status) {
                        $("#compare-cards-container").prepend(data);
                        $('.compared-cards-container').removeClass('loading');
                        compare_cards_swiper.update(false);
                        compare_cards_swiper.slideTo(0);
                        calc_compare_swiper();
                        check_compare_empty();
                        manage_compare_section();
                    },
                    error: function errorFunc(xhr, ajaxOptions, thrownError) {
                        card.prop('checked', false);
                        $('.compared-cards-container').removeClass('loading');
                        compare_cards_swiper.update(false);
                        calc_compare_swiper();
                        check_compare_empty();
                        manage_compare_section();
                    }

                });
            }else{
                $('.compared-cards-container .slide.slide-id-' + cardId).remove();
                compare_cards_swiper.update(false);
                calc_compare_swiper();
                check_compare_empty();
                manage_compare_section();

            }
        }
    });
    $('.compare-header-form select').change(function(){
        get_filtered_cards();
    });
    /************* END On change ************/


    /************* On Tap *******************/
    /************* END On Tap ***************/


    /*********** Handle Keydown  ************/
    $(document).keydown(function(e) {
        //ESCAPE
        if (e.keyCode == 27) {
            if($('body').hasClass('open-left-nav')){
                close_left_menu();
            }else{
                if($('body').hasClass('open-right-search')){
                    close_right_search();
                }else{
                    if($('body').hasClass('open-footer')){
                        open_sitemap();
                    }else{
                        if($('body').hasClass('open-service-form')){
                            close_service_form();
                        }else{
                            if($('body').hasClass('open-locate-us-form')){
                                close_locate_us_form();
                            }else{
                                //Properties page
                                if($('.properties-results-section').hasClass('open') && $('.properties-filtering-container').hasClass('open')){
                                    toggle_properties_filters();
                                }
                            }
                        }
                    }
                }
            }
            close_bar_items();
        }
        //left arrow
        if (e.keyCode == 37) {
        }
        //right arrow
        if (e.keyCode == 39) {
        }

        //Enter
        if(e.which == 13) {
        }
    });


    $("input.numbersonly").keydown(function (event) {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 9) // 0-9 or numpad 0-9
        {
        }
        else if (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39) // not esc, del, left or right
        {
            event.preventDefault();
        }
    });

    /********* END Handle Keydown **********/

    /*********** Handle Keydown  ************/
    $('#desktop-menu-search, #mobile-menu-search').keyup(function(e) {
      //  alert($(this).val());
        load_menu_search_links($(this).val());
    });
    $('#right-search-input').keyup(function(e) {
    //    alert($(this).val());
        load_search_links($(this).val());
    });
    /********* END Handle Keydown **********/

    /************ Capture Scroll *****************/
    $(window).scroll(function() {
        var lowerlimit = $(document).scrollTop() + $(window).height();
        if(!$('body').hasClass('open-left-nav') && !$('body').hasClass('open-right-search')){
            fix_header(FIX_HEADER_CONS);
        }
        show_hide_bar();
        fix_internal_header();

        if($('.video-chat').length){
            handle_video_chat_box();
        }
        if(!loadingProperties && $('.properties-results-section').hasClass('open')){

            if(($('.properties-results-section').offset().top +  $('.properties-results-section').height() - 50) < lowerlimit ){
                load_more_properties(localisation);
            }
        }

            //load_more_properties
        //********** animation set visible ********//
//        $(".ball").each(function (i, el) {
//            var el = $(el);
//            if (isVisible(el)) {
//                el.addClass("visible");
//            }
//        });
        //********** End animation set visible ********//



    });

    /********** END Capture Scroll ***************/


    /************ LOAD MAP *****************/

    /********** END LOAD MAP ***************/

//    PositionSubmenus();

});

//======== FUNCTIONS HERE =========//

function resize_images_by_ratio(){
    $('.text-image-template .template-image').each(function(){
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
function resize_images_by_ratio_by_id(ratioContainer, img){
    $(img).removeClass('extra-width');
    $(img).removeClass('extra-height');
    perfectRatio = $(ratioContainer).outerHeight(true) / $(ratioContainer).outerWidth(true);
    originalImageRatio = $(img).outerHeight(true) / $(img).outerWidth(true);
    if(originalImageRatio < perfectRatio){ //extra width
        $(img).addClass('extra-width');
    }else{ //extra height
        $(img).addClass('extra-height');
    }
}
function remove_compare_card(id){
    id = id || "";
    if(id != ""){
        $('#compare-card-' + id).prop('checked', false);
        $('.compared-cards-swiper .slide-id-' + id).remove();
        compare_cards_swiper.update(false);
        calc_compare_swiper();
        check_compare_empty();
        manage_compare_section();

    }
}
function submit_locateus_home(){
    var redirectUrl = $('#locate-us-home-form').attr('action');
    var branchType = $('#locateus-home-branchtype').val();
    var branchRegion = $('#locateus-home-branchRegion').val();

    if(branchType != undefined && branchType != ""){
        window.location.href = redirectUrl + "/" + branchType + (branchRegion != undefined && branchRegion != "" ? "?regionId=" + branchRegion : "");
    }
}
function check_compare_empty(){
    if($('.compared-cards-container .slide').length){
        $('.compared-cards-container').removeClass('no-cards');
    }else{
        $('.compared-cards-container').addClass('no-cards');
    }
}
function open_header_menu(el){
    if($(el).hasClass('rolled')){
        $('.header-menu li').removeClass('rolled');
        $('.home-slideshow-container').click();
    }else{
        $('.header-menu li').removeClass('rolled');
        $(el).addClass('rolled');
    }
}
function handle_video_chat_box(){
    if(ismobile || $(document).scrollTop() >= 50){
        $('body').addClass('online-video-chat');
    }
}
function regulate_properties_page_heights(){
    $('.properties-filtering-container').css('height', $('.properties-filtering-container .preserve-height').outerHeight(true));
    $('.properties-results-section').css('height', $('.properties-results-section .preserve-height').outerHeight(true));
}
function open_properties_results(closeFilters){
    closeFilters = closeFilters || false;
    regulate_properties_page_heights();
    $('.properties-results-section').addClass('open');
    if(closeFilters){
        $('.properties-filtering-container').removeClass('open');
        var pageoffset = -115;
        if($('body').hasClass('subpage-default-header') && !$('body').hasClass('has-bar')){
            pageoffset -= parseInt($('.main-header').outerHeight(true));
        }
       // console.log(pageoffset);
        AnimateToElement($('.properties-filtering-container'), pageoffset, 500);
    }
}
function toggle_properties_filters(){
    if($('.properties-filtering-container').hasClass('open')){
        $('.properties-filtering-container').removeClass('open');
    }else{
        regulate_properties_page_heights();
        $('.properties-filtering-container').addClass('open');
    }
}
function display_form_message(el){
    var parentElement = $(el).closest('.contact-form-section');
    if($(window).width() < 750){
        var container_height = parentElement.outerHeight(true);
        var window_height = $(window).height();
        var offset = 0;
        if(window_height < container_height){
            offset = (container_height - window_height) / 2;
        }
        AnimateToElement(parentElement, offset, 300);
        setTimeout(function(){
            parentElement.addClass('display-message');
            setTimeout(function (){
                parentElement.removeClass('display-message');
            }, 4000);
        }, 400);
    }else{
        parentElement.addClass('display-message');
        setTimeout(function (){
            parentElement.removeClass('display-message');
        }, 4000);
    }

}
function display_cards_form_message(el){
    var parentElement = $(el).closest('.card-application-container');
//    if($(window).width() < 750){
        var container_height = parentElement.outerHeight(true);
        var window_height = $(window).height();
        var offset = 0;
        if(window_height < container_height){
            offset = (container_height - window_height) / 2;
        }
        AnimateToElement(parentElement, offset, 300);
        setTimeout(function(){
            parentElement.addClass('display-message');
            setTimeout(function (){
                parentElement.removeClass('display-message');
            }, 4000);
        }, 400);
//    }else{
//        parentElement.addClass('display-message');
//        setTimeout(function (){
//            parentElement.removeClass('display-message');
//        }, 4000);
//    }

}
function show_redemption_points_result() {
    var isValid = true;

    if ($('#loyalty-points').val() == '') {
        $('#loyalty-points').parents('.inputfield').addClass('missing');
        isValid = false;
    }
    else if ($('#loyalty-points').val() < 2000) {
        //add required css and Points should be 2000 or greater
        $('#loyalty-points').parents('.inputfield').addClass('greatherThan');
        isValid = false;
    }
    else {
        $('#loyalty-points').parents('.inputfield').removeClass('greatherThan');
        $('#loyalty-points').parents('.inputfield').removeClass('missing');
    }
    if ($('#loyalty-reward').val() == '') {
        $('#loyalty-reward').parents('.inputfield').addClass('missing');
        isValid = false;
    }
    else {
        $('#loyalty-reward').parents('.inputfield').removeClass('missing');
    }

    if(isValid) {

        $('#loyalty-points').parents('.inputfield').removeClass('greatherThan');
        $('#loyalty-points').parents('.inputfield').removeClass('missing');
        $('#loyalty-reward').parents('.inputfield').removeClass('missing');

        var result = "";

        if ($('#loyalty-reward').val() == 1) {
            result = (parseInt($('#loyalty-points').val()) * 20 / 2000) + ' $';
        }
        else if ($('#loyalty-reward').val() == 2) {
            result = (parseInt($('#loyalty-points').val()) * 166 / 2000) + ' Min';
        }
        else if ($('#loyalty-reward').val() == 3) {
            result = (parseInt($('#loyalty-points').val()) * 666 / 2000) + ' Mb';
        }

        $('.redemption-intro .loyalty-points-result .nbOfPoints').html($('#loyalty-points').val());
        $('.redemption-intro .loyalty-points-result .value').html(result);

        $('#loyalty-points-result').removeClass('hidden');
        $('#loyalty-points-reset').removeClass('hidden');
        $('#loyalty-points-inputs').addClass('hidden');
        $('#loyalty-points-submit').addClass('hidden');
    }
}
function hide_redemption_points_result() {

    $('#loyalty-points').val('');
    $('#loyalty-reward').val('');

    $('#loyalty-points-result').addClass('hidden');
    $('#loyalty-points-reset').addClass('hidden');
    $('#loyalty-points-inputs').removeClass('hidden');
    $('#loyalty-points-submit').removeClass('hidden');
}
function datepicker_arrows_events(){
    $('.ui-datepicker .ui-datepicker-prev, .ui-datepicker .ui-datepicker-next').click(function(){
        $('#ui-datepicker-div').css('width', datepicker_width);
        datepicker_arrows_events();
    });
}
function open_all_cards_compare(){

    if(ishandheld && $('.view-all-cards').hasClass('open')){
        $('.view-all-cards').removeClass('open');
    }else{
        $('.view-all-cards').addClass('open');
    }
}
function close_all_cards_compare(){
    $('.view-all-cards').removeClass('open');
}
function show_hide_bar(){ //Fix bar
    var footer_position = $('#footer').offset().top ;
    var lower_limit = $(document).scrollTop() + $(window).height();
  //  console.log(lower_limit + " >= " + footer_position);
    if(lower_limit >= footer_position){
        $('body').addClass('hide-bar');
    }else{
        $('body').removeClass('hide-bar');
    }
}
function open_bar_item(el, event){
    event.stopPropagation();
    if($(el).hasClass('open')){
        $('.fixed-bar li.open').removeClass('open');
    }else{
        $('.fixed-bar li.open').removeClass('open');
        $(el).addClass('open');
    }
}
function close_bar_items(){
    $('.fixed-bar li.open').removeClass('open');
}
function open_fixed_bar(){
        $('.fixed-bar').css('height', $(window).height());
    if($(window).height() != window.innerHeight){
//        alert(window.innerHeight);
//        alert($(window).height());
        $('.fixed-bar').css('height', $(window).height());
       // $('.fixed-bar').css('height', $(window).height());
    }
    FIX_BODY();
    $('.fixed-bar').addClass('open');
}
function close_fixed_bar(event){
    event.stopPropagation();
    $('.fixed-bar').removeClass('open');
    setTimeout(function(){
        UNFIX_BODY();
    },1000);
}
function animate_to(id){
    //subpage-default-header fix-internal-header
    var offset = 0;
    if($('body').hasClass('subpage-default-header')){
        offset -= $('.main-header').outerHeight(true);
    }
    if($('body').hasClass('fix-internal-header')){
        offset -= $('.subpage-header').outerHeight(true);
    }
    AnimateToElement($(id), offset, 500);
}
//function FIX_BODY(){
////    if($('body').hasClass('header-fixed')){
////        $('body').addClass('header-fixed');
////    }
//    temp_top = parseInt($(document).scrollTop());
//    var bodyClasses = $('body').attr('class');
//    $('body').addClass('fix-position');
//    $('body').css('top', -temp_top + 'px');
//    var classes = bodyClasses.split(' ');
//    for(var i = 0; i < classes.length ; i++){
//        $('body').addClass(classes[i]);
//    }
//}
//function UNFIX_BODY(){
//    $('body').removeClass('fix-position');
//    $('body').css('top', 'auto');
//
//    $('html,body').animate({ scrollTop: temp_top }, 0);
//    temp_top = 0;
//}

function FIX_BODY() {
   //    if($('body').hasClass('header-fixed')){
   //        $('body').addClass('header-fixed');
   //    }
   temp_top = parseInt($(document).scrollTop());
   var bodyClasses = $('body').attr('class');
   $('body').addClass('fix-position');
//   $('.fix-position').bind('touchmove', function (e) {
//       e.preventDefault();
//       //CODE GOES HERE
//   });
   $('body').css('top', -temp_top + 'px');
   var classes = bodyClasses.split(' ');
   for (var i = 0; i < classes.length; i++) {
       $('body').addClass(classes[i]);
   }
}

function UNFIX_BODY() {

   $('body').removeClass('fix-position');
 //  $('.fix-position').unbind('touchmove');
   $('body').css('top', 'auto');

   $('html,body').animate({ scrollTop: temp_top }, 0);
   temp_top = 0;
}
function open_locate_map(){
    $('body').addClass('show-locate-map');
    var imagepath = $('#routeUrl').val() +  "Content/images/map-marker.png";
    var nearestPos = {lat: 33.893527, lng: 35.492819};
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('locate-map'), {
      zoom: 15,
      center: nearestPos,
      gestureHandling: 'cooperative',
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
        //alert('hi');

        //navigator.geolocation.getCurrentPosition(function (position) {
        //    pos = {
        //        lat: position.coords.latitude,
        //        lng: position.coords.longitude
        //    };

        //    alert(pos.lat);
        //    alert(pos.lng);
        //});

        try{
            navigator.geolocation.getCurrentPosition(function(position) {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                //alert(pos.lat);
                //alert(pos.lng);

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                infoWindow.open(map);
                map.setCenter(pos);


                //var polyline = new GPolyline([
                //      new GLatLng(nearestPos.lat, nearestPos.lng),
                //      new GLatLng(pos.lat, pos.lng)],
                //      "#ff0000", 10);
                //map.addOverlay(polyline);

                //var line = new google.maps.Polyline({
                //    path: [
                //        new google.maps.LatLng(nearestPos.lat, nearestPos.lng),
                //        new google.maps.LatLng(pos.lat, pos.lng)
                //    ],
                //    strokeColor: "#FF0000",
                //    strokeOpacity: 1.0,
                //    strokeWeight: 10,
                //    map: map
                //});

                //var geocoder;
                //var map;
                var directionsDisplay;
                var directionsService = new google.maps.DirectionsService();
                //var locations = [
                //  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
                //  ['Bondi Beach', -33.890542, 151.274856, 4],
                //  ['Coogee Beach', -33.923036, 151.259052, 5],
                //  ['Maroubra Beach', -33.950198, 151.259302, 1],
                //  ['Cronulla Beach', -34.028249, 151.157507, 3]
                //];


                directionsDisplay = new google.maps.DirectionsRenderer();
                directionsDisplay.setMap(map);
                //var infowindow = new google.maps.InfoWindow();

                //var marker, i;
                var request = {
                    travelMode: google.maps.TravelMode.DRIVING
                };


                //marker = new google.maps.Marker({
                //    position: new google.maps.LatLng(pos.lat, pos.lng),
                //});

                //google.maps.event.addListener(marker, 'click', (function (marker, i) {
                //    return function () {
                //        infowindow.setContent('Location Found.');
                //        infowindow.open(map, marker);
                //    }
                //})(marker, i));

                //if (i == 0) request.origin = marker.getPosition();
                //else if (i == locations.length - 1) request.destination = marker.getPosition();
                //else {
                //    if (!request.waypoints) request.waypoints = [];
                //    request.waypoints.push({
                //        location: marker.getPosition(),
                //        stopover: true
                //    });
                //}

                request.origin = nearestPos;
                request.destination = pos;


                directionsService.route(request, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(result);
                    }
                });

                //google.maps.event.addDomListener(window, "load", initialize);






            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            },
             {enableHighAccuracy: true});
        } catch (e) { alert(e); }
    } else {
      // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());

        alert("Browser doesn't support Geolocation");
    }
    var marker = new google.maps.Marker({
        position: nearestPos,
        map: map,
        icon: imagepath
    });

    AnimateToElement($(".locate-us-form"), 0, 500);
}
function animate_to_similar_products(event){
    close_fixed_bar(event);
    setTimeout(function(){
        AnimateToElement($(".interest-section"), 0, 1000);
    },1000);
}
function close_subpage_locate_map(){
    $('body').removeClass('show-locate-map');
}
function open_subpage_locate_map(){
    $('body').addClass('reduce-header-height');
    $('body').addClass('show-locate-map');
    var imagepath = $('#routeUrl').val() + "Content/images/map-marker.png";
    var nearestPos = { lat: 33.893527, lng: 35.492819 };
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('locate-map'), {
        zoom: 15,
        center: nearestPos,
        gestureHandling: 'cooperative',
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {

        try {
            navigator.geolocation.getCurrentPosition(function (position) {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                infoWindow.open(map);
                map.setCenter(pos);

                var directionsDisplay;
                var directionsService = new google.maps.DirectionsService();

                directionsDisplay = new google.maps.DirectionsRenderer();
                directionsDisplay.setMap(map);

                var request = {
                    travelMode: google.maps.TravelMode.DRIVING
                };

                request.origin = nearestPos;
                request.destination = pos;


                directionsService.route(request, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(result);
                    }
                });

            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            },
             { enableHighAccuracy: true });
        } catch (e) { alert(e); }
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());

        alert("Browser doesn't support Geolocation");
    }
    setTimeout(function(){
        if(ismobile){
            AnimateToElement($("#locate-map"), -190, 500);
        }else{
            AnimateToElement($(".locate-us-form .inputs"), -120, 500);
        }
    }, 100);
}
function display_graph(el, id){
    if(!$('#share-graph-' + id).hasClass("display-graph")){
        $('.charts-tabs-nav li').removeClass('active');
        $(el).addClass('active');
        $('.charts-swiper').removeClass('display-graph');
        $('#share-graph-' + id).addClass("display-graph")
    }

}
function hide_locate_map(){
    $('body').removeClass('show-locate-map');
}
//function load_search_links(keyword){
//    if(keyword != undefined && keyword != ""){
//        $('#right-search-container').html('');
//        var returnedHTML = "";
//        var resultcount = 0;
//        for(var i = 0; i < available_links.length; i++){
//            if(available_links[i].toLowerCase().indexOf(keyword.toLowerCase()) > -1){
//                if(available_links[i].toLowerCase() == "about us"){
//                    returnedHTML += "<li class=\"result-item\"><a title=\"About Us\" href=\"" + routeUrl + "GroupProfile/AboutUs/\" >" + available_links[i]; + "</a></li>";
//                }else{
//                    if(available_links[i].toLowerCase() == "newsroom"){
//                        returnedHTML += "<li class=\"result-item\"><a title=\"News Room\" href=\"" + routeUrl + "NewsRoom/\" >" + available_links[i]; + "</a></li>";
//                    }else{
//                        returnedHTML += "<li class=\"result-item\">" + available_links[i]; + "</li>";
//                    }
//                }
//                resultcount++;
//            }
//        }
//        $('#searchcount').html(resultcount);
//        $('#searchkeyword').html('"' + keyword + '"');
//        $('.search-content .result-count').removeClass('hidden');
//        $('#right-search-container').html(returnedHTML);
//    }else{
//        $('.search-content .result-count').addClass('hidden');
//        $('#right-search-container').html('');
//    }
//}
function load_search_links(keyword){
    if(keyword != undefined && keyword != ""){
        $.ajax({
            type: "POST",
            url: routeUrl + localisation + "/Shared/SearchWebsite?keyword=" + keyword + "&page=" + 0 + "&ismenu=false",
            data: "",
            success: function successFunc(data, status) {
                $('#right-search-container').html(data.result);
                $('#searchkeyword').html('"' + keyword + '"');
                $('#searchcount').html(data.count);
                $('.search-content .result-count').removeClass('hidden');
                $('#right-search-page-index').val(0);
                $('#right-search-max-page').val(data.maxpage);
            },
            error: function errorFunc(xhr, ajaxOptions, thrownError) {

            }

        });

    }else{
        $('.search-content .result-count').addClass('hidden');
        $('#right-search-container').html('');
    }
}
function load_menu_search_links(keyword){
    if(keyword != undefined && keyword != ""){
        keyword = keyword.toLowerCase();

       $.ajax({
            type: "POST",
            url: routeUrl + localisation + "/Shared/SearchWebsite?keyword=" + keyword + "&page=" + 0 + "&ismenu=true",
            data: "",
            success: function successFunc(data, status) {
                $('#search-links-container').html(data.result);
                $('.left-navigation').addClass("show-results");
                $('#left-search-page-index').val(0);
                $('#left-search-max-page').val(data.maxpage);
            },
            error: function errorFunc(xhr, ajaxOptions, thrownError) {
            }

        });
    }else{
        $('.left-navigation').removeClass("show-results");
    }
}
function load_more_search(ismenu){
    ismenu = ismenu || false;
    if(ismenu){
        var keyword = $("#mobile-menu-search").val();
        var pageindex = parseInt($("#left-search-page-index").val()) + 1;
        var maxpage = $("#left-search-max-page").val();
        if($(window).width() > 750){
            keyword = $("#desktop-menu-search").val();
        }
        if(keyword != undefined && keyword != "" && pageindex < maxpage){
            keyword = keyword.toLowerCase();
            $.ajax({
                type: "POST",
                url: routeUrl + localisation + "/Shared/SearchWebsite?keyword=" + keyword + "&page=" + pageindex + "&ismenu=true",
                data: "",
                success: function successFunc(data, status) {
                    $('#search-links-container').append(data.result);
                    $('.left-navigation').addClass("show-results");
                    $('#left-search-page-index').val(pageindex);
                },
                error: function errorFunc(xhr, ajaxOptions, thrownError) {
                }

            });
        }else{
            if(keyword === undefined || keyword === ""){
                $('.left-navigation').removeClass("show-results");
                $('#search-links-container').html('');
            }
        }
    }else{
        var keyword = $('#right-search-input').val();
        var pageindex = parseInt($("#right-search-page-index").val()) + 1;
        var maxpage = $("#right-search-max-page").val();
        if(keyword != undefined && keyword != "" && pageindex < maxpage){
            keyword = keyword.toLowerCase();
             $.ajax({
                type: "POST",
                url: routeUrl + localisation + "/Shared/SearchWebsite?keyword=" + keyword + "&page=" + pageindex + "&ismenu=false",
                data: "",
                success: function successFunc(data, status) {
                    $('#right-search-container').append(data.result);
                    $('#right-search-page-index').val(pageindex);
                },
                error: function errorFunc(xhr, ajaxOptions, thrownError) {

                }

            });
        }else{
            if(keyword === undefined || keyword === ""){
                $('.search-content .result-count').addClass('hidden');
                $('#right-search-container').html('');
            }
        }
    }

}

function play_pause_video(el){
     if (slideshow_video.paused == true) {
    // Play the video
    slideshow_video.play();

  //   $(el).addClass('playing');
    // Update the button text to 'Pause'
  //  playButton.innerHTML = "Pause";
  } else {
    // Pause the video
    slideshow_video.pause();

  //   $(el).removeClass('playing');
    // Update the button text to 'Play'
 //   playButton.innerHTML = "Play";
  }
}
function go_live_video_chat(){
    if($('body').hasClass('online-video-chat')){
        $('body').removeClass('online-video-chat');
    }else{
        $('body').addClass('online-video-chat')
    }
}
function calc_footer(){
    var full_height = parseInt($('#footer .main-footer').outerHeight(true)) + parseInt($('#footer .full-footer').outerHeight(true));
    $('#footer').css('height', full_height + 'px');
    $('#container').css('padding-bottom', full_height + 'px');
}
function open_sitemap(){
    if($('body').hasClass('open-footer')){
        $('body').removeClass('open-footer');
    }else{
        $('body').addClass('open-footer');
        setTimeout(function(){
            AnimateToElement($('#footer'), 0, 1000);
        },50);
    }
}
function service_form_message(serviceId){
    $('#service-form-' + serviceId).addClass('display-message');
    setTimeout(function(){
        close_service_form(serviceId);
    $('#service-form-' + serviceId).removeClass('display-message');
    },4000);
}
function show_other_input(el){
    $(el).closest('.form-step').addClass('show-other-input');
}
function hide_other_input(el){
    if($(el).parent().find('textarea').val() != "" && $(el).parent().find('textarea').val() != undefined){
        $(el).closest('.form-step').find('.slide.other').addClass('active');
    }else{
        $(el).closest('.form-step').find('.slide.other').removeClass('active');
    }
    $(el).closest('.form-step').removeClass('show-other-input');
}
function jump_to_step(el, id){
    var currentcontainer = $(el).closest('.service-form');
    var closescontainer = $(el).closest('.steps');
    var currentIndex = currentcontainer.find('.multi-step-form .form-step').index(currentcontainer.find('.multi-step-form .form-step.active')) + 1;
//    var currentIndex = closescontainer.find('.step').index(closescontainer.find('.active')) + 1;
    if(currentIndex < id){
        for(var i = currentIndex; i < id; i++){
            currentcontainer.find('.form-step-' + i + ' .next-step-init').click();
          //  console.log('.form-step-' + i);
            //console.log('.form-step-' + i + ' .next-step-init');
        }
    }else{
        currentcontainer.find('.form-step').removeClass('active');
        currentcontainer.find('.steps .step').removeClass('active');
        $(el).addClass('active');
        currentcontainer.find('.form-step-' + id).addClass('active');

        $('html,body').animate({ scrollTop: 0 }, 200);
    }

}
function go_to_services_form(serviceId, serviceFormId, serviceStepId){
    serviceId = serviceId || 1;
    serviceFormId = serviceFormId || 1;
    serviceStepId = serviceStepId || 1;
    if(!$('#service-form-' + serviceId).hasClass('active')){
        $('.home-services-forms .service-form').removeClass('active');
        $('#service-form-' + serviceId).addClass('active')
    }
    if(!$('#service-form-' + serviceId + ' .form-step-' + serviceFormId).hasClass('active')){
        $('#service-form-' + serviceId + ' .form-step').removeClass('active');
        $('#service-form-' + serviceId + ' .form-step-' + serviceFormId).addClass('active')
    }
    if(!$('#service-form-' + serviceId + ' .steps .step-' + serviceStepId).hasClass('active')){
        $('#service-form-' + serviceId + ' .steps .step').removeClass('active');
        $('#service-form-' + serviceId + ' .steps .step-' + serviceStepId).addClass('active')
    }
    if(serviceId == 1 && serviceFormId == 2 && serviceStepId == 2){
      //  console.log(1);
        init_interest_swiper_arrows();
    }

    $('html,body').animate({ scrollTop: 0 }, 300);
}
function validate_step_form(serviceId, formId, nextFormId, nextStepId){
    var isValid = true;
    //BECOME A CUSTOMER
    if(serviceId == 1){
        //Step 1
        if(formId == 1){
            if(isEmptyOrUndefined($('#customer-nationality').val())){ //Nationality
                isValid = false;
                $('#customer-nationality').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#customer-gender').val())){ //Gender
                isValid = false;
                $('#customer-gender').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#customer-age').val())){ //Age
                isValid = false;
                $('#customer-age').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#customer-country').val())){ //Country
                isValid = false;
                $('#customer-country').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#customer-occupation').val())){ //occupation
                isValid = false;
                $('#customer-occupation').closest('.inputfield').addClass('missing');
            }
            if(isValid){
                go_to_services_form(serviceId, nextFormId, nextStepId);
            }
        }
        if(formId == 2){
            if($('#become-a-customer-form .interest-swiper-container .slide.active').length || $('#customer-other-interest').val() != ""){
                go_to_services_form(serviceId, nextFormId, nextStepId);
            }
        }
        if(formId == 3){
            if(isEmptyOrUndefined($('#customer-phone').val())){ //phone
                isValid = false;
                $('#customer-phone').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#customer-phone').val()) || !(ValidateEmail($('#customer-email').val()))){ //email
                isValid = false;
                $('#customer-email').closest('.inputfield').addClass('missing');
            }
            if(isValid){
                 $('#become-a-customer-form .send-form').addClass('loading');

                var multiInterest = "";
                $("#become-a-customer-form .interest-swiper-container .slide.active").each(function(){
                    if(!$(this).hasClass('other')){
                        multiInterest += ',' + $(this).attr('data-interest-id');
                    }
                });
                $('#customer-MultiInterestIn').val(multiInterest.substr(1));
            //    console.log(multiInterest.substr(1));
                //Submit form
                var data = $("#become-a-customer-form").serialize();
                var submiturl = $("#become-a-customer-form").attr("action");
                $.ajax({
                    type: "POST",
                    url: submiturl,
                    data: data,
                    dataType: 'json',
                    success: function successFunc(data, status) {
                        if (data.message != "success") {

                        }
                        else {
                            service_form_message(1);
                            setTimeout(function(){
                                document.getElementById("become-a-customer-form").reset();
                                $('#become-a-customer-form .interest-swiper-container .slide').removeClass('active');
                            },400);
                           // alert(1);
                        }
                        $('#become-a-customer-form .send-form').removeClass('loading');
                    }
                });
            }
        }
    }

    //GET CASH
    if(serviceId == 4){
        if(formId == 1){

            $('#service-form-4 .steps .step-1').removeClass('cleared');
            $("#calculate-loan-form .missing").removeClass('missing');
            var isValid = true;
            if(isEmptyOrUndefined($('#cash-email').val()) || !(ValidateEmail($('#cash-email').val()))){
                isValid = false;
                $('#cash-email').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#cash-phone').val())){
                isValid = false;
                $('#cash-phone').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#cash-amount').val())){
                isValid = false;
                $('#cash-amount').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#cash-grace').val())){
                isValid = false;
                $('#cash-grace').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#cash-reason').val())){
                isValid = false;
                $('#cash-reason').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#cash-region').val())){
                isValid = false;
                $('#cash-region').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#cash-number-of-payment').val())){
                isValid = false;
                $('#cash-number-of-payment').closest('.inputfield').addClass('missing');
            }
            if(isValid){
                $('#personalLoanId').val('');
                $('#apply-form-submit').addClass('loading');
                var data = $("#calculate-loan-form").serialize();
                var submiturl = $("#calculate-loan-form").attr("action");

                $.ajax({
                    type: "POST",
                    url: submiturl,
                    data: data,
                    dataType: 'json',
                    success: function successFunc(data, status) {
                        //success
                        if (data.status != 200) {
                          //  alert(-1);
                            go_to_services_form(serviceId, nextFormId, nextStepId); // Remove later on
                            $('#personalLoanId').val(data.personalLoanId);
                        }
                        else {
                          //  service_form_message(4)
                            $('#monthly-payment-value').html(numberWithCommas(data.monthlyInstallment) + " USD");
                            $('#total-loan-amount-value').html(numberWithCommas(data.totalLoanAmount) + " USD");

                            $('#personalLoanId').val(data.personalLoanId);
//                            var printLink = $('#personal-loan-print-link').attr('href').split('?id=')[0];
//                            $('#personal-loan-print-link').attr('href', printLink + "?id=" + data.personalLoanId);
                          //  go_to_services_form(4, 2, 1);
                            go_to_services_form(serviceId, nextFormId, nextStepId);
                            setTimeout(function(){
                                document.getElementById("calculate-loan-form").reset();
                            },200);
                           // alert(1);
                        }
                        $('#apply-form-submit').removeClass('loading');
                        $('#service-form-4 .steps .step-1').addClass('cleared');
                    }
                });
            }else{
               // $('#service-form-4 .steps .step-1').removeClass('cleared');
            }

        }
        if(formId == 2){
            if($('#service-form-4 .steps .step-1').hasClass('cleared')){
                go_to_services_form(serviceId, nextFormId, nextStepId);
            }
        }
    }
    //CAR LOAN
    if(serviceId == 3){
        if(formId == 1){

            $('#service-form-3 .steps .step-1').removeClass('cleared');
            $("#calculate-car-loan-form .missing").removeClass('missing');
            var isValid = true;
            if(isEmptyOrUndefined($('#car-email').val()) || !(ValidateEmail($('#car-email').val()))){
                isValid = false;
                $('#car-email').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#car-region').val())){
                isValid = false;
                $('#car-region').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#car-phone').val())){
                isValid = false;
                $('#car-phone').closest('.inputfield').addClass('missing');
            }
            //if(isEmptyOrUndefined($('#car-amount').val())){
            //    isValid = false;
            //    $('#car-amount').closest('.inputfield').addClass('missing');
            //}
            if(isEmptyOrUndefined($('#car-loanAmount').val())){
                isValid = false;
                $('#car-loanAmount').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#car-downpayment').val())){
                isValid = false;
                $('#car-downpayment').closest('.inputfield').addClass('missing');
            }
            //if(isEmptyOrUndefined($('#car-value').val())){
            //    isValid = false;
            //    $('#car-value').closest('.inputfield').addClass('missing');
            //}
            if(isEmptyOrUndefined($('#car-currency').val())){
                isValid = false;
                $('#car-currency').closest('.inputfield').addClass('missing');
            }
            if(!$('#service-form-3 input[name="allRisk"]:checked').length){
                isValid = false;
                $('#service-form-3 input[name="allRisk"]').closest('.radiofield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#car-grace').val())){
                isValid = false;
                $('#car-grace').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#car-number-of-payment').val())){
                isValid = false;
                $('#car-number-of-payment').closest('.inputfield').addClass('missing');
            }
            if(isValid){
                $('#carLoanId').val('');
                $('#car-form-submit').addClass('loading');
                var data = $("#calculate-car-loan-form").serialize();
                var submiturl = $("#calculate-car-loan-form").attr("action");

                $.ajax({
                    type: "POST",
                    url: submiturl,
                    data: data,
                    dataType: 'json',
                    success: function successFunc(data, status) {
                        //success
                        if (data.status != 200) {
                          //  alert(-1);
                            go_to_services_form(serviceId, nextFormId, nextStepId); // Remove later on
                            $('#carLoanId').val(data.carLoanId);
                            $('#service-form-3 .inputfield').removeClass('display-error');
                        }
                        else {
                          //  service_form_message(4)
                            if(data.monthlyInstallment == 0){
                                $('#car-downpayment').closest('.inputfield').attr('data-validation-message', 'Minimum Down Payment: ' + data.minimumDownPayment.toString() + ' ' + data.currency);
                                $('#car-loanAmount').closest('.inputfield').attr('data-validation-message', 'Maximum Financing Percentage: ' + data.maximumFinancingPercentage.toString() + ' ' + data.currency);
                                $('#car-downpayment').closest('.inputfield').addClass('display-error');
                                $('#car-loanAmount').closest('.inputfield').addClass('display-error');
                            }else{
                                $('#car-monthly-payment-value').html(numberWithCommas(data.monthlyInstallment) + ' ' + data.currency);
                                $('#car-total-loan-amount-value').html(numberWithCommas(data.totalLoanAmount)  + ' ' + data.currency);
                                $('#service-form-3 .inputfield').removeClass('display-error');
                              //  $('#car-max-financing-perc-value').html(data.maximumFinancingPercentage + " USD");

                                $('#carLoanId').val(data.carLoanId);
                              //  go_to_services_form(4, 2, 1);
                                go_to_services_form(serviceId, nextFormId, nextStepId);
                                setTimeout(function(){
                                    document.getElementById("apply-form-submit").reset();
                                },200);
                            }
                           // alert(1);
                        }
                        $('#car-form-submit').removeClass('loading');
                        $('#service-form-3 .steps .step-1').addClass('cleared');
                    }
                });
            }else{
                $('#service-form-3 .inputfield').removeClass('display-error');
               // $('#service-form-4 .steps .step-1').removeClass('cleared');
            }

        }
        if(formId == 2){
            if($('#service-form-3 .steps .step-1').hasClass('cleared')){
                go_to_services_form(serviceId, nextFormId, nextStepId);
            }
        }
    }
    //BUSINESS LOAN
    if(serviceId == 6){
        if(formId == 1){

            $('#service-form-6 .steps .step-1').removeClass('cleared');
            $("#calculate-business-loan-form .missing").removeClass('missing');
            var isValid = true;
            if(isEmptyOrUndefined($('#business-email').val()) || !(ValidateEmail($('#business-email').val()))){
                isValid = false;
                $('#business-email').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#business-region').val())){
                isValid = false;
                $('#business-region').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#business-reason').val())){
                isValid = false;
                $('#business-reason').closest('.inputfield').addClass('missing');
            }
            //if(isEmptyOrUndefined($('#business-repayment').val())){
            //    isValid = false;
            //    $('#business-repayment').closest('.inputfield').addClass('missing');
            //}
            if(isEmptyOrUndefined($('#business-loanAmount').val())){
                isValid = false;
                $('#business-loanAmount').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#business-phone').val())){
                isValid = false;
                $('#business-phone').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#business-number-of-payment').val())){
                isValid = false;
                $('#business-number-of-payment').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#business-currency').val())){
                isValid = false;
                $('#business-currency').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#business-grace').val())){
                isValid = false;
                $('#business-grace').closest('.inputfield').addClass('missing');
            }
            //if(isEmptyOrUndefined($('#business-grace').val())){
            //    isValid = false;
            //    $('#business-grace').closest('.inputfield').addClass('missing');
            //}
            //if(isEmptyOrUndefined($('#business-monthly-payment').val())){
            //    isValid = false;
            //    $('#business-monthly-payment').closest('.inputfield').addClass('missing');
            //}
            //if(isEmptyOrUndefined($('#business-total-payment').val())){
            //    isValid = false;
            //    $('#business-total-payment').closest('.inputfield').addClass('missing');
            //}
            if(isValid){
                $('#businessLoanId').val('');
                $('#business-form-submit').addClass('loading');
                var data = $("#calculate-business-loan-form").serialize();
                var submiturl = $("#calculate-business-loan-form").attr("action");

                $.ajax({
                    type: "POST",
                    url: submiturl,
                    data: data,
                    dataType: 'json',
                    success: function successFunc(data, status) {
                        //success
                        if (data.status != 200) {
                          //  alert(-1);
                            go_to_services_form(serviceId, nextFormId, nextStepId); // Remove later on
                            $('#businessLoanId').val(data.businessLoanId);
                        }
                        else {
                          //  service_form_message(4)
                            $('#business-monthly-payment-value').html(numberWithCommas(data.monthlyInstallment) + " USD");
                            $('#business-total-loan-amount-value').html(numberWithCommas(data.totalLoanAmount) + " USD");
                            $('#businessLoanId').val(data.businessLoanId);
                          //  go_to_services_form(4, 2, 1);
                            go_to_services_form(serviceId, nextFormId, nextStepId);
                            setTimeout(function(){
                                document.getElementById("apply-form-submit").reset();
                            },200);
                           // alert(1);
                        }
                        $('#business-form-submit').removeClass('loading');
                        $('#service-form-6 .steps .step-1').addClass('cleared');
                    }
                });
            }else{
               // $('#service-form-4 .steps .step-1').removeClass('cleared');
            }

        }
        if(formId == 2){
            if($('#service-form-6 .steps .step-1').hasClass('cleared')){
                go_to_services_form(serviceId, nextFormId, nextStepId);
            }
        }
    }

    //HOUSE LOAN
    if(serviceId == 2){
        if(formId == 1){

            $('#service-form-2 .steps .step-1').removeClass('cleared');
            $("#calculate-house-loan-form .missing").removeClass('missing');
            var isValid = true;
            if(isEmptyOrUndefined($('#house-email').val()) || !(ValidateEmail($('#house-email').val()))){
                isValid = false;
                $('#house-email').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#house-region').val())){
                isValid = false;
                $('#house-region').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#house-phone').val())){
                isValid = false;
                $('#house-phone').closest('.inputfield').addClass('missing');
            }
            //if(isEmptyOrUndefined($('#car-amount').val())){
            //    isValid = false;
            //    $('#car-amount').closest('.inputfield').addClass('missing');
            //}
            if(isEmptyOrUndefined($('#house-loanAmount').val())){
                isValid = false;
                $('#house-loanAmount').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#house-downpayment').val())){
                isValid = false;
                $('#house-downpayment').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#house-value').val())){
                isValid = false;
                $('#house-value').closest('.inputfield').addClass('missing');
            }
            if(isEmptyOrUndefined($('#house-currency').val())){
                isValid = false;
                $('#house-currency').closest('.inputfield').addClass('missing');
            }
//            if(!$('#service-form-3 input[name="allRisk"]:checked').length){
//                isValid = false;
//                $('#service-form-3 input[name="allRisk"]').closest('.radiofield').addClass('missing');
//            }
            //if(isEmptyOrUndefined($('#car-grace').val())){
            //    isValid = false;
            //    $('#car-grace').closest('.inputfield').addClass('missing');
            //}
            if(isEmptyOrUndefined($('#house-number-of-payment').val())){
                isValid = false;
                $('#house-number-of-payment').closest('.inputfield').addClass('missing');
            }
            if(isValid){
                $('#houseLoanId').val('');
                $('#house-form-submit').addClass('loading');
                var data = $("#calculate-house-loan-form").serialize();
                var submiturl = $("#calculate-house-loan-form").attr("action");

                $.ajax({
                    type: "POST",
                    url: submiturl,
                    data: data,
                    dataType: 'json',
                    success: function successFunc(data, status) {
                        //success
                        if (data.status != 200) {
                          //  alert(-1);
                            go_to_services_form(serviceId, nextFormId, nextStepId); // Remove later on
                            $('#houseLoanId').val(data.personalLoanId);
                        }
                        else {
                          //  service_form_message(4)
                            $('#house-monthly-payment-value').html(numberWithCommas(data.monthlyInstallment) + " USD");
                            $('#house-total-loan-amount-value').html(numberWithCommas(data.totalLoanAmount) + " USD");
                            $('#houseLoanId').val(data.personalLoanId);
                          //  go_to_services_form(4, 2, 1);
                            go_to_services_form(serviceId, nextFormId, nextStepId);
                            setTimeout(function(){
                                document.getElementById("apply-form-submit").reset();
                            },200);
                           // alert(1);
                        }
                        $('#house-form-submit').removeClass('loading');
                        $('#service-form-2 .steps .step-1').addClass('cleared');
                    }
                });
            }else{
               // $('#service-form-4 .steps .step-1').removeClass('cleared');
            }

        }
        if(formId == 2){
            if($('#service-form-2 .steps .step-1').hasClass('cleared')){
                go_to_services_form(serviceId, nextFormId, nextStepId);
            }
        }
    }
}
function print_personal_loan(){
    printwindow = window.open(routeUrl + localisation + "/Print/PersonalLoan?id=" + $('#personalLoanId').val());
    printwindow.print();
}
function print_car_loan(){
    printwindow = window.open(routeUrl + localisation + "/Print/CarLoan?id=" + $('#carLoanId').val());
    printwindow.print();
}
function print_business_loan(){
    printwindow = window.open(routeUrl + localisation + "/Print/BusinessLoan?id=" + $('#businessLoanId').val());
    printwindow.print();
}
function print_house_loan(){
    printwindow = window.open(routeUrl + localisation + "/Print/HouseLoan?id=" + $('#houseLoanId').val());
    printwindow.print();
}


function download_personal_loan() {
    if(printwindow != null && printwindow != undefined){
        printwindow.close();
        setTimeout(function(){
            window.open(routeUrl + localisation + "/Print/ConvertPersonalLoanToPDF?id=" + $('#personalLoanId').val());
        },500);
    }else{
        window.open(routeUrl + localisation + "/Print/ConvertPersonalLoanToPDF?id=" + $('#personalLoanId').val());
    }
}
function download_car_loan() {
    if(printwindow != null && printwindow != undefined){
        printwindow.close();
        setTimeout(function(){
            window.open(routeUrl + localisation + "/Print/ConvertCarLoanToPDF?id=" + $('#carLoanId').val());
        },500);
    }else{
        window.open(routeUrl + localisation + "/Print/ConvertCarLoanToPDF?id=" + $('#carLoanId').val());
    }
}
function download_business_loan() {
    if(printwindow != null && printwindow != undefined){
        printwindow.close();
        setTimeout(function(){
            window.open(routeUrl + localisation + "/Print/ConvertBusinessLoanToPDF?id=" + $('#businessLoanId').val());
        },500);
    }else{
        window.open(routeUrl + localisation + "/Print/ConvertBusinessLoanToPDF?id=" + $('#businessLoanId').val());
    }
}
function download_house_loan() {
    if(printwindow != null && printwindow != undefined){
        printwindow.close();
        setTimeout(function(){
            window.open(routeUrl + localisation + "/Print/ConvertHouseLoanToPDF?id=" + $('#houseLoanId').val());
        },500);
    }else{
        window.open(routeUrl + localisation + "/Print/ConvertHouseLoanToPDF?id=" + $('#houseLoanId').val());
    }
}

function recalculate(serviceId){
    if(serviceId == 4){
        document.getElementById("calculate-loan-form").reset();
    }
    if(serviceId == 3){
        document.getElementById("calculate-car-loan-form").reset();
        $('#car-allrisk-true').val('true');
        $('#car-allrisk-false').val('false');
    }
    if(serviceId == 6){
        document.getElementById("calculate-business-loan-form").reset();
    }
    if(serviceId == 2){
        document.getElementById("calculate-house-loan-form").reset();
    }
    go_to_services_form(serviceId, 1, 1);
}

function open_locate_us_form(el){
    if(!$(el).hasClass('active')){
        hide_locate_map();
        $('.home-services-swiper .swiper-slide').removeClass('active');
     //   $('.home-slideshow-container').css('height', parseInt($('.home-services .locate-us-form').outerHeight(true)) - 167);
        $(el).addClass('active');
        $('body').removeClass('open-service-form');
        $('body').addClass('open-locate-us-form');
        AnimateToElement($('body'),0, 500);
        SetHash('locate-us');
    }
}
function open_service_form(el, formId){
    formId = formId || 1;
    if(!$(el).hasClass('active')){
        $('.home-services-swiper .swiper-slide').removeClass('active');
        $('body').removeClass('open-locate-us-form');
        $(el).addClass('active');
        $('body').addClass('open-service-form');
        setTimeout(function(){
            AnimateToElement($('.home-services-forms'), 0, 500);
        }, 100);

        if(!$('#service-form-' + formId).hasClass('active')){
            $('.home-services-forms .service-form').removeClass('active');
            ResetContainerInputs('#service-form-' + formId);
            if($('#service-form-' + formId + ' .multi-step-form').length){
                $('#service-form-' + formId + ' .form-step').removeClass('active');
                $('#service-form-' + formId + ' .steps .step').removeClass('active');
                $('#service-form-' + formId + ' .form-step-1').addClass('active');
                $('#service-form-' + formId + ' .steps .step-1').addClass('active');
            }
            $('#service-form-' + formId).addClass('active');

        }
        if($('#service-form-' + formId).hasClass('buy-a-house-form')){
            $(".home-services .service-form.buy-a-house-form .form-inputs").mCustomScrollbar({
                axis:"y" // horizontal scrollbar
            });
        }
        SetHash('service-form-' + formId);
    }
}
function toggle_checkboxes_dropdown(el){
    var parent_el = $(el).closest('.page-filter');
    if($(window).width() <= 750){
        if(parent_el.hasClass('open')){
            parent_el.removeClass('open');
        }else{
            parent_el.addClass('open');
        }
    }
}
function close_locate_us_form(){
    $('body').removeClass('open-locate-us-form');
    $('.home-services-swiper .swiper-slide').removeClass('active');
    RemoveHash();
}
function close_service_form(id){
    $('.home-services-swiper .swiper-slide').removeClass('active');
    $('body').removeClass('open-service-form');
    RemoveHash();
    if(!isEmptyOrUndefined(id)){
        go_to_services_form(id, 1, 1);
    }
}
function start_album_animation(delay){
    var slide_count = $('.album .album-slide').length;
    setInterval(function(){
        var current_slide_index = $('.album .album-slide').index($('.album .album-slide.active'));
        if(current_slide_index + 1 >= slide_count){
            $('.album .album-slide.active').removeClass('active');
            $('.album .album-slide').eq(0).addClass('active');
        }else{
            var current_element = $('.album .album-slide.active');
            current_element.removeClass('active');
            current_element.next().addClass('active');
        }
    },delay);
}
function calc_body_height(){
    var body_height = 0;
    if($('body').hasClass('open-lowest-level-menu')){
        body_height = $('.left-submenu .submenu-content .column .links-block .title.open+.submenu-mobile-container').outerHeight(true);
        body_height += $('.site-settings.inside').outerHeight(true);
    }else{
        if($('body').hasClass('open-left-submenu')){
            body_height = $('.left-submenu').outerHeight(true);
            body_height += $('.site-settings.inside').outerHeight(true);
        }else{
            if($('body').hasClass('open-left-nav')){
                body_height = $('.left-navigation').outerHeight(true);
            }
        }
    }
    if(body_height > 0){
     //   $('.left-navigation').css('height', body_height);
        body_height += $('.main-header').outerHeight(true);
        $('body').css('height', body_height);
    }
}
function toggle_burger_menu(){
    if($('body').hasClass('open-left-nav')){
        UNFIX_BODY();
        $('body').removeClass('open-left-nav');
        $('body').removeClass('open-left-submenu');
        setTimeout(function(){
            $('body').removeClass('overflow-element');
        },1000);
        if($(window).width() <= 998 && temp_scroll_pos > 0){
            setTimeout(function(){
                $('html,body').animate({ scrollTop: temp_scroll_pos }, 500);
            },700);
        }
    }else{
        if($(window).width() > 998){
            FIX_BODY();
        }else{
            temp_scroll_pos = $(document).scrollTop();
            AnimateToElement($('body'), 0, 0);
        }
        var left_nav_width = $('.left-navigation').outerWidth(true);
        var total = parseInt(left_nav_width);
        $('#container').css({
          '-webkit-transform' : 'translateX(' + total + 'px)',
          '-moz-transform'    : 'translateX(' + total + 'px)',
          '-ms-transform'     : 'translateX(' + total + 'px)',
          '-o-transform'      : 'translateX(' + total + 'px)',
          'transform'         : 'translateX(' + total + 'px)'
        });
        $('.main-header').css({
          '-webkit-transform' : 'translateX(' + total + 'px) translateY(0)',
          '-moz-transform'    : 'translateX(' + total + 'px) translateY(0)',
          '-ms-transform'     : 'translateX(' + total + 'px) translateY(0)',
          '-o-transform'      : 'translateX(' + total + 'px) translateY(0)',
          'transform'         : 'translateX(' + total + 'px) translateY(0)'
        });
        if($('body').hasClass('open-right-search')){
            $('body').removeClass('open-right-search');
            setTimeout(function(){
                $('body').addClass('open-left-nav');
            },1000);
        }else{
            $('body').addClass('open-left-nav');
         //   if(!ismobile){
                $('body').addClass('overflow-element');
        //    }
        }
        calc_body_height();
    }
}
function close_left_menu(){

    $('.left-navigation .nav-links .nav-item').removeClass('active');
    $('body').removeClass('faded-menu-items');
    UNFIX_BODY();
    $('body').removeClass('open-left-nav');
    $('body').removeClass('open-left-submenu');
    setTimeout(function(){
        $('body').removeClass('overflow-element');
    },1000);
 //   calc_body_height();
}
function open_right_search(){
    if($('body').hasClass('open-right-search')){
        UNFIX_BODY();
        $('body').removeClass('open-right-search');
        setTimeout(function(){
            $('body').removeClass('overflow-element');
        },1000);
    }else{
        FIX_BODY();
        if($('body').hasClass('open-left-nav')){
            close_left_menu();
            setTimeout(function(){
                $('body').addClass('open-right-search');
            $('body').addClass('overflow-element');
            },1000);
        }else{
            $('body').addClass('open-right-search');
            $('body').addClass('overflow-element');
        }
    }
}
function close_right_search(){
    UNFIX_BODY();
    $('body').removeClass('open-right-search');
    setTimeout(function(){
        $('body').removeClass('overflow-element');
    },1000);
}
function close_left_submenu(){
    $('.left-navigation .nav-links .nav-item').removeClass('active');
    $('body').removeClass('faded-menu-items');
    $('body').removeClass('open-left-submenu');
    calc_body_height();
}
function open_left_submenu(id){
    var left_nav_width = $('.left-navigation').outerWidth(true);
    var left_submenu_width = $('#left-submenu-' + id).outerWidth(true);
//    var left_submenu_width = $('.left-submenu').outerWidth(true);
    var total = parseInt(left_nav_width) + parseInt(left_submenu_width);
    if($('body').hasClass('open-left-submenu')){
        if($('body').hasClass('open-left-nav')){
           // console.log()
            $('#container').css({
              '-webkit-transform' : 'translateX(' + left_nav_width + 'px)',
              '-moz-transform'    : 'translateX(' + left_nav_width + 'px)',
              '-ms-transform'     : 'translateX(' + left_nav_width + 'px)',
              '-o-transform'      : 'translateX(' + left_nav_width + 'px)',
              'transform'         : 'translateX(' + left_nav_width + 'px)'
            });
            $('.main-header').css({
              '-webkit-transform' : 'translateX(' + left_nav_width + 'px) translateY(0)',
              '-moz-transform'    : 'translateX(' + left_nav_width + 'px) translateY(0)',
              '-ms-transform'     : 'translateX(' + left_nav_width + 'px) translateY(0)',
              '-o-transform'      : 'translateX(' + left_nav_width + 'px) translateY(0)',
              'transform'         : 'translateX(' + left_nav_width + 'px) translateY(0)'
            });
        }
        $('body').removeClass('open-left-submenu');
        if($('#left-submenu-' + id).hasClass('hidden')){
            setTimeout(function(){
                open_left_submenu(id);
            }, 1000);
        }
        //open_left_submenu(id);

    }else{
        if($('#left-submenu-' + id).length){
            $('.left-submenu .submenu-content').addClass('hidden');
            $('#left-submenu-' + id).removeClass('hidden');
            $('#container').css({
              '-webkit-transform' : 'translateX(' + total + 'px)',
              '-moz-transform'    : 'translateX(' + total + 'px)',
              '-ms-transform'     : 'translateX(' + total + 'px)',
              '-o-transform'      : 'translateX(' + total + 'px)',
              'transform'         : 'translateX(' + total + 'px)'
            });
            $('.main-header').css({
              '-webkit-transform' : 'translateX(' + total + 'px) translateY(0)',
              '-moz-transform'    : 'translateX(' + total + 'px) translateY(0)',
              '-ms-transform'     : 'translateX(' + total + 'px) translateY(0)',
              '-o-transform'      : 'translateX(' + total + 'px) translateY(0)',
              'transform'         : 'translateX(' + total + 'px) translateY(0)'
            });
            $('body').addClass('open-left-submenu');
        }
    }
}
function fix_internal_header(){
    if(pageClass.indexOf("fix-internal-header") > -1){
        var scrollTop = $(document).scrollTop();
        var scrolltoplimit =  $('.breadcrumbs-container').height();
        if(scrollTop >= scrolltoplimit){
            $('body').addClass('internal-header-fixed');
        }else{
            $('body').removeClass('internal-header-fixed');
        }
    }
       // console.log('reduce');
    if($('body').hasClass("subpage-small-header")){
        var scrollTop = $(document).scrollTop();
        var scrolltoplimit =  10;
        if(scrollTop >= scrolltoplimit){
            $('body').addClass('reduce-header-height');
        }else{
            $('body').removeClass('reduce-header-height');
        }
    }
}
function fix_header(scrolltoplimit){
    if(pageId == "home"){
        var scrollTop = $(document).scrollTop();
        if(scrollTop >= scrolltoplimit){
            $('body').addClass('header-fixed');
        }else{
            $('body').removeClass('header-fixed');
        }
    }
}
function toggle_custom_dropdown(event, element){
    event.stopPropagation();
    if(!ishandheld && !$('html').hasClass('ie')){
        if($(element).hasClass('open')){
            $(element).removeClass('open');
        }else{
            $(".custom-dropdown").removeClass('open');
            $(element).addClass('open');
            $(element).find('li').not('.not-clickable').click(function(){
                var entryIndex = $(element).find('li').index($(this));
                $(element).find('select option').eq(entryIndex).prop('selected', true);
                $(this).parent().find('li').removeClass('active');
                $(this).addClass('active');

            });
        }
    }
}

function toggle_type_dd(event, el){
    event.stopPropagation();
    ToggleOpen(el);
}
function close_lowest_submenu(){
    $('.left-submenu .submenu-content .links-block .title').removeClass('open');
    $('body').removeClass('open-lowest-level-menu');
    calc_body_height();
}
function skip_slideshow(){
    var slideshow_height = $('.home-slideshow-container').outerHeight(true);
    AnimateToElement($('.home-slideshow-container'), parseInt(slideshow_height) - 80, 1000);
}
// Change select box text styling based on option index - as placeholder
function DropdownPlaceholder(el){
    val = $(el).val();
    if(val != undefined && val != ""){
        if($(el).find('option').first().text() != val){
            $(el).addClass('noplaceholder');
        }else{
            $(el).removeClass('noplaceholder');
        }
    }else{
        $(el).removeClass('noplaceholder');
    }
}
function Toggle_lowest_submenu(el){
    ToggleOpen(el);
    if($('.submenu-content .links-block .title.open').length){
        $('body').addClass('open-lowest-level-menu');
    //    alert($(el).text());
        $(el).parent().find('.mobile-selected-submenu').text($(el).text());
    }else{
        $('body').removeClass('open-lowest-level-menu');
    }
    calc_body_height();
}

function CalibrateAccordian(){
    $('.corporate-accordian li.item.open').each(function(){
        $(this).next().css('height', $(this).next().find('.preserveheight').outerHeight(true));
    });
}
function ToggleAccordian(el){
    if(!$(el).hasClass('open')){
        $(el).parent().find('.item').removeClass('open');
        $(el).next().css('height', $(el).next().find('.preserveheight').outerHeight(true));
        $(el).addClass('open');
        setTimeout(function(){
           if(ismobile){
               var headeroffset = -120;
               if(!$('body').hasClass('has-bar')){
                   if($('body').hasClass('fix-internal-header')){
                        headeroffset -= parseInt($('.main-header').outerHeight(true));
                   }
               }
               AnimateToElement(el, headeroffset, 500);
            }
        },600);
    }else{
        $(el).removeClass('open');
    }
}

function manage_compare_section(){
    /*** Equalizing all text blocks ***/
    var features_height = 0;
    var rewards_height = 0;
    $('.compare-section .compared-cards-swiper .slide').each(function(){
        $(this).find('.features-text').addClass('auto-height');
        $(this).find('.rewards-text').addClass('auto-height');
        if($(this).find('.features-text').height() > features_height){
            features_height = $(this).find('.features-text').height();
        }
        if($(this).find('.rewards-text').height() > rewards_height){
            rewards_height = $(this).find('.rewards-text').height();
        }
        $(this).find('.features-text').removeClass('auto-height');
        $(this).find('.rewards-text').removeClass('auto-height');
    });
    $('.compared-cards-swiper .features-text').css('height', features_height);
    $('.compared-cards-swiper .rewards-text').css('height', rewards_height);

    /*** Position labels accordingly ***/
    $('.specs-panel .features').css('height', features_height);
    $('.specs-panel .rewards').css('height', rewards_height);
}

/********** Swiper function ********/
function initialize_milestones_content_swiper(){
    if ($('.floating-info-box .swiper-slide').length) {
        milestones_description_swiper = new Swiper('.floating-info-box .milestones-description-swiper', {
            speed: 800,
            autoplay:5000,
            effect:'fade',
            slidesPerView: 1,
        //    loopAdditionalSlides:-1,
            loop:true,
            resistanceRatio:0.3,
            onSlideChangeStart:function(swiper){
                index = $('.floating-info-box .content .swiper-slide-active').attr('data-slide-index');
                $('.floating-info-box .frame').removeClass('active');
                $('.floating-info-box .frame[data-slide-index="' + index + '"]').addClass('active');
                swiper.startAutoplay();
            },
            onSlideChangeEnd:function(swiper){
                swiper.startAutoplay();
            }
        });
        $('.floating-info-box .left-arrow').click(function(){
            milestones_description_swiper.slidePrev();
        });
        $('.floating-info-box .right-arrow').click(function(){
            milestones_description_swiper.slideNext();
        });
    }
}
function InitializeThumbsSwiper(){
    if ($('.thumbnails-container .swiper-slide').length > 1) {
         var thumbs_direction = thumbs_flag_horizontal ? 'horizontal' : 'vertical';
        thumbs_swiper = new Swiper('.thumbnails-container', {
            speed: 800,
            slidesPerView: 'auto',
            loop:false,
            resistanceRatio:0.3,
            direction:thumbs_direction,
            slideToClickedSlide: true
        });
        $('.thumbnails-container .swiper-slide').click(function(){
            var clickedIndex = $('.thumbnails-container .swiper-slide').index($(this));
            gallery_swiper.slideTo(clickedIndex);
        });
    }
}
function check_fullwidth_gradient_swiper_wrapper(){
    $('.fullwidth-gradient-swiper').each(function(){

        var tempElement = this;
        var temp_width = 0;
        $(tempElement).find('.swiper-slide').each(function(){
            temp_width += $(this).outerWidth(true);
        });
        if(temp_width > $(tempElement).width()){
            $(tempElement).find('.swiper-wrapper').removeClass('do_not_swipe');
            $(tempElement).parent().find('.arrows').removeClass('hidden');
        }else{
            $(tempElement).find('.swiper-wrapper').addClass('do_not_swipe');
            $(tempElement).parent().find('.arrows').addClass('hidden');
        }

    });
}
function check_menu_dropdowns_wrapper(){
    $('.header-menu-dropdown .swiper-container').each(function(){
        if($(this).find('.swiper-wrapper').outerWidth(true) >= $(this).outerWidth(true)){
            $(this).find('.swiper-wrapper').removeClass('do_not_swipe');
            $(this).parent().find('.arrows').removeClass('hidden');
        }else{
            $(this).find('.swiper-wrapper').addClass('do_not_swipe');
            $(this).parent().find('.arrows').addClass('hidden');
        }
    });
}
function calc_home_services_wrapper(){
    $('.home-services-swiper .swiper-wrapper').addClass('extra-width');
    setTimeout(function(){
        var wrapper_width = 0;
        $('.home-services-swiper .swiper-slide').each(function(){
            wrapper_width += $(this).outerWidth(true) + 4;
        });
        $('.home-services-swiper .swiper-wrapper').removeClass('extra-width');
        $('.home-services-swiper .swiper-wrapper').css('width',wrapper_width);

        if(wrapper_width > $('.home-services-swiper').width()){
            $('.home-services-swiper .swiper-wrapper').removeClass('do_not_swipe');
            $('.home-services .arrows').removeClass('hidden');
        }else{
            $('.home-services-swiper .swiper-wrapper').addClass('do_not_swipe');
            $('.home-services .arrows').addClass('hidden');
        }
        if(home_services_swiper != null && home_services_swiper != undefined){
            home_services_swiper.update(true);
        }
    },1000);



}

//function test_home_services_width(){
//    $('.home-services-swiper .swiper-slide').each(function(){
//        console.log($(this).outerWidth(true));
//    });
//}
function calc_properties_wrapper(){
    var wrapper_width = 0;
    $('.properties-categories-swiper .swiper-slide').each(function(){
        wrapper_width += $(this).outerWidth(true) + 4;
    });
    $('.properties-categories-swiper .swiper-wrapper').css('width',wrapper_width);

    if(wrapper_width > $('.properties-categories-swiper').width()){
        $('.properties-categories-swiper .swiper-wrapper').removeClass('do_not_swipe');
        $('.properties-categories-container .arrows').removeClass('hidden');
    }else{
        $('.properties-categories-swiper .swiper-wrapper').addClass('do_not_swipe');
        $('.properties-categories-container .arrows').addClass('hidden');
    }
}
//function calc_home_footer_services_wrapper(){
////    var wrapper_width = 0;
////    $('.footer-services .swiper-slide').each(function(){
////        wrapper_width += $(this).outerWidth(true) + 4;
////    });
////    $('.footer-services .swiper-wrapper').css('width',wrapper_width);
//
//    if($('.footer-services .swiper-wrapper').outerWidth(true) > $('.footer-services .swiper-container').width()){
//        $('.footer-services .swiper-wrapper').removeClass('do_not_swipe');
//        $('.footer-services .arrows').removeClass('hidden');
//    }else{
//        $('.footer-services .swiper-wrapper').addClass('do_not_swipe');
//        $('.footer-services .arrows').addClass('hidden');
//    }
//}
function calc_compare_swiper(){
    var temp_width = 0;
    $('.compared-cards-swiper .swiper-slide').each(function(){
        temp_width += $(this).outerWidth(true);
    });

    if(temp_width > $('.compared-cards-swiper').width()){
        $('.compared-cards-container .swiper-wrapper').removeClass('do_not_swipe');
        $('.compared-cards-container .arrows').removeClass('hidden');
    }else{
        $('.compared-cards-container .swiper-wrapper').addClass('do_not_swipe');
        $('.compared-cards-container .arrows').addClass('hidden');
    }
}
function show_hide_interest_swiper_arrows(){
    var temp_width = 0;
    $('.interest-swiper-container .swiper-slide').each(function(){
        temp_width += $(this).outerWidth(true);
    });

    if(temp_width > $('.interest-swiper-container .swiper-container').width()){
        $('.interest-swiper-container .arrows').removeClass('hidden');
    }else{
        $('.interest-swiper-container .arrows').addClass('hidden');
    }
}
function init_interest_swiper_arrows(){
if ($('.interest-swiper-container .swiper-slide').length > 1) {
        insterest_swiper = new Swiper('.interest-swiper-container .swiper-container', {
            speed: 800,
            slidesPerView: 'auto',
            noSwipingClass: 'do_not_swipe',
            loop:false,
            preventClicks: false,
            freeMode : true,
            resistance:true,
            resistanceRatio:0.05,
            preventClicksPropagation: true,
            onInit: function (swiper) {
                show_hide_interest_swiper_arrows();
            }
        });
        $('.interest-swiper-container .left-arrow').click(function () {
            insterest_swiper.slidePrev();
        });
        $('.interest-swiper-container .right-arrow').click(function () {
            insterest_swiper.slideNext();
        });
        insterest_swiper.init();
    }
}

/********** Pop ups ***********/
function OpenYoutubeVideo(url, autoplay){
    autoplay = autoplay || false;
    if(url != undefined && url != ""){
        videoId = url;
        if(url.indexOf("youtube.com") > -1 || url.indexOf("youtu.be") > -1){
            videoId = extractVideoID(url);
        }
        $('.popup .popupcontainer').removeClass('open');
        $('#video-iframe').attr('src', 'https://www.youtube.com/embed/' + videoId + (autoplay ? '?autoplay=1' : ''));
        $('#youtubepopup').addClass('open');
        history.pushState(null, null, window.location.pathname + document.location.search + '#vidId-' + videoId);

        OpenPopup();
    }
}
function OpenPopup(){
    screen_position = $(document).scrollTop();
    screenbottom = $(document).scrollTop() + $(window).height();
    popup_position = screen_position;

    if($('.popup').hasClass('open')){
        popupCurrentPosition = $('.popup').offset().top;
        if(popup_position > popupCurrentPosition - 20){
            $('html,body').animate({ scrollTop: popupCurrentPosition - 80 }, 300);
        }
    }else{
        popup_height = $('.popupcontainer.open').outerHeight(true);
        wrapper_height = $('#wrapper').height();
        if(popup_height >= wrapper_height - 40){
            $('#wrapper').css('padding-bottom', (popup_height + 40 - wrapper_height));
            $('#wrapper').addClass('padded');

            $('html,body').animate({ scrollTop: 0 }, 300);
            $('.popup').css('top', 20);

        }else{

            popup_position += ($(window).height() / 2);
            popup_position -= (popup_height / 2);

            if($(window).width() > 750){
                if(screen_position - popup_position > - 50){
                    popup_position = screen_position + 50;
                }
            }else{
                if(screen_position - popup_position > - 100){
                    popup_position = screen_position + 100;
                }
            }
            total_height = popup_height + popup_position;


             if (total_height >= wrapper_height) {
                popup_position = wrapper_height - popup_height - 70;
            }

            if(popup_position < screen_position - 20){
                $('html,body').animate({ scrollTop: popup_position - 20 }, 300);
            }

            if($('body').hasClass('subpage-default-header')){
                popup_position -= 120;
                if(popup_position < 5){
                    popup_position = 5;
                }
            }
            $('.popup').css('top', popup_position);

        }
        $('.popupoverlay').addClass('open');
        $('.popup').addClass('open');
    }
}

function ClosePopup(){

    $('#wrapper').removeClass('padded');
    ResetContainerInputs('.popupcontainer.open');
    var popuphash = window.location.hash.substr(1);

    if(popuphash.indexOf("vidId") > -1){
        currenthash = "";
        history.pushState(null, null, window.location.pathname + document.location.search);
        setTimeout(function(){
            $('#video-iframe').attr('src', '');
        },200);
    }
    $('.popup').removeClass('open');
   // $('.popupcontainer').removeClass('open');
    $('.popupoverlay').removeClass('open');

}

function PositionPopup(){
    if($('.popup').hasClass('open')){

        $('html,body').animate({ scrollTop: 50 }, 300);

        $('.popup').css('top', 70);
    }
}

//function OpenGeneralPopup(event, message){
//     $('.popup .popupcontainer').removeClass('open');
//     $('#genericpopup').addClass('open');
//     $('#genericpopup #generalpopupcontent').html(message);
//
//    OpenPopup();
//    generalpopuptimer = setTimeout(function(){
//        ClosePopup();
//    },3000);
//}
/******** End Pop ups *********/
function arrange_selected_cards(){
    isFilteringCards = true;
    $('.all-cards-dropdown li input').prop('checked', false);
    $('#compare-cards-container .slide').each(function(){
        $('#compare-card-' + $(this).attr('data-card-id')).prop('checked', true);
    });
    isFilteringCards = false;
}

/******* AJAX Calls ********/
function get_filtered_cards(){
    isFilteringCards = true;
    $('#compare-cards-container').addClass('loading');
    var amount = $('#compare-card-amount').val();
    var typeId = $('#compare-card-type').val();
    var reason = $('#compare-purpose').val();

    $.ajax({
        type: "POST",
        url: routeUrl + localisation + "/Personal/GetFilteredCards?typeId=" + typeId + "&amount=" + amount + "&reason=" + reason,
        data: "",
        success: function successFunc(data, status) {
            $("#compare-cards-container").html(data);
            $('#compare-cards-container').removeClass('loading');
            $('.all-cards-dropdown li input').prop('checked', false);
            $('#compare-cards-container .slide').each(function(){
                $('#compare-card-' + $(this).attr('data-card-id')).prop('checked', true);
            });
            OverwriteQueryString({'typeId' : typeId, 'amount' : amount, 'reason' : reason});
            compare_cards_swiper.update(false);
            calc_compare_swiper();
            check_compare_empty();
            manage_compare_section();
            isFilteringCards = false;
        },
        error: function errorFunc(xhr, ajaxOptions, thrownError) {
            $('#compare-cards-container').removeClass('loading');
            compare_cards_swiper.update(false);
            calc_compare_swiper();
            check_compare_empty();
            manage_compare_section();
            isFilteringCards = false;
        }

    });
}
function fetch_cards_by_type(){
    var customurl = $("#customUrlTitle").val();
    $('#cards-parent-container').addClass('loading');
    var types = '';
    $('.page-filter input[name="cards-filter"]:checked').each(function(){
        types += ',' + $(this).val();
    });
    $.ajax({
        type: "POST",
        url: routeUrl + localisation + "/Personal/ChangeCardsType?customurl=" + customurl + "&types=" + types.substr(1),
        data: "",
        success: function successFunc(data, status) {
            $("#cards-parent-container").html(data);
            $('#cards-parent-container').removeClass('loading');
            OverwriteQueryString({'types' : types.substr(1)});
        },
        error: function errorFunc(xhr, ajaxOptions, thrownError) {
            $('#cards-parent-container').removeClass('loading');
        }

    });
}
function fetch_fact_sheets_by_year(){
    var customurl = $("#customUrlTitle").val();
    var year = $("#fact-sheets-filter").val();
    var sectionId = $("#sectionId").val();
    var sectionLevelId = $("#sectionLevelId").val();
    $('#fact-sheets-container').addClass('loading');

    $.ajax({
        type: "POST",
        url: routeUrl + localisation + "/Business/LoadFactSheetsByYear?customurl=" + customurl + "&year=" + year+ "&sectionId=" + sectionId+ "&sectionLevelId=" + sectionLevelId,
        data: "",
        success: function successFunc(data, status) {
            $("#fact-sheets-container").html(data);
            $('#fact-sheets-container').removeClass('loading');
            OverwriteQueryString({'year' : year});
        },
        error: function errorFunc(xhr, ajaxOptions, thrownError) {
            $('#fact-sheets-container').removeClass('loading');
        }

    });
}

function load_more_cards(lang){
    var pageindex = parseInt($("#cards-page-index").val())+1;
    var maxIndex = $("#cards-max-page").val();
    var customurl = $("#customUrlTitle").val();
    if (pageindex < maxIndex) {
        $('#cards-load-more').addClass('loading');
        var types = '';
        $('.page-filter input[name="cards-filter"]:checked').each(function(){
            types += ',' + $(this).val();
        });
        $.ajax({
            type: "POST",
            url: routeUrl + lang + "/Personal/LoadMoreCards?page=" + pageindex + "&customurl=" + customurl + "&types=" + types.substr(1),
            data: "",
            success: function successFunc(data, status) {
                $('#cards-load-more').removeClass('loading');
                $("#cards-container").append(data);
                $("#cards-page-index").val(pageindex);
                if(maxIndex > pageindex + 1){
                    $('#cards-load-more').show();
                }else{
                    $('#cards-load-more').hide();
                }
            },
            error: function errorFunc(xhr, ajaxOptions, thrownError) {
                $('#cards-load-more').removeClass('loading');
            }

        });
    }
}

function remove_properties_tag(lang, param, id){
    if(param == "gov"){
        $('#properties-governorate').val('');
    }
    if(param == "area"){
        $('#properties-area').val('');
    }
    if(param == "keyword"){
        $('#properties-keyword').val('');
    }
    if(param == "cat"){
        $('.properties-categories-swiper .slide[data-cat-id="' + id + '"]').removeClass('active');
    }
    search_properties(lang);
}
function search_properties(lang, fromSrource){
    fromSrource = fromSrource || false;
    $('#properties-search-button').addClass('loading');
    var area = $('#properties-area').val();
    var governorate = $('#properties-governorate').val();
    var keyword = $('#properties-keyword').val();
    var categories = "";
    var catTags = "";
    $('.properties-categories-swiper .slide.active').each(function(){
        if($(this).attr('data-cat-id') != 0){
            categories += ',' + $(this).attr('data-cat-id');
            catTags +='<li>' + $(this).find('.title').text() + '<span class="remove-tag" onclick="remove_properties_tag(\'lang\', \'cat\', ' + $(this).attr('data-cat-id') + ')"></span></li>';
        }
    });
    categories = categories.substr(1);
    $.ajax({
        type: "POST",
        url: routeUrl + lang + "/GroupProfile/FetchProperties?cat=" + categories + "&area=" + area + "&gov=" + governorate + "&keyword=" + keyword,
        data: "",
        success: function successFunc(data, status) {
            $('#properties-search-button').removeClass('loading');
            $("#properties-listing-container").html(data);
            OverwriteQueryString({'cat' : categories, 'area' : area, 'gov' : governorate, 'keyword' : keyword});
            $('#properties-tags-container').html(catTags);
            if(area != undefined && area != ""){
                $('#properties-tags-container').append('<li>' + area + '<span class="remove-tag" onclick="remove_properties_tag(\'lang\', \'area\')"></span></li>');
            }
            if(governorate != undefined && governorate != ""){
                $('#properties-tags-container').append('<li>' + governorate + '<span class="remove-tag" onclick="remove_properties_tag(\'lang\', \'gov\')"></span></li>');
            }
            if(keyword != undefined && keyword != ""){
                $('#properties-tags-container').append('<li>' + keyword + '<span class="remove-tag" onclick="remove_properties_tag(\'lang\', \'keyword\')"></span></li>');
            }
            open_properties_results(fromSrource);
           // $("#properties-page-index").val(1);
//            if(maxIndex > pageindex + 1){
//                $('#stock-exchange-load-more').show();
//            }else{
//                $('#stock-exchange-load-more').hide();
//            }
        },
        error: function errorFunc(xhr, ajaxOptions, thrownError) {
            $('#properties-search-button').removeClass('loading');
        }

    });
}
function load_more_properties(lang){
    var pageindex = parseInt($("#properties-page-index").val())+1;
    var maxIndex = $("#properties-max-page").val();
    if (pageindex < maxIndex) {
        loadingProperties = true;
        $('.properties-results-section').addClass('loading');

        var area = $('#properties-area').val();
        var governorate = $('#properties-governorate').val();
        var keyword = $('#properties-keyword').val();
        var categories = "";
        $('.properties-categories-swiper .slide.active').each(function(){
            if($(this).attr('data-cat-id') != 0){
                categories += ',' + $(this).attr('data-cat-id');
            }
        });
        categories = categories.substr(1);

        $.ajax({
            type: "POST",
            url: routeUrl + lang + "/GroupProfile/LoadMoreProperties?page=" + pageindex + "&cat=" + categories + "&area=" + area + "&gov=" + governorate + "&keyword=" + keyword,
            data: "",
            success: function successFunc(data, status) {
                loadingProperties = false;
                $('.properties-results-section').removeClass('loading');
                $("#properties-listing-container").append(data);
                $("#properties-page-index").val(pageindex);
                open_properties_results();
            },
            error: function errorFunc(xhr, ajaxOptions, thrownError) {
                loadingProperties = false;
                $('.properties-results-section').removeClass('loading');
            }

        });
    }
}
function load_more_stock_announcements(lang){
    var pageindex = parseInt($("#stock-exchange-page-index").val())+1;
    var maxIndex = $("#stock-exchange-max-page").val();
    if (pageindex < maxIndex) {
        $('#stock-exchange-load-more').addClass('loading');

        $.ajax({
            type: "POST",
            url: routeUrl + lang + "/InvestorRelations/LoadMoreStockAnnouncements?page=" + pageindex + "&year=" + $("#stock-exchange-year-filter").val(),
            data: "",
            success: function successFunc(data, status) {
                $('#stock-exchange-load-more').removeClass('loading');
                $("#stock-exchange-announcements-container").append(data);
                $("#stock-exchange-page-index").val(pageindex);
                if(maxIndex > pageindex + 1){
                    $('#stock-exchange-load-more').show();
                }else{
                    $('#stock-exchange-load-more').hide();
                }
            },
            error: function errorFunc(xhr, ajaxOptions, thrownError) {
                $('#stock-exchange-load-more').removeClass('loading');
            }

        });
    }
}
function change_stock_exchange_year(){
    var pageindex = 0;
    var year = $("#stock-exchange-year-filter").val();
    $('#stock-exchange-parent-container').addClass('loading');
    $.ajax({
        type: "POST",
        url: routeUrl + localisation + "/InvestorRelations/LoadStockAnnouncementsByYear?year=" + year,
        data: "",
        success: function successFunc(data, status) {
            $('#stock-exchange-parent-container').removeClass('loading');
            $("#stock-exchange-parent-container").html(data);

            OverwriteQueryString({'year' : year});
        },
        error: function errorFunc(xhr, ajaxOptions, thrownError) {
            $('#stock-exchange-parent-container').removeClass('loading');
       //     alert(xhr.responseText);
        }

    });
}
function load_more_highlights(lang, typeId){
    var pageindex = parseInt($("#financial-highlights-page-index-" + typeId).val())+1;
    var maxIndex = $("#financial-highlights-max-page-" + typeId).val();
    if (pageindex < maxIndex) {
        $('#financial-highlights-load-more-' + typeId).addClass('loading');

        $.ajax({
            type: "POST",
            url: routeUrl + lang + "/GroupProfile/LoadMoreHighlights?page=" + pageindex + "&typeId=" + typeId + "&year=" + $("#financial-highlights-year-filter").val(),
            data: "",
            success: function successFunc(data, status) {
                $('#financial-highlights-load-more-' + typeId).removeClass('loading');
                $("#financial-highlights-container-" + typeId).append(data);
                $("#financial-highlights-page-index-" + typeId).val(pageindex);
                if(maxIndex > pageindex + 1){
                    $('#financial-highlights-load-more-' + typeId).show();
                }else{
                    $('#financial-highlights-load-more-' + typeId).hide();
                }
            },
            error: function errorFunc(xhr, ajaxOptions, thrownError) {
                $('#financial-highlights-load-more-' + typeId).removeClass('loading');
            }

        });
    }
}
function change_highlights_year_and_types(){
    var pageindex = 0;
    var year = $("#financial-highlights-year-filter").val();
    var typeId = $("#financial-highlights-type-filter").val();
    $('#financial-highlights-parent-container').addClass('loading');
    $.ajax({
        type: "POST",
        url: routeUrl + localisation + "/GroupProfile/LoadDownloadablesByYearAndType?year=" + year + "&typeId=" + typeId,
        data: "",
        success: function successFunc(data, status) {
            $('#financial-highlights-parent-container').removeClass('loading');
            $("#financial-highlights-parent-container").html(data);
            if(!$('#financial-highlights-parent-container .downloadable-listing').length){
                $('#financial-highlights-parent-container .no-results-found').removeClass('hidden');
            }else{
                $('#financial-highlights-parent-container .no-results-found').addClass('hidden');
            }
            OverwriteQueryString({'typeId' : typeId, 'year' : year});
        },
        error: function errorFunc(xhr, ajaxOptions, thrownError) {
            $('#financial-highlights-parent-container').removeClass('loading');
            if(!$('#financial-highlights-parent-container .downloadable-listing').length){
                $('#financial-highlights-parent-container .no-results-found').removeClass('hidden');
            }else{
                $('#financial-highlights-parent-container .no-results-found').addClass('hidden');
            }
       //     alert(xhr.responseText);
        }

    });
}
function load_more_financial_results(lang, typeId){
    var customTitle = $("#financial-result-custom-url-title").val();
    var pageindex = parseInt($("#financial-result-page-index-" + typeId).val())+1;
    var maxIndex = $("#financial-result-max-page-" + typeId).val();
    if (pageindex < maxIndex) {
        $('#financial-result-load-more-' + typeId).addClass('loading');

        $.ajax({
            type: "POST",
            url: routeUrl + lang + "/InvestorRelations/LoadMoreFinancialAnnouncements?page=" + pageindex + "&typeId=" + typeId + "&year=" + $("#financial-result-year-filter").val() + "&customtitle=" + customTitle,
            data: "",
            success: function successFunc(data, status) {
                $('#financial-result-load-more-' + typeId).removeClass('loading');
                $("#financial-result-container-" + typeId).append(data);
                $("#financial-result-page-index-" + typeId).val(pageindex);
                if(maxIndex > pageindex + 1){
                    $('#financial-result-load-more-' + typeId).show();
                }else{
                    $('#financial-result-load-more-' + typeId).hide();
                }
            },
            error: function errorFunc(xhr, ajaxOptions, thrownError) {
                $('#financial-result-load-more-' + typeId).removeClass('loading');
            }

        });
    }
}
function change_financial_results_year_and_types(){
    var customTitle = $("#financial-result-custom-url-title").val();
    var pageindex = 0;
    var year = $("#financial-result-year-filter").val();
    var typeId = $("#financial-result-type-filter").val();
    $('#financial-result-parent-container').addClass('loading');
    $.ajax({
        type: "POST",
        url: routeUrl + localisation + "/InvestorRelations/LoadDownloadablesByYearAndType?year=" + year + "&typeId=" + typeId + "&customtitle=" + customTitle,
        data: "",
        success: function successFunc(data, status) {
            $('#financial-result-parent-container').removeClass('loading');
            $("#financial-result-parent-container").html(data);
            if(!$('#financial-result-parent-container .downloadable-listing').length){
                $('#financial-result-parent-container .no-results-found').removeClass('hidden');
            }else{
                $('#financial-result-parent-container .no-results-found').addClass('hidden');
            }
            OverwriteQueryString({'typeId' : typeId, 'year' : year});
        },
        error: function errorFunc(xhr, ajaxOptions, thrownError) {
            $('#financial-result-parent-container').removeClass('loading');
            if(!$('#financial-result-parent-container .downloadable-listing').length){
                $('#financial-result-parent-container .no-results-found').removeClass('hidden');
            }else{
                $('#financial-result-parent-container .no-results-found').addClass('hidden');
            }
       //     alert(xhr.responseText);
        }

    });
}
function load_more_publication_newsletter(lang, typeId){
    var customTitle = $("#financial-result-custom-url-title").val();
    var pageindex = parseInt($("#financial-result-page-index-" + typeId).val())+1;
    var maxIndex = $("#financial-result-max-page-" + typeId).val();
    if (pageindex < maxIndex) {
        $('#financial-result-load-more-' + typeId).addClass('loading');

        $.ajax({
            type: "POST",
            url: routeUrl + lang + "/FinancialResultAndEvents/LoadMoreAnnouncements?page=" + pageindex + "&typeId=" + typeId + "&year=" + $("#financial-result-year-filter").val() + "&customtitle=" + customTitle,
            data: "",
            success: function successFunc(data, status) {
                $('#financial-result-load-more-' + typeId).removeClass('loading');
                $("#financial-result-container-" + typeId).append(data);
                $("#financial-result-page-index-" + typeId).val(pageindex);
                if(maxIndex > pageindex + 1){
                    $('#financial-result-load-more-' + typeId).show();
                }else{
                    $('#financial-result-load-more-' + typeId).hide();
                }
            },
            error: function errorFunc(xhr, ajaxOptions, thrownError) {
                $('#financial-result-load-more-' + typeId).removeClass('loading');
            }

        });
    }
}
function change_publication_newsletter_year(){
    var customTitle = $("#publication-newsletter-custom-url-title").val();
    var pageindex = 0;
    var year = $("#publication-newsletter-filter").val();
    $('#publication-newsletter-parent-container').addClass('loading');
    $.ajax({
        type: "POST",
        url: routeUrl + localisation + "/NewsRoom/LoadNewslettersByYear?year=" + year + "&customtitle=" + customTitle,
        data: "",
        success: function successFunc(data, status) {
            $('#publication-newsletter-parent-container').removeClass('loading');
            $("#publication-newsletter-parent-container").html(data);
            OverwriteQueryString({'year' : year});
        },
        error: function errorFunc(xhr, ajaxOptions, thrownError) {
            $('#publication-newsletter-parent-container').removeClass('loading');
       //     alert(xhr.responseText);
        }

    });
}
function load_more_announcements(lang, customUrl){
    var pageindex = parseInt($("#announcements-page-index").val())+1;
    var maxIndex = $("#announcements-max-page").val();
    if (pageindex < maxIndex) {
        $('#announcements-load-more').addClass('loading');

        $.ajax({
            type: "POST",
            url: routeUrl + lang + "/CorporateGovernance/LoadMoreAnnouncements?page=" + pageindex + "&customUrl=" + customUrl,
            data: "",
            success: function successFunc(data, status) {
                $('#announcements-load-more').removeClass('loading');
                $("#announcements-container").append(data);
                $("#announcements-page-index").val(pageindex);
                if(maxIndex > pageindex + 1){
                    $('#announcements-load-more').show();
                }else{
                    $('#announcements-load-more').hide();
                }
            },
            error: function errorFunc(xhr, ajaxOptions, thrownError) {
                $('#announcements-load-more').removeClass('loading');
            }

        });
    }
}
function load_more_news(lang){
    var pageindex = parseInt($("#news-stories-page-index").val())+1;
    var maxIndex = $("#news-stories-max-page").val();
    if (pageindex < maxIndex) {
        $('#news-stories-load-more').addClass('loading');

        $.ajax({
            type: "POST",
            url: routeUrl + lang + "/NewsRoom/LoadMoreNews?page=" + pageindex,
            data: "",
            success: function successFunc(data, status) {
                $('#news-stories-load-more').removeClass('loading');
                $("#news-stories-container").append(data);
                $("#news-stories-page-index").val(pageindex);
                if(maxIndex > pageindex + 1){
                    $('#news-stories-load-more').show();
                }else{
                    $('#news-stories-load-more').hide();
                }
            },
            error: function errorFunc(xhr, ajaxOptions, thrownError) {
                $('#news-stories-load-more').removeClass('loading');
            }

        });
    }
}

function load_more_blogs(lang){
    var pageindex = parseInt($("#blog-page-index").val())+1;
    var maxIndex = $("#blog-max-page").val();
    if (pageindex < maxIndex) {
        $('#blog-load-more').addClass('loading');

        $.ajax({
            type: "POST",
            url: routeUrl + lang + "/NewsRoom/LoadMoreBlogs?page=" + pageindex,
            data: "",
            success: function successFunc(data, status) {
                $('#blog-load-more').removeClass('loading');
                $("#blog-container").append(data);
                $("#blog-page-index").val(pageindex);
                if(maxIndex > pageindex + 1){
                    $('#blog-load-more').show();
                }else{
                    $('#blog-load-more').hide();
                }
            },
            error: function errorFunc(xhr, ajaxOptions, thrownError) {
                $('#blog-load-more').removeClass('loading');
            }

        });
    }
}
function load_more_awards(lang, branchType){
    var pageindex = parseInt($("#awards-page-index").val())+1;
    var maxIndex = $("#awards-max-page").val();
    if (pageindex < maxIndex) {
        $('#awards-load-more').addClass('loading');

        $.ajax({
            type: "POST",
            url: routeUrl + lang + "/GroupProfile/LoadMoreAwards?page=" + pageindex,
            data: "",
            success: function successFunc(data, status) {
                $('#awards-load-more').removeClass('loading');
                $("#awards-container").append(data);
                $("#awards-page-index").val(pageindex);
                if(maxIndex > pageindex + 1){
                    $('#awards-load-more').show();
                }else{
                    $('#awards-load-more').hide();
                }
            },
            error: function errorFunc(xhr, ajaxOptions, thrownError) {
                $('#awards-load-more').removeClass('loading');
            }

        });
    }
}
function load_more_videos(lang, branchType){
    var pageindex = parseInt($("#news-videos-page-index").val())+1;
    var maxIndex = $("#news-videos-max-page").val();
    if (pageindex < maxIndex) {
        $('#news-videos-load-more').addClass('loading');

        $.ajax({
            type: "POST",
            url: routeUrl + lang + "/NewsRoom/LoadMoreVideos?page=" + pageindex,
            data: "",
            success: function successFunc(data, status) {
                $('#news-videos-load-more').removeClass('loading');
                $("#news-videos-container").append(data);
                $("#news-videos-page-index").val(pageindex);
                if(maxIndex > pageindex + 1){
                    $('#news-videos-load-more').show();
                }else{
                    $('#news-videos-load-more').hide();
                }
            },
            error: function errorFunc(xhr, ajaxOptions, thrownError) {
                $('#news-videos-load-more').removeClass('loading');
            }

        });
    }
}
function load_more_branches(lang, branchType){
    var pageindex = parseInt($("#locate-us-page-index").val())+1;
    var maxIndex = $("#locate-us-max-page").val();
    var regId = getParameterByName('regionId');
    if (pageindex < maxIndex) {
        $('#locate-us-load-more').addClass('loading');

        $.ajax({
            type: "POST",
            url: routeUrl + lang + "/LocateUs/LoadMoreBranches?customUrlTitle=" + branchType + "&regionId=" + regId + "&page=" + pageindex,
            data: "",
            success: function successFunc(data, status) {
                $('#locate-us-load-more').removeClass('loading');
                $("#locate-us-container").append(data);
                $("#locate-us-page-index").val(pageindex);
                if(maxIndex > pageindex + 1){
                    $('#locate-us-load-more').show();
                }else{
                    $('#locate-us-load-more').hide();
                }
            },
            error: function errorFunc(xhr, ajaxOptions, thrownError) {
                $('#locate-us-load-more').removeClass('loading');
           //     alert(xhr.responseText);
            }

        });
    }
}
function change_locate_us_region(regionId){
    var pageindex = 0;
    var branchType = $("#locate-us-customUrl").val();
    $('#locate-us-container').closest('.container-loader').addClass('loading');
    $.ajax({
        type: "POST",
        url: routeUrl + localisation + "/LocateUs/LoadBranchesByRegion?customUrlTitle=" + branchType + "&regionId=" + regionId,
        data: "",
        success: function successFunc(data, status) {
            $('#locate-us-container').closest('.container-loader').removeClass('loading');
            $("#locate-us-container").html(data);
            $("#locate-us-page-index").val(pageindex);
            OverwriteQueryString({'regionId' : regionId});
            var maxIndex = $("#locate-us-max-page").val();
            if(maxIndex > pageindex + 1){
                $('#locate-us-load-more').show();
            }else{
                $('#locate-us-load-more').hide();
            }
        },
        error: function errorFunc(xhr, ajaxOptions, thrownError) {
            $('#locate-us-container').closest('.container-loader').removeClass('loading');
       //     alert(xhr.responseText);
        }

    });
}
/***** END AJAX Calls ******/

/******** Form Submits **********/
$(document).ready(function(){
    $("#footer-newsletter-form").validate({
        ignore: '',
        errorClass: 'missing',
        highlight: function (element, errorClass) {
            $(element).parent().addClass(errorClass);
        },

        unhighlight: function (element, errorClass) {
            $(element).parent().removeClass(errorClass);
        },
        errorPlacement: function (error, element) {
            //error
        },
        rules: {
            email: "required email"
        },
        messages: {
            email: ""
        },
        submitHandler: function (form) {
            $('#footer-newsletter-submit').addClass('loading');
            var data = $(form).serialize();
            var submiturl = $(form).attr("action");

                $.ajax({
                    type: "POST",
                    url: submiturl,
                    data: data,
                    dataType: 'json',
                    success: function successFunc(data, status) {
                        //success
                        if (data.status == 400) {
                            $('.footer-box.newsletter-box .form-message').html('This email is already registered.');
                            $('.footer-box.newsletter-box').addClass('display-message');
                            setTimeout(function(){
                                $('#footer-newsletter-email').val('');
                                $('.footer-box.newsletter-box').removeClass('display-message');
                            },4000);
                        }
                        if (data.status == 200) {
                            $('.footer-box.newsletter-box .form-message').html('You have successfully joined our newsletter.');
                            $('.footer-box.newsletter-box').addClass('display-message');
                            setTimeout(function(){
                                $('.footer-box.newsletter-box').removeClass('display-message');
                                reset('footer-newsletter-form');
                            },4000);
                        }

                    $('#footer-newsletter-submit').removeClass('loading');
                    }
                });
        }
    });

    $("#message-us-form").validate({
        ignore: '',
        errorClass: 'missing',
        highlight: function (element, errorClass) {
            $(element).parent().addClass(errorClass);
        },

        unhighlight: function (element, errorClass) {
            $(element).parent().removeClass(errorClass);
        },
        errorPlacement: function (error, element) {
            //error
        },
        rules: {
            firstName: "required",
            lastName: "required",
            email: "required email"
        },
        messages: {
            firstName: "",
            lastName: "",
            email: ""
        },
        submitHandler: function (form) {
            $('#message-us-submit').addClass('loading');
            var data = $(form).serialize();
            var submiturl = $(form).attr("action");

            $.ajax({
                type: "POST",
                url: submiturl,
                data: data,
                dataType: 'json',
                success: function successFunc(data, status) {
                    //success
                    if (data.message != "success") {
                      //  alert(-1);

                    }
                    else {
//                            reset('registerForm');
                        display_form_message("#message-us-submit");
                        setTimeout(function(){
                            document.getElementById("message-us-form").reset();
                        },200);
                       // alert(1);
                    }
                    $('#message-us-submit').removeClass('loading');
                }
            });
        }
    });

    $("#ircontact-form").validate({
        ignore: '',
        errorClass: 'missing',
        highlight: function (element, errorClass) {
            $(element).parent().addClass(errorClass);
        },

        unhighlight: function (element, errorClass) {
            $(element).parent().removeClass(errorClass);
        },
        errorPlacement: function (error, element) {
            //error
        },
        rules: {
            firstName: "required",
            lastName: "required",
            email: "required email",
            phone:"required"
        },
        messages: {
            firstName: "",
            lastName: "",
            phone: "",
            email: ""
        },
        submitHandler: function (form) {
            $('#ircontact-submit').addClass('loading');
            var data = $(form).serialize();
            var submiturl = $(form).attr("action");

            $.ajax({
                type: "POST",
                url: submiturl,
                data: data,
                dataType: 'json',
                success: function successFunc(data, status) {
                    //success
                    if (data.message != "success") {
                      //  alert(-1);

                    }
                    else {
//                            reset('registerForm');
                        display_form_message("#ircontact-submit");
                        setTimeout(function(){
                            document.getElementById("ircontact-form").reset();
                        },200);
                       // alert(1);
                    }
                    $('#ircontact-submit').removeClass('loading');
                }
            });
        }
    });

    $("#property-form").validate({
        ignore: '',
        errorClass: 'missing',
        highlight: function (element, errorClass) {
            $(element).parent().addClass(errorClass);
        },

        unhighlight: function (element, errorClass) {
            $(element).parent().removeClass(errorClass);
        },
        errorPlacement: function (error, element) {
            //error
        },
        rules: {
            firstName: "required",
            lastName: "required",
            email: "required email"
        },
        messages: {
            firstName: "",
            lastName: "",
            email: ""
        },
        submitHandler: function (form) {
            $('#property-submit').addClass('loading');
            var data = $(form).serialize();
            var submiturl = $(form).attr("action");

                $.ajax({
                    type: "POST",
                    url: submiturl,
                    data: data,
                    dataType: 'json',
                    success: function successFunc(data, status) {
                        //success
                        if (data.message != "success") {
                          //  alert(-1);

                        }
                        else {
//                            reset('registerForm');
                            display_form_message("#property-submit");
                            setTimeout(function(){
                                document.getElementById("property-form").reset();
                            },200);
                           // alert(1);
                        }
                        $('#property-submit').removeClass('loading');
                    }
                });
        }
    });

    $("#complaint-form").validate({
        ignore: '',
        errorClass: 'missing',
        highlight: function (element, errorClass) {
            $(element).parent().addClass(errorClass);
        },

        unhighlight: function (element, errorClass) {
            $(element).parent().removeClass(errorClass);
        },
        errorPlacement: function (error, element) {
            //error
        },
        rules: {
            typeId: "required",
            customerName: "required",
            phone: "required",
            accountNb: "required",
            email: "required email",
            preferContactId: "required"
        },
        messages: {
            typeId: "",
            customerName: "",
            phone: "",
            accountNb: "",
            email: "",
            preferContactId: ""
        },
        submitHandler: function (form) {
            $('#complaint-submit').addClass('loading');
            var data = $(form).serialize();
            var submiturl = $(form).attr("action");

                $.ajax({
                    type: "POST",
                    url: submiturl,
                    data: data,
                    dataType: 'json',
                    success: function successFunc(data, status) {
                        //success
                        if (data.message != "success") {

                        }
                        else {
                            display_form_message("#complaint-submit");
                            setTimeout(function(){
                                document.getElementById("complaint-form").reset();
                            },200);
                        }
                        $('#complaint-submit').removeClass('loading');
                    }
                });
        }
    });

    $("#card-application-form").validate({
        ignore: '',
        errorClass: 'missing',
        highlight: function (element, errorClass) {
            $(element).parent().addClass(errorClass);
        },

        unhighlight: function (element, errorClass) {
            $(element).parent().removeClass(errorClass);
        },
        errorPlacement: function (error, element) {
            //error
        },
        rules: {
            fullName: "required",
            dob: "required",
            gender: "required",
            nationalityId: "required",
            maritalStatus: "required",
            employmentStatusId: "required",
            totalAnnualIncome: "required",
            bestTimeToContact: "required",
            phone: "required",
            email: "required email"
        },
        messages: {
            fullName: "",
            dob: "",
            gender: "",
            nationalityId: "",
            maritalStatus: "",
            employmentStatusId: "",
            totalAnnualIncome: "",
            bestTimeToContact: "",
            phone: "",
            email: ""
        },
        submitHandler: function (form) {
            $('#card-application-submit').addClass('loading');
            var data = $(form).serialize();
            var submiturl = $(form).attr("action");

                $.ajax({
                    type: "POST",
                    url: submiturl,
                    data: data,
                    dataType: 'json',
                    success: function successFunc(data, status) {
                        //success
                        if (data.message != "success") {
                          //  alert(-1);

                        }
                        else {
//                            reset('registerForm');
                            display_cards_form_message('#card-application-submit');
                            setTimeout(function(){
                                document.getElementById("card-application-form").reset();
                            },200);
                           // alert(1);
                        }
                        $('#card-application-submit').removeClass('loading');
                    }
                });
        }
    });
    $("#eway-application-form").validate({
        ignore: '',
        errorClass: 'missing',
        highlight: function (element, errorClass) {
            $(element).parent().addClass(errorClass);
        },

        unhighlight: function (element, errorClass) {
            $(element).parent().removeClass(errorClass);
        },
        errorPlacement: function (error, element) {
            //error
        },
        rules: {
            companyName: "required",
            comercialRegister: "required",
            dealingBranch: "required",
            comercialRegisterDatePlace: "required",
            companyCountry: "required",
            companyMainActivities: "required",
            companyCity: "required",
            companyPOBox: "required",
            companyEmail: "required",
            companyFullAdress: "required",
            managerFirstName: "required",
            managerFamilyName: "required",
            managerPhone: "required",
            managerEmail: "required email",
            isManagerInCharge: "required",
            operationsFirstName: "required",
            operationsLastName: "required",
            operationsEmail: "required email",
            operationsMobile: "required",
            technicalFirstName: "required",
            technicalLastName: "required",
            technicalEmail: "required email",
            technicalMobile: "required",
            financialFirstName: "required",
            financialLastName: "required",
            financialEmail: "required email",
            financialMobile: "required",
            websiteUrl: "required",
            websiteCommercialName: "required",
            typeOfDelivery: "required",
            description: "required",
            LBPAccount: "required",
            USDAccount: "required"
        },
        messages: {
            companyName: "",
            comercialRegister: "",
            dealingBranch: "",
            comercialRegisterDatePlace: "",
            companyCountry: "",
            companyMainActivities: "",
            companyCity: "",
            companyPOBox: "",
            companyEmail: "",
            companyFullAdress: "",
            managerFirstName: "",
            managerFamilyName: "",
            managerPhone: "",
            managerEmail: "",
            isManagerInCharge: "",
            operationsFirstName: "",
            operationsLastName: "",
            operationsEmail: "",
            operationsMobile: "",
            technicalFirstName: "",
            technicalLastName: "",
            technicalEmail: "",
            technicalMobile: "",
            financialFirstName: "",
            financialLastName: "",
            financialEmail: "",
            financialMobile: "",
            websiteUrl: "",
            websiteCommercialName: "",
            typeOfDelivery: "",
            description: "",
            LBPAccount: "",
            USDAccount: ""
        },
        submitHandler: function (form) {
            $('#eway-application-submit').addClass('loading');
            var data = $(form).serialize();
            var submiturl = $(form).attr("action");

                $.ajax({
                    type: "POST",
                    url: submiturl,
                    data: data,
                    dataType: 'json',
                    success: function successFunc(data, status) {
                        //success
                        if (data.message != "success") {
                          //  alert(-1);

                        }
                        else {
//                            reset('registerForm');
                            display_cards_form_message('#eway-application-submit');
                            setTimeout(function(){
                                document.getElementById("eway-application-form").reset();
                            },200);
                           // alert(1);
                        }
                        $('#eway-application-submit').removeClass('loading');
                    }
                });
        }
    });
//    $("#calculate-loan-form").validate({
//        ignore: '',
//        errorClass: 'missing',
//        highlight: function (element, errorClass) {
//            $(element).parent().addClass(errorClass);
//        },
//
//        unhighlight: function (element, errorClass) {
//            $(element).parent().removeClass(errorClass);
//        },
//        errorPlacement: function (error, element) {
//            //error
//        },
//        rules: {
//            regionId: "required",
//            reasonId: "required",
//            rePaymentMethodId: "required",
//            loanAmount: "required",
//            phone: "required",
//            email: "required email"
//        },
//        messages: {
//            regionId: "",
//            reasonId: "",
//            rePaymentMethodId: "",
//            loanAmount: "",
//            phone: "",
//            email: ""
//        },
//        submitHandler: function (form) {
//            $('#apply-form-submit').addClass('loading');
//            var data = $(form).serialize();
//            var submiturl = $(form).attr("action");
//
//                $.ajax({
//                    type: "POST",
//                    url: submiturl,
//                    data: data,
//                    dataType: 'json',
//                    success: function successFunc(data, status) {
//                        //success
//                        if (data.status != 200) {
//                          //  alert(-1);
//                        }
//                        else {
//                            $('#monthly-payment-value').html(data.monthlyInstallment + " USD");
//                            $('#total-loan-amount-value').html(data.totalLoanAmount + " USD");
//                            go_to_services_form(4, 2, 1);
//                            setTimeout(function(){
//                                document.getElementById("apply-form-submit").reset();
//                            },200);
//                           // alert(1);
//                        }
//                        $('#apply-form-submit').removeClass('loading');
//                    }
//                });
//        }
//    });
    $("#personal-loan-appointment-form").validate({
        ignore: '',
        errorClass: 'missing',
        highlight: function (element, errorClass) {
            $(element).parent().addClass(errorClass);
        },

        unhighlight: function (element, errorClass) {
            $(element).parent().removeClass(errorClass);
        },
        errorPlacement: function (error, element) {
            //error
        },
        rules: {
            date: "required",
            branchId: "required",
            timeId: "required"
        },
        messages: {
            date: "",
            branchId: "",
            timeId: ""
        },
        submitHandler: function (form) {
            $('#personal-loan-appointment-form-submit').addClass('loading');
            var data = $(form).serialize();
            var submiturl = $(form).attr("action");

                $.ajax({
                    type: "POST",
                    url: submiturl,
                    data: data,
                    dataType: 'json',
                    success: function successFunc(data, status) {
                        //success
                        if (data.status != 200) {
                          //  alert(-1);
                        }
                        else {
                            service_form_message(4);
                            setTimeout(function(){
                                document.getElementById("calculate-loan-form").reset();
                                $('#personalLoanId').val('');
                                $('#loan-date').val('');
                                $('#loan-appointment-branch').val('');
                                $('#loan-appointment-time').val('');
                            },200);
                           // alert(1);
                        }
                        $('#personal-loan-appointment-form-submit').removeClass('loading');
                    }
                });
        }
    });
    $("#car-loan-appointment-form").validate({
        ignore: '',
        errorClass: 'missing',
        highlight: function (element, errorClass) {
            $(element).parent().addClass(errorClass);
        },

        unhighlight: function (element, errorClass) {
            $(element).parent().removeClass(errorClass);
        },
        errorPlacement: function (error, element) {
            //error
        },
        rules: {
            date: "required",
            branchId: "required",
            timeId: "required"
        },
        messages: {
            date: "",
            branchId: "",
            timeId: ""
        },
        submitHandler: function (form) {
            $('#car-loan-appointment-form').addClass('loading');
            var data = $(form).serialize();
            var submiturl = $(form).attr("action");

                $.ajax({
                    type: "POST",
                    url: submiturl,
                    data: data,
                    dataType: 'json',
                    success: function successFunc(data, status) {
                        //success
                        if (data.status != 200) {
                          //  alert(-1);
                        }
                        else {
                            service_form_message(3);
                            setTimeout(function(){
                                document.getElementById("calculate-car-loan-form").reset();
                                $('#carLoanId').val('');
                                $('#car-date').val('');
                                $('#car-appointment-branch').val('');
                                $('#car-appointment-time').val('');
                            },200);
                           // alert(1);
                        }
                        $('#car-loan-appointment-form').removeClass('loading');
                    }
                });
        }
    });
    $("#house-loan-appointment-form").validate({
        ignore: '',
        errorClass: 'missing',
        highlight: function (element, errorClass) {
            $(element).parent().addClass(errorClass);
        },

        unhighlight: function (element, errorClass) {
            $(element).parent().removeClass(errorClass);
        },
        errorPlacement: function (error, element) {
            //error
        },
        rules: {
            date: "required",
            branchId: "required",
            timeId: "required"
        },
        messages: {
            date: "",
            branchId: "",
            timeId: ""
        },
        submitHandler: function (form) {
            $('#house-loan-appointment-form').addClass('loading');
            var data = $(form).serialize();
            var submiturl = $(form).attr("action");

                $.ajax({
                    type: "POST",
                    url: submiturl,
                    data: data,
                    dataType: 'json',
                    success: function successFunc(data, status) {
                        //success
                        if (data.status != 200) {
                          //  alert(-1);
                        }
                        else {
                            service_form_message(2);
                            setTimeout(function(){
                                document.getElementById("calculate-house-loan-form").reset();
                                $('#houseLoanId').val('');
                                $('#house-date').val('');
                                $('#house-appointment-branch').val('');
                                $('#house-appointment-time').val('');
                            },200);
                           // alert(1);
                        }
                        $('#house-loan-appointment-form').removeClass('loading');
                    }
                });
        }
    });
    $("#business-loan-appointment-form").validate({
        ignore: '',
        errorClass: 'missing',
        highlight: function (element, errorClass) {
            $(element).parent().addClass(errorClass);
        },

        unhighlight: function (element, errorClass) {
            $(element).parent().removeClass(errorClass);
        },
        errorPlacement: function (error, element) {
            //error
        },
        rules: {
            date: "required",
            branchId: "required",
            timeId: "required"
        },
        messages: {
            date: "",
            branchId: "",
            timeId: ""
        },
        submitHandler: function (form) {
            $('#business-loan-appointment-form').addClass('loading');
            var data = $(form).serialize();
            var submiturl = $(form).attr("action");

                $.ajax({
                    type: "POST",
                    url: submiturl,
                    data: data,
                    dataType: 'json',
                    success: function successFunc(data, status) {
                        //success
                        if (data.status != 200) {
                          //  alert(-1);
                        }
                        else {
                            service_form_message(6);
                            setTimeout(function(){
                                document.getElementById("calculate-business-loan-form").reset();
                                $('#businessLoanId').val('');
                                $('#business-date').val('');
                                $('#business-appointment-branch').val('');
                                $('#business-appointment-time').val('');
                            },200);
                           // alert(1);
                        }
                        $('#business-loan-appointment-form').removeClass('loading');
                    }
                });
        }
    });

})

/****** END Form Submits ********/

function tweetPopup(linkUrl, title, twitterAccount) {
  // var twitterAccount = "wonderlists";
   if (title == '' || title == undefined)
       title = encodeURIComponent(document.title);
   var data = "counturl=" + linkUrl + "&text=" + title + "&original_referer=" + window.location.href
       + "&priority=1" + "&url=" + linkUrl + "&via=" + twitterAccount;
//   var data = "counturl=" + linkUrl + "&text=" + title + "&original_referer=" + window.location.href
//       + "&priority=1&related=" + twitterAccount + "&url=" + linkUrl + "&via=" + twitterAccount;
   var path = "http://twitter.com/share?" + data;
   var popUp = window.open(path, 'tweet', 'height=450,width=550,resizable=1');
//   var pollTimer = window.setInterval(function () {
//       if (popUp.closed || popUp == null) {
//           window.clearInterval(pollTimer);
//       }
//   }, 200);
}
/********* TWITTER **********/
function GetPersonalLoanID() {
    $.ajax({
        url: 'https://185.174.240.24/webapi/api/Loan/GetPersonalLoanID',
        type: 'GET',
        success: function (response) {
            console.log(response);
        },
        error: function (data) {
            alert('woops!'); //or whatever
            console.log(data);
        }
    });
}
