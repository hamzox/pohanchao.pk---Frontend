
$(document).ready(function(){
    console.log("Document working!");
    // Sticky Header
$(window).scroll(function() {

    if ($(window).scrollTop() > 100) {
        $('.main_h').addClass('sticky');
    } else {
        $('.main_h').removeClass('sticky');
    }
});

// Mobile Navigation
$('.mobile-toggle').click(function() {
    if ($('.main_h').hasClass('open-nav')) {
        $('.main_h').removeClass('open-nav');
    } else {
        $('.main_h').addClass('open-nav');
    }
});

$('.main_h li a').click(function() {
    if ($('.main_h').hasClass('open-nav')) {
        $('.navigation').removeClass('open-nav');
        $('.main_h').removeClass('open-nav');
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

// Feedback form jquery

        setTimeout(function(){
            $('.usrp-fb-2').addClass('slide-in');
        }, 200);
        
        /* Bind actions to small buttons click */
        $('.usrp-fb-2 .usrp-fb-btn').on('click', function(){
            
            /* Collapse the feedback message into a regular button */
            $('.usrp-fb-2').removeClass('is-expanded')
            setTimeout(function(){ $('.usrp-fb-2').addClass('is-collapsed'); }, 300)
            
            /* Open feedback forum if "Yes" button was clicked in feedback message */
            if ($(this).hasClass('usrp-fb-btn-yes')) {
                setTimeout(function(){ _urq.push(['Feedback_Open']); }, 300);
            };
            
        });

//EO - Feedback form jquery
    
});
