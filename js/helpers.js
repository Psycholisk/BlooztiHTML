function FIX_BODY() {
   temp_top = parseInt($(document).scrollTop());
   var bodyClasses = $('body').attr('class');
   $('body').addClass('fix-position');
   $('body').css('top', -temp_top + 'px');
   var classes = bodyClasses.split(' ');
   for (var i = 0; i < classes.length; i++) {
       $('body').addClass(classes[i]);
   }
}

function UNFIX_BODY() {

   $('body').removeClass('fix-position');
   $('body').css('top', 'auto');

   $('html,body').animate({ scrollTop: temp_top }, 0);
   temp_top = 0;
}


function OpenPopup(){
    screen_position = $(document).scrollTop();
    screenbottom = $(document).scrollTop() + $(window).height();
    popup_position = screen_position;
  //  FIX_BODY();
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
  //  UNFIX_BODY();
    $('#wrapper').removeClass('padded');
    ResetContainerInputs('.popupcontainer.open');
    var popuphash = window.location.hash.substr(1);

    if(popuphash.indexOf("productId") > -1 ){
        currenthash = "";
        history.pushState(null, null, window.location.pathname + document.location.search);
    }
    if(popuphash.indexOf("vidId") > -1 ){
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
function ForceClick(el){
    href = el.attr('href');
    if(href != undefined && href != ""){
        window.location.href=href;
    }
}
function CustomForceClick(el){
    href = el.attr('href');
    if(href != undefined && href != ""){
        window.location.href=href;
    }else{
        if(el.find('clickablecover').length){
            href = el.find('clickablecover').attr('href');
            window.location.href=href;
        }
    }
}
function ConvertDateInputs() {
    if($('.input.dateinput, .input.date-input').length){
        if(isHandheld()){
            $('.input.dateinput, .input.date-input').datepicker( "destroy" );
            $('.input.dateinput, .input.date-input').attr('type', 'date');
        }else{
            $('.input.dateinput, .input.date-input').attr('type', 'text');
            $('.input.dateinput, .input.date-input').attr('readonly', 'readonly');
            $('.input.dateinput, .input.date-input').datepicker({
                changeMonth: true,
                changeYear: true,
                yearRange:"-110:+0",
                format:'d/m/y',
                gotoCurrent: true
            });
//            $('.input.dateinput, .input.date-input').datepicker({
//               format:'d/m/y',
//                timepicker:false
//            });
        }
    }
}
function ValidateEmail(mail)
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}
function isEmptyOrUndefined(value){
    if(value != null && value != undefined && value != ""){
        return false;
    }
    return true;
}
function isInteger(x) {
    return parseInt(x, 10) === x;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isVisible(el){
    windowHeight = $(window).height();
    distanceFromTop = $(document).scrollTop();
    minVisibleArea = distanceFromTop;
    maxVisibleArea = distanceFromTop + windowHeight;

    elementTopPosition = $(el).offset().top;
    elementBottomPosition = elementTopPosition + el.height();

    if((elementTopPosition > minVisibleArea && elementTopPosition < maxVisibleArea) || (elementBottomPosition > minVisibleArea && elementBottomPosition < maxVisibleArea) || (elementTopPosition < minVisibleArea && elementBottomPosition > maxVisibleArea)){
        return true;
    }
    return false;
}

function extractVideoID(videourl){
    var temp;
    if(videourl.indexOf("watch?v=") > -1){
        temp = videourl.split("watch?v=")[1].split("?")[0];
    }else{
        if(videourl.indexOf("/embed/") > -1){
            temp = videourl.split("/embed/")[1].split("?")[0];
        }else{
            temp = videourl.split("/")[videourl.split("/").length - 1];

        }
    }
    return temp;
}

/*
    Function: HistoryBack
    --
    Version: 1
    --
    Description: Redirects to last visited url from the current domain using history.
*/
function HistoryBack(){
    lastUrl = document.referrer;
    //Checks if last visited url belongs to this domain
    if(lastUrl != "" && lastUrl.indexOf($('#routeUrl').val())){
        window.history.back();
    }
    return false;
}

function BackToTop(){
    $('html,body').animate({ scrollTop: 0 }, $(document).height() / 7);
}

function ResetContainerInputs(id){
    $(id + " input").not('[type="radio"]').not('[type="checkbox"]').not('[type="hidden"]').val('');
    $(id + ' input[type="checkbox"]').prop('checked', false);
    $(id + " textarea").val('');
    $(id + " select").val('');
}
function SetHash(hashkey){
    if(window.location.hash.substr(1)  != hashkey){
        history.pushState(null, null, window.location.pathname + document.location.search + '#' + hashkey);
    }
}
function RemoveHash(){
    history.pushState(null, null, window.location.pathname + document.location.search);
}

function getUrlQuery() {
    var strings = document.location.href.substr('?');
    return '?' + strings[1].substr('#')[0];
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function setParameterByName(name, value) {
    var url = window.location.href;
    if(url.indexOf('#') > -1){
        var chunks = url.split('#');
        if(url.indexOf('?') > -1){
            var currentValue = getParameterByName(name);
            if(currentValue != undefined && currentValue != ""){
                if(currentValue != value){
                    chunks[0] = chunks[0].replace(name + "=" + currentValue, name + "=" + value);
                    history.pushState(null, null, chunks[0] + '#' + chunks[1]);
                }
            }else{
                history.pushState(null, null, chunks[0] + '&' + name + '=' + value + '#' + chunks[1]);
            }
        }else{
            history.pushState(null, null, chunks[0] + '?' + name + '=' + value + '#' + chunks[1]);
        }
    }else{
         if(url.indexOf('?') > -1){
             var path = window.location.href;
            var currentValue = getParameterByName(name);
            if(currentValue != undefined && currentValue != ""){
                if(currentValue != value){
                    path = path.replace(name + "=" + currentValue, name + "=" + value);
                    history.pushState(null, null, path);
                }
            }else{
                history.pushState(null, null, window.location.pathname + location.search + '&' + name + '=' + value);
            }
        }else{
            history.pushState(null, null, window.location.pathname + '?' + name + '=' + value);
        }
    }
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

function AnimateToElement(id, offset, speed){
    var toPosition = $(id).offset().top + offset;
    $('html,body').animate({ scrollTop: toPosition }, speed);
}

function ToggleActive(id){
    if($(id).hasClass('active')){
        $(id).removeClass('active');
    }else{
        $(id).addClass('active');
    }
}

function ToggleOpen(id){
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

function isIpad(){
    return navigator.userAgent.match(/iPad/i) != null ? true : false;
}

function isHandheld(){
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){
        return true;
    }
    return false;
}

function isIOS(){
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
//        if (browserRatio >=1.5) {
//            $container.css('min-height', '360px');
//        } else {
//            $container.css('min-height', '555px');
//        }
    return true;
    }
    return false;
}

function msieversion() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
    }

    return false;
}
function OverwriteQueryString(queryArray){
    var str = "";
    for(var key in queryArray){
        if(queryArray[key] != undefined && queryArray[key] != ""){
            str += "&" + key + "=" + queryArray[key];
        }
    }

    var url = window.location.href;

    if(url.indexOf('#') > -1){
        var chunks = url.split('#');
        history.pushState(null, null, chunks[0].split('?')[0] + (str != "" ? '?' + str.substring(1) : "") + "#" + chunks[1]);
    }else{
        history.pushState(null, null, url.split('?')[0] + (str != "" ? '?' + str.substring(1) : ""));
    }
}
//End Default Functions

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
