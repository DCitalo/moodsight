function pintrestLogin(){
	window.pAsyncInit = function() {
	    PDK.init({
	        appId: "4956315507922840393",
	        cookie: true
	    });
	    PDK.login({ scope : 'read_relationships,read_public' }, function(response){
	        if (!response || response.error) {
	          	console.log(response.error);
	        	PDK.logout();
	        } else {
	          console.log(response);
	        }
			let data = [];
			PDK.request('/v1/me', function (response) {
			if (!response || response.error) {
				console.log(response.error);
			} else {
				data += response.data;
			}
			});
			PDK.request('/v1/me/boards', function (response) {
			if (!response || response.error) {
			console.log(response.error);
				} else {
				let	databoard = response.data;
				console.log(databoard["0"].id);
				let pins = []
					PDK.request('/v1/me/boards/'+databoard.["0"].id+'/pins/', function (response) {if (!response || response.error) {
						alert('Error occurred');
					} else {
						pins = pins.concat(response.data);
						console.log(pins)
						if (response.hasNext) {
							response.next(); // this will recursively go to this same callback
						}
					}
					});
				}
			});
	    });
	};
	(function(d, s, id){
	    var js, pjs = d.getElementsByTagName(s)[0];
	    if (d.getElementById(id)) {return;}
	    js = d.createElement(s); js.id = id;
	    js.src = "//assets.pinterest.com/sdk/sdk.js";
	    pjs.parentNode.insertBefore(js, pjs);
	}(document, 'script', 'pinterest-jssdk'));
}