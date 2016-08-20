/** VARIABLES **/
var header = $('.main_h');

var userFeedback = $('.usrp-fb-2');
var userSubscribe = $('.usrp-sb-2');

var navigation = $('.navigation');

var textAreaInput = $('.textareaInput');
var emailSubscribe = $('.emailSubscribe');

var container = $("#contentTemplate");

var fontFeedback = $('.usrp-fb-2 .fa');
var fontSubscribe = $('.usrp-sb-2 .fa');

var classOpenNav = 'open-nav';
var classSticky = 'sticky'; 
var patternEmail = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);

var feedbackText;
var emailText;
/** EO - VARIABLES **/


$(document).ready(function(){
    
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

        // Mobile Navigation
        $('.mobile-toggle').click(function() {
            if (header.hasClass(classOpenNav)) {
                header.removeClass(classOpenNav);
            } else {
                header.addClass(classOpenNav);
            }
        });

        $('.main_h li a').click(function() {
            if (header.hasClass(classOpenNav)) {
                navigation.removeClass(classOpenNav);
                header.removeClass(classOpenNav);
            }
        });

        // navigation scroll lijepo radi materem
        $('nav a').click(function(event) {
            
            var id = $(this).attr("href");
            var offset = 70;
            var target = $(id).offset().top - offset;
            
            $('html, body').animate({
                scrollTop: target
            }, 500);
            event.preventDefault();
        });
        
        /** EO - Navigation script**/

        /** Feedback form jquery **/
        setTimeout(function(){
            userFeedback.addClass('slide-in');
        }, 200);
        
        /* Bind actions to small buttons click */
        $('.usrp-fb-btn').on('click', function(){
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
        });
        
        $('.usrp-fb-2 .usrp-fb-title').on('click',function() {
            userFeedback.removeClass('is-collapsed');
            userFeedback.addClass('is-expanded');
        });
    
        textAreaInput.keyup(function() {
            if (textAreaInput.val().length > 0) {  
                fontFeedback.addClass('fa-check font-check');
                $('.font-check').css({'display':'inline'});
            }
            else {
                $('.font-check').css({'display':'none'});
            }
        });
        /** Feedback form jquery **/
     
    
        /** Subscribe form jquery **/
        setTimeout(function(){
            userSubscribe.addClass('slide-in');
        }, 200);
        $('.usrp-sb-btn-yes,.usrp-sb-btn').on('click',function (){
            userSubscribe.css({'top':'35%','right':'0','z-index':'0'});
        });
        
        $('.usrp-sb-2 .usrp-sb-title').on('click',function() {
            userSubscribe.removeClass('is-collapsed');
            userSubscribe.addClass('is-expanded');
            userSubscribe.css({'top':'66%','right':'0','z-index':'0'});
            });
    
            emailSubscribe.keyup(function () {
            
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
        });
    
        /* Bind actions to small buttons click */
        $('.usrp-sb-2 .usrp-sb-btn').on('click', function(){
            
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
        });
        /** EO - Subsribe form jquery **/
        
        /** AJAX CALLS **/
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
        
        $('#sign-up').on('click',function(){
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
        });
        /** EO - AJAX CALLS **/
    
});
