(function (app, $) {
	// This JSON data should be fetched from the server in loadWidget function
	var profileInfoJson = {
		firstname: "RUCHIKA", 
		lastname: "SHARMA", 
		followers: "12,345",
		user	: {
			email : "sharma.ruchika175@gmail.com",
			address : "Brampton ON",
			phone : "+1 9057830647"
		},
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
			bottomContainerStats	: $(".bottom-container.statics"),
			bottomContainerUser		: $(".bottom-container.user"),
			infoContainerStats		: $(".bottom-container .info-container.statics"),
			infoContainerUser		: $(".bottom-container .info-container.user"),
			editInfo 				: $(".edit-info"),
			inputInfo				: $(".input-info"),
			saveInfo				: $(".save-info"),
			labelInfo 				: $(".label-info"),
			
		};
	}
	function initializeEvents() {
		$cache.infoContainerStats.on('click', function (e) {
			$cache.bottonContainerMain.hide();
			$cache.bottomContainerStats.show();
		});

		$(".bottom-container.statics .back-button").on('click', function (e) {
			$cache.bottonContainerMain.show();
			$cache.bottomContainerStats.hide();
		});

		$cache.infoContainerUser.on('click', function (e) {
			$cache.bottonContainerMain.hide();
			$cache.bottomContainerUser.show();
		});

		$(".bottom-container.user .back-button").on('click', function (e) {
			$cache.bottonContainerMain.show();
			$cache.bottomContainerUser.hide();
		});
		
		$cache.bottomContainerUser.find(".info-container").on('click', function(e){
			$cache.bottomContainerUser.hide();
			$cache.editInfo.show();
			$cache.labelInfo.text($(this).find(".info-container-left").text());
			var data = $(this).find(".info-container-right").text();
			$cache.inputInfo.val(data);
		});
		
		$cache.editInfo.find(".back-button").on('click', function (e) {
			$cache.editInfo.hide();
			$cache.bottomContainerUser.show();
		});
		
		$cache.saveInfo.on('click', function (e){
			var url = "www.dummyurl.com/getprofileinfo";
			var label = $(this).closest(".edit-info").children(".label-info").text();
			var data = label + ":" +  $cache.inputInfo.val();
			console.log(data);
			jQuery.ajax({
				type	: "post",
				url		: url,
				data    : data,
				success	: function(){
					$cache.editInfo.hide();
					$cache.bottomContainerUser.show();
				},
				error 	: function(){
					$cache.editInfo.hide();
					$cache.bottomContainerUser.show();
				}
			
			});
		});
		

	}

	function loadWidget() {
		var url = "www.dummyurl.com/getprofileinfo";
		//Logged in customer's id should be passed with this request
		jQuery.ajax({
			type	: "get",
			url		: url,
			success	: function(response){
				//When data is retrieved from server, dummy profileInfoJson defined on top should be removed.
				var profileInfoJson = response;
				if (profileInfoJson.success)	{
					$(".user-details .firstname").text(profileInfoJson.firstname);
					$(".user-details .lastname").text(profileInfoJson.lastname);
					$(".user-followers span").text(profileInfoJson.followers);
					
					$cache.bottomContainerStats.find(".likes").text(profileInfoJson.statics.likes);
					$cache.bottomContainerStats.find(".comments").text(profileInfoJson.statics.comments);
					$cache.bottomContainerStats.find(".posts").text(profileInfoJson.statics.posts);
					
					$cache.bottomContainerUser.find(".email").text(profileInfoJson.user.email);
					$cache.bottomContainerUser.find(".address").text(profileInfoJson.user.address);
					$cache.bottomContainerUser.find(".phone-number").text(profileInfoJson.user.phone);

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

				$cache.bottomContainerStats.find(".likes").text(profileInfoJson.statics.likes);
				$cache.bottomContainerStats.find(".comments").text(profileInfoJson.statics.comments);
				$cache.bottomContainerStats.find(".posts").text(profileInfoJson.statics.posts);
				
				$cache.bottomContainerUser.find(".email").text(profileInfoJson.user.email);
				$cache.bottomContainerUser.find(".address").text(profileInfoJson.user.address);
				$cache.bottomContainerUser.find(".phone-number").text(profileInfoJson.user.phone);

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