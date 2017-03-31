(function (app, $) {
	// This JSON data should be fetched from the server in loadWidget function
	var profileInfoJson = {
		firstname: "RUCHIKA", 
		lastname: "SHARMA", 
		followers: "12,345",
		statics : {
			likes : "15,000",
			comments : "7,500",
			posts : "2,600"
		}
	};
	var $cache;
	function initializeCache() {
		$cache = {
			bottonContainerMain		: $(".bottom-container.main"),
			bottomContainerStats	: $(".bottom-container.statics")
		};
	}
	function initializeEvents() {
		$(".bottom-container .info-container.statics").on('click', function (e) {
			$cache.bottonContainerMain.hide();
			$cache.bottomContainerStats.show();
		});

		$(".bottom-container.statics .back-button").on('click', function (e) {
			$cache.bottonContainerMain.show();
			$cache.bottomContainerStats.hide();
		});

		
	}

	function loadWidget() {
		var url = "www.dummyurl.com/getprofileinfo";
		//Logged in customer's id should be passed with this request
		jQuery.ajax({
			type	: "get",
			url		: url,
			dataType: 'html',
			success	: function(response){
				//When data is retrieved from server, dummy profileInfoJson defined on top should be removed.
				var profileInfoJson = response;
				if (profileInfoJson.success)	{
					$(".user-details .firstname").text(profileInfoJson.firstname);
					$(".user-details .lastname").text(profileInfoJson.lastname);
					$(".user-followers span").text(profileInfoJson.followers);

					$cache.bottomContainerStats.find(".followers").text(profileInfoJson.followers);
					$cache.bottomContainerStats.find(".likes").text(profileInfoJson.statics.likes);
					$cache.bottomContainerStats.find(".comments").text(profileInfoJson.statics.comments);
					$cache.bottomContainerStats.find(".posts").text(profileInfoJson.statics.posts);

					$(".loader").hide();
					$(".content").show();
				}			
			},
			error	: function(response){
				//This should handle error but as the AJAX URL is not valid it will always end up here
				//So handling success scenario here as well
				$(".user-details .firstname").text(profileInfoJson.firstname);
				$(".user-details .lastname").text(profileInfoJson.lastname);
				$(".user-followers span").text(profileInfoJson.followers);

				$cache.bottomContainerStats.find(".followers").text(profileInfoJson.followers);
				$cache.bottomContainerStats.find(".likes").text(profileInfoJson.statics.likes);
				$cache.bottomContainerStats.find(".comments").text(profileInfoJson.statics.comments);
				$cache.bottomContainerStats.find(".posts").text(profileInfoJson.statics.posts);

				$(".loader").hide();
				$(".content").show();
			}
		});
	}

	/******* app.profile public object ********/
	app.profile = {
		init : function () {
			initializeCache();
			initializeEvents();
			//This is to simulate small delay which will result in when data will be fetched from server
			setTimeout(function () { loadWidget();}, 200 );
		
		}
	}
}(window.app = window.app || {}, jQuery));


jQuery(document).ready(function() {
	app.profile.init();
});