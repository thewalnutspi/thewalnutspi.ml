$(document).ready(function() {
	$("[data-toggle='modal'][data-target='#status-modal']").attr("href", null);
	
	$("#status-modal").on("show.bs.modal", function(event) {
		var $this = $(event.relatedTarget),
			$modal = $(this),
			site = $this.attr("data-site");
		
		$modal.find(".status-modal-site").text(site);
		$modal.find(".modal-body").hide();
		$modal.find(".status-modal-body-loading").show();
		$modal.find("details").prop("open", false);
		
		$.ajax({
			url: "https://status.samuelthomas.ml/api/" + site + ":info",
			method: "GET",
			success: function(response) {
				console.log(response);
				
				$modal.find(".modal-body").hide();
				$modal.find(".status-modal-body-status").show();
				
				$modal.find(".status-modal-url").text(response.url);
				$modal.find(".status-modal-lastupdated").text($.format.date(response.lastupdated * 1000, "dd/MM/yyyy h:mm:ss a").toLowerCase());
				$modal.find(".status-modal-nextupdate").text($.format.date(response.nextupdate * 1000, "dd/MM/yyyy h:mm:ss a").toLowerCase());
				$modal.find(".status-modal-status").html(response.status ? "<span class=\"glyphicon glyphicon-ok\"></span> Online" : "<span class=\"glyphicon glyphicon-remove\"></span> Offline");
				$modal.find(".status-modal-lastonline").text($.format.date(response.lastonline * 1000, "dd/MM/yyyy h:mm:ss a").toLowerCase());
				$modal.find(".status-modal-response").text(response.lastonlineresponse);
				$modal.find(".status-modal-info-url").text(response.info_url);
				$modal.find(".status-modal-info-link").attr("href", response.info_url);
				$modal.find(".status-modal-upstream-speed").text(response.lastonlinecurl.speed_upload);
				$modal.find(".status-modal-downstream-speed").text(response.lastonlinecurl.speed_download);
			},
			error: function() {
				$modal.find(".modal-body").hide();
				$modal.find(".status-modal-body-error").show();
			}
		});
	});
});
