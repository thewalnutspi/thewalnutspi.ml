$(document).ready($.refreshstars = function() {
	$(".github-stars").each(function() {
		var $this = $(this),
			repository = $this.attr("data-repository"),
			content = $this.attr("data-updatingcontent"),
			beforecontent = $this.attr("data-beforecontent") || "",
			aftercontent = $this.attr("data-aftercontent") || "",
			errorcontent = $this.attr("data-errorcontent");
		
		if(typeof content == "string")
			$this.html(content);
		
		$.ajax({
			url: "https://api.github.com/repos/" + repository,
			method: "GET",
			success: function(response) {
				if(typeof response == "string")
					response = $.parseJSON(response);
				
				$this.html(beforecontent + response.stargazers_count + aftercontent);
			},
			error: function() {
				$this.html(errorcontent);
			}
		});
	});
});
