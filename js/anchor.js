$("html, body").scrollTop(0);
$.fadein.reset();
$(document).ready(function() {
	var element;
	if(!(element = document.getElementById(window.location.hash)))
		return null;
	
	var $element = $(element),
		offset = $element.offset();
	
	if(!$element.is(".anchor"))
		return null;
	
	$("html, body").scrollTop(offset.top);
});
