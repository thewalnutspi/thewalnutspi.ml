$(document).on("scroll", function() {
	var scrolltop = -$(document).scrollTop(),
		offset = scrolltop / 5;
	
	$(".background").css({
		"background-position": "center " + offset + "px"
	});
}).trigger("scroll");
