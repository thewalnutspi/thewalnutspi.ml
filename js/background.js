var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)");
$(document).on("scroll", function() {
	var scrolltop = -$(document).scrollTop(),
		offset = scrolltop / 5;
	
	if(prefersReducedMotion.matches)
		return;
	
	$(".background").css({
		"background-position": "center " + offset + "px"
	});
}).trigger("scroll");
