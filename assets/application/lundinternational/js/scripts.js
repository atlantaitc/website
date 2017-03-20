/* Load all JQuery here */
jQuery(document).ready(function($) {
    $body = $("body");
    $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
        ajaxStop: function() { $body.removeClass("loading"); }
    });
    /* Vehicle Selector */
    $('#vehiclesearch #vehYear').on('change', function(){
        var data = {module : 'getMake',vehYear : $(this).val()}

        $.ajax({
            url: '/products/ajax',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(res){
                $('#vehMake').removeAttr('disabled');
                $('#vehMake').empty();
                $('#vehMake').append('<option value="">Select Make</option>');
                $('#vehModel').empty();
                $('#vehModel').append('<option value="">Select Model</option>');
                $('#vehSubmodel').empty();
                $('#vehSubmodel').append('<option value="">Select All Submodels</option>');
                $('#vehSubmodel').hide();
                $('#brand').hide();
                $.each(res.data, function(i, make){
                    $('#vehMake').append('<option value="'+make.name+'">'+make.name+'</option>');
                });
            }
        });
    });

    $('#vehiclesearch #vehMake').on('change', function(){
        var data = {module : 'getModel',vehYear : $('#vehYear').val(),vehMake : $(this).val()}

        $.ajax({
            url: '/products/ajax',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(res){
                $('#vehModel').removeAttr('disabled');
                $('#vehModel').empty();
                $('#vehModel').append('<option value="">Select Model</option>');
                $('#vehSubmodel').empty();
                $('#vehSubmodel').append('<option value="">Select All Submodels</option>');
                $('#vehSubmodel').hide();
                $('#brand').hide();
                $.each(res.data, function(i, model){
                    $('#vehModel').append('<option value="'+model.name+'">'+model.name+'</option>');
                });
            }
        });
    });

    $('#vehiclesearch #vehModel').on('change', function(){
        var data = {module : 'getSubmodel',vehYear : $('#vehYear').val(),vehMake : $('#vehMake').val(),vehModel : $(this).val()}

        $.ajax({
            url: '/products/ajax',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(res){
                $('#vehSubmodel').removeAttr('disabled');
                $('#vehSubmodel').empty();
                $('#vehSubmodel').append('<option value="">Select All Submodels</option>');
                $('#brand').show();
                $('#brand').removeAttr('disabled');
                if (res.data) {
                    if (res.data.length > 0) {
                        $('#vehSubmodel').show();
                        $('#vehSubmodel').removeAttr('disabled');
                        $.each(res.data, function(i, submodel){
                            $('#vehSubmodel').append('<option value="'+submodel.name+'">'+submodel.name+'</option>');
                        });
                    }
                } else {
                    $('#vehSubmodel').attr('disabled');
                    $('#vehSubmodel').hide();
                }
            }
        });
    });

	/* Tabs */
	$('ul.tabs').each(function(){
		var $active, $content, $links = $(this).find('a');
		$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
		$active.addClass('active');
		$content = $($active.attr('href'));
		$links.not($active).each(function () {
			$($(this).attr('href')).hide();
		});
		$(this).on('click', 'a', function(e){
			$active.removeClass('active');
			$content.hide();
			$active = $(this);
			$content = $($(this).attr('href'));
			$active.addClass('active');
			$content.show();
			e.preventDefault();
		});
	});

	/* Testimonials */
	var quotes = $(".testimonials li");
	var quoteIndex = -1;
	function showNextQuote() {
		++quoteIndex; quotes.css('filter', 'alpha(opacity=40)');
		quotes.eq(quoteIndex % quotes.length).fadeIn(1000).delay(3000).fadeOut(1000, showNextQuote);
	}showNextQuote();

	/* Thumbnail Switcher */
	$(".list-product-thumbnails a").click(function(event) {	event.preventDefault(); $("#list-product-main").attr("src", $(this).attr("href")); });

	/* Twitter */
	//jQuery(function($){$(".twitter").tweet({username: "lundinter", join_text: "auto", avatar_size: 0, count: 2, loading_text: "loading tweets..."}); });

	/* dropdowns and mobile menu */
	$(".sfmenu").superfish({animation: {height:'show'}, autoArrows:false, dropShadows:false, delay:400, cssArrows:false});
	//$('.sfmenu').mobileMenu({defaultText: 'Navigate to...', className: 'select-menu', subMenuDash: '&ndash;&ndash;'});
	//$('.select-menu').bind('change', function () {var url = $(this).val(); if (url) {window.location = url; } return false; });
	
	$('#topnav-btn').click(
	
	function () {
		$('.sfmenu').toggleClass("xactive");
	});
	
	
	
	// TRIGGER DROP DOWN SUBS
	$('.topnav-subarrow').click(
	
	function () {
		$(this).parent().toggleClass("xpopdrop");
	});

    $('.view-styles').click(function(){
        $('.product_overlay').fadeOut();
        $(this).parent().parent().find('.product_overlay').fadeIn();
    });
    $('.closeoverlay').click(function(){
        $(this).parent().fadeOut();
    });
    $('.list-vehicles .product_overlay').each(function(){
        var j=2;
        $(this).find('li').each(function(){
            if (j==2){
                $(this).addClass('first');
                j=0;
            } else if (j==1){
                $(this).addClass('last');
            } else {
                j++;
            }
        });
    });
	
    /*$(function() {
                $(".twitter").tweet({
                  join_text: "auto",
                  username: ["lundinter"],
                  avatar_size: 0,
                  count: 2,
                  loading_text: "loading tweets..."
                });
    });*/
    $(".youtube").colorbox({iframe:true, innerWidth:425, innerHeight:344});
    $(".youtube2").colorbox({iframe:true, innerWidth:900, innerHeight:728});
});
/* FlexSlider */
$(window).load(function(){$('.flexslider').flexslider({animation: "slide", start: function(slider){$('body').removeClass('loading'); } });});
