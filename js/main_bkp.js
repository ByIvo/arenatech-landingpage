"use strict";

var wSize = function( type ){
    if (type == 'h') return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    else if (type == 'w') return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

$(window).on('resize', function () {
    if (wSize('w') >= 800) $('.menu-header').removeAttr('style');
});

$(document).ready(function() {
  	var c=0;
	
	$('#js-menu--header').on('click',function(){
		$('.menu-header').slideToggle();		
	});

	if( wSize('w') < 800 ) {
		$('.menu-header').fadeOut();
		$('.menu-link').on('click',function(){
			$('.menu-header').fadeOut();
		});
	}

	$("#form1").validate({
  		submitHandler: function(form) {
				$("#submit").addClass("loading");

				var name=$("input[name*='name']").val();
				var email=$("input[name*='email']").val();
				var description=$("textarea[name*='description']").val();
				
				$.ajax({
				    url: '/modulos/handler/formularios.ashx',
      				type: "POST",
      				data: {
          				name: name,
          				email: email,
		  				description: description
            		}, 
   				}).done(function(data) {

   					console.info(data);

   					$('#form1')[0].reset();
					$("#submit").addClass("hide-loading");
      				$(".done").addClass("finish");
					setTimeout(function() {
     					$("#submit").removeClass("loading");
      					$("#submit").removeClass("hide-loading");
      					$(".done").removeClass("finish");
    				}, 2000);
   				}).fail(function() {
   				    $('#form1')[0].reset();
					$("#submit").addClass("hide-loading");
      				$(".failed").addClass("finish");
					setTimeout(function() {
     					$("#submit").removeClass("loading");
      					$("#submit").removeClass("hide-loading");
      					$(".failed").removeClass("finish");
    				}, 2000);
				});
  		}
	});

	$('a[href*=#]:not([href=#])').on("click", function () {
	    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	        if (target.length) {
	            $('html,body').animate({
	                scrollTop: target.offset().top - 70
	            }, 1000);

	            $('.menu-header').slideUp('fast');
	            return false;
	        }
	    }
	});



	var boxOpened = false;
	function openCloseBox() {
	    if (!boxOpened) {
	        openBox();
	    } else {
	        closeBox();
	    }
	}

	$(".box3d").on("click", openCloseBox);

	function openBox() {
	    $(".box3d").off("click", openCloseBox);
	    setTimeout(function () {
	        boxOpened = true;
	        $(".box3d").on("click", openCloseBox);
	    }, 1000);
	    $(".box3d-top").addClass("box3d-open");
	    setTimeout(function () {
	        $(".feature1").removeClass("inside-box-left");
	    }, 400);
	    setTimeout(function () {
	        $(".feature2").removeClass("inside-box-left");
	    }, 500);
	    setTimeout(function () {
	        $(".feature3").removeClass("inside-box-right");
	    }, 600);
	    setTimeout(function () {
	        $(".feature4").removeClass("inside-box-right");
	    }, 700);

	    return false;
	}
	var closing = false;
	function closeBox() {
	    $(".box3d").off("click", openCloseBox);
	    setTimeout(function () {
	        boxOpened = false;
	        closing = true;
	        $(".box3d").on("click", openCloseBox);
	    }, 1000);
	    setTimeout(function () {
	        $(".box3d-top").removeClass("box3d-open");
	    }, 600);
	    for (var i = 1; i <= 4; i++) {
	        $(".feature-line", ".feature" + i).addClass("feature-line-hide");
	        $(".feature-star", ".feature" + i).addClass("feature-star-hide");
	        $("#feature-details" + i).addClass("hide-f-details");
	    }
	    $(".feature1").addClass("inside-box-left");
	    $(".feature2").addClass("inside-box-left");
	    $(".feature3").addClass("inside-box-right");
	    $(".feature4").addClass("inside-box-right");

	    setTimeout(function () {
	        closing = false;
	    }, 2000);

	    return false;
	}

	$(".box3d").trigger("click");

});


$('.partners-slider').slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {breakpoint: 1024,settings: {slidesToShow: 5,slidesToScroll: 1,infinite: true,dots: true}},
	{breakpoint: 990,settings: {slidesToShow: 4,slidesToScroll: 1}},
	{breakpoint: 800,settings: {slidesToShow: 3,slidesToScroll: 1}},
    {breakpoint: 600,settings: {slidesToShow: 2,slidesToScroll: 1}},
    {breakpoint: 480,settings: {slidesToShow: 1,slidesToScroll: 1}}
  ]
});