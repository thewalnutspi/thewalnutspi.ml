$(".fade-in-on-scroll").css("visibility", "hidden").css("opacity", 0);
$(".fade-out-on-scroll").css("display", "block").css("opacity", 1);

var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)");

$.fadein = {};

$(document).on("scroll", $.fadein.refresh = function() {
	var headerheight = $("nav").outerHeight(true),
		scrolltop = $(document).scrollTop() + headerheight,
		windowheight = $(window).height() - headerheight,
		documentheight = $(document).height() - headerheight,
		percentage = scrolltop / (documentheight - windowheight),
		centertop = documentheight * percentage,
		scrollbottom = scrolltop + windowheight;
	
	$(".fade-in-on-scroll").each(function() {
		var $this = $(this),
			offset = $this.offset().top,
			offsetbottom = offset + $this.outerHeight(),
			$mtop, $mbottom;
		
		if(centertop < offset)
			return;
		
		if(prefersReducedMotion.matches) {
			$mtop = $("<div></div>");
			$mbottom = $("<div></div>");
		} else {
			$mtop = $("<div></div>").css("padding-top", 100).animate({
				"padding-top": 0
			}, 800, function() {
				$(this).remove();
				$this.data("fadein-top", null);
			});
			
			$mbottom = $("<div></div>").css("margin-top", -100).animate({
				"margin-top": 0
			}, 800, function() {
				$(this).remove();
				$this.data("fadein-bottom", null);
			});
		}
			
		$this.removeClass("fade-in-on-scroll").addClass("done-fade-in-on-scroll").addClass("fade-in-on-scroll-animate").data({
			"fadein-top": $mtop,
			"fadein-bottom": $mbottom
		}).css({
			"visibility": "visible"
		}).before($mtop).after($mbottom).animate({
			"opacity": 1
		}, 800, function() {
			$this.removeClass("fade-in-on-scroll-animate");
		});
	});
	
	$(".done-fade-in-on-scroll").each(function() {
		var $this = $(this),
			offset = $this.offset().top,
			offsetbottom = offset + $this.outerHeight(),
			$mtop, $mbottom;
		
		if(offset < scrollbottom)
			return;
		
		$this.stop().addClass("fade-in-on-scroll").removeClass("done-fade-in-on-scroll").removeClass("fade-in-on-scroll-animate").css("visibility", "hidden").css("opacity", 0);
		if(($mtop = $($this.data("fadein-top"))).length > 0) $mtop.stop().remove();
		if(($mbottom = $($this.data("fadein-bottom"))).length > 0) $mbottom.stop().remove();
		$this.data({ "fadein-top": null, "fadein-bottom": null });
	});
	
	$(".fade-out-on-scroll").each(function() {
		var $this = $(this),
			offset = $this.offset().top;
		
		if(centertop < offset)
			return;
		
		$this.removeClass("fade-out-on-scroll").addClass("done-fade-out-on-scroll").addClass("fade-out-on-scroll-animate").slideUp(800).animate({
			"opacity": 0
		}, 800, function() {
			$this.removeClass("fade-out-on-scroll-animate");
		}).slideUp(800);
	});
	
	$(".done-fade-out-on-scroll").each(function() {
		var $this = $(this),
			offset = $this.offset().top;
		
		if(offset < scrollbottom)
			return;
		
		$(this).stop().removeClass("done-fade-out-on-scroll").removeClass("fade-out-on-scroll-animate").addClass("fade-out-on-scroll").css("display", "block").css("opacity", 1);
	});
});

$.fadein.reset = function() {
	$(".done-fade-in-on-scroll").stop().removeClass("done-fade-in-on-scroll").removeClass("fade-in-on-scroll-animate").addClass("fade-in-on-scroll").css("visibility", "hidden").css("opacity", 0).each(function() {
		var $this = $(this),
			$mtop = $($this.data("fadein-top")),
			$mbottom = $($this.data("fadein-bottom"));
		
		$this.data({
			"fadein-top": null,
			"fadein-bottom": null
		});
		$mtop.stop().remove();
		$mbottom.stop().remove();
	});
	$(".done-fade-out-on-scroll").stop().removeClass("done-fade-out-on-scroll").removeClass("fade-out-on-scroll-animate").addClass("fade-out-on-scroll").css("display", "block").css("opacity", 1);
};

$.fadein.refresh();
