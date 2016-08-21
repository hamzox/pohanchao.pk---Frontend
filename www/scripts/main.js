/** GLOBAL VARIABLES **/

var header;
var userFeedback;
var userSubscribe;
var navigation;
var textAreaInput;
var emailSubscribe;
var container;
var fontFeedback;
var fontSubscribe;
var classOpenNav;
var classSticky; 

var patternEmail = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
var feedbackText;
var emailText;

/** EO - GLOBAL VARIABLES **/

$(document).ready(function() {
    
    header = $('.main_h');
    userFeedback = $('.usrp-fb-2');
    userSubscribe = $('.usrp-sb-2');
    navigation = $('.navigation');
    textAreaInput = $('.textareaInput');
    emailSubscribe = $('.emailSubscribe');
    container = $("#contentTemplate");
    fontFeedback = $('.usrp-fb-2 .fa');
    fontSubscribe = $('.usrp-sb-2 .fa');
    classOpenNav = 'open-nav';
    classSticky = 'sticky'; 
    
    /** Some important initializations **/
    feedbackText="";
    emailText="";
    textAreaInput.val("");
    emailSubscribe.val("");
    
    /** Navigation script **/
        
    // Sticky Header
    $(window).scroll(function() {

        if ($(window).scrollTop() > 100) {
            header.addClass(classSticky);
        } else {
            header.removeClass(classSticky);
        }
    });
        
    // navigation scroll
    $('nav a').click(function(event) {
            
        var id = $(this).attr("href");
        var offset = 70;
        var target = $(id).offset().top - offset;
            
        $('html, body').animate({
            scrollTop: target
        }, 500);
        event.preventDefault();
    });
        
    // Mobile Navigation
    $('.mobile-toggle').click(mobiletoggle_click);
        
    //Header Links
    $('.main_h li a').click(headerButtons_click);
        
    //load template on signup
    $('#sign-up').on('click',signUp_click);
    
    $('#login-modal-register').on('click',login_modal_register_register);

    /** EO - Navigation script**/

    
    /** Feedback form jquery **/
        
    setTimeout(userFeedbackTimeout, 200);
    $('.usrp-fb-btn').on('click', userFeedbackButtonYes_click);
    $('.usrp-fb-2 .usrp-fb-title').on('click',userFeedbackButton_click);
    textAreaInput.keyup(feedbackTextArea_keyup);
    
    /** Feedback form jquery **/
     
    
    /** Subscribe form jquery **/
    
    setTimeout(userSubscribeTimeout, 200);
    $('.usrp-sb-btn-yes,.usrp-sb-btn').on('click',userSubscribeYes_click);
    $('.usrp-sb-2 .usrp-sb-title').on('click',userSubscribe_click);
    $('.usrp-sb-2 .usrp-sb-btn').on('click',userSubscribeButtonNo_click);
    emailSubscribe.keyup(emailSubscribe_keyup);
    
    /** EO - Subsribe form jquery **/
    
        
    /** AJAX CALLS **/
        
    template.home();
        
    /** EO - AJAX CALLS **/
});

function headerButtons_click () {
    if (header.hasClass(classOpenNav)) {
        navigation.removeClass(classOpenNav);
        header.removeClass(classOpenNav);
    }
}
function mobiletoggle_click () {
    if (header.hasClass(classOpenNav)) {
        header.removeClass(classOpenNav);
    } else {
        header.addClass(classOpenNav);
    }
}

/** Feedback button functions **/
function userFeedbackTimeout () {
    userFeedback.addClass('slide-in');
}
function userFeedbackButtonYes_click (){
    feedbackText = textAreaInput.val();
            
    fontFeedback.removeClass('fa-check font-check');
            
    textAreaInput.val("");

    /* Collapse the feedback message into a regular button */
    userFeedback.removeClass('is-expanded')
    setTimeout(function(){ userFeedback.addClass('is-collapsed'); }, 300)
            
    /* Open feedback forum if "Yes" button was clicked in feedback message */
    if ($(this).hasClass('usrp-fb-btn-yes')) {
                
        if (feedbackText.length > 0) {
            console.log("Feedback pushed to database: "+feedbackText);
            /** Push to database here **/
        } 
        else {
            console.log("Feedback length zero: "+feedbackText);
            /** Further logic here for backend **/
        }
    };
}
function userFeedbackButton_click () {
    userFeedback.removeClass('is-collapsed');
    userFeedback.addClass('is-expanded');
}
function feedbackTextArea_keyup () {
    if (textAreaInput.val().length > 0) {  
        fontFeedback.addClass('fa-check font-check');
        $('.font-check').css({'display':'inline'});
    }
    else {
        $('.font-check').css({'display':'none'});
    }
}


/** Subscribe button functions **/
function userSubscribeTimeout () {
    userSubscribe.addClass('slide-in');
}
function userSubscribe_click () {
    userSubscribe.removeClass('is-collapsed');
    userSubscribe.addClass('is-expanded');
    userSubscribe.css({'top':'66%','right':'0','z-index':'0'});
}
function userSubscribeYes_click () {
    userSubscribe.css({'top':'35%','right':'0','z-index':'0'});
}
function emailSubscribe_keyup () {
            
    var userinputemail = emailSubscribe.val();
        
    if(!patternEmail.test(userinputemail))
    {
        $('.usrp-sb-2 .font-check').css({'display':'none'});
        console.log("NO!");
    }
    else
    {   
        fontSubscribe.addClass('fa-check font-check');
        $('.usrp-sb-2 .font-check').css({'display':'inline'});
        console.log("YES!"+userinputemail);
    }
}
function userSubscribeButtonNo_click () {
            
    $('.font-check').css({'display':'none'});//Display nothing when font is clicked NO
    emailSubscribe.val("");
            
    /* Collapse the feedback message into a regular button */
    userSubscribe.removeClass('is-expanded')
    setTimeout(function(){ userSubscribe.addClass('is-collapsed'); }, 300)
            
    /* Open feedback forum if "Yes" button was clicked in feedback message */
    if ($(this).hasClass('usrp-sb-btn-yes')) {
                
        $('.font-check').css({'display':'none'});//Display nothing when font is clicked YES
                
        emailText = emailSubscribe.val();//Final, text value for pushing into the database.
                
                
    };
}


function login_modal_register_register () {
    signUp_click();
}
function signUp_click() {
    $.ajax(
    {
        type: 'GET',
        url:"views/sign-up.html",
                
        success: function(data) {
            container.html(data);
        },
        error: function () {
        alert("error loading in content");  
        } 
    });
}
var template = {
    home : function() {
        $.ajax(
        {
            type: 'GET',
            url:"views/container.html",
                    
            success: function(data) {
                container.html(data);
            },
            error: function () {
              alert("error loading in content");  
            } 
        });
    }    
};
