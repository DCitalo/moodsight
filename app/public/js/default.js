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
			PDK.me( function (response) {
			if (!response || response.error) {
				console.log(response.error);
			} else {
				data = response.data;
				console.log(data)
			}
			});
			let pins = [];
			PDK.me('boards', function (response) {
				if (!response || response.error) {
					console.log(response.error);
				} else {
					let	databoard = response.data;
					console.log(databoard["0"].id);
					PDK.request('/v1/boards/'+ databoard["0"].id +'/pins/', function (response) {
							if (!response || response.error) {
							alert('Error occurred');
							} else {
								pins = pins.concat(response.data);
								console.log(pins)
								PDK.request('/pins/'+pins["0"].id, {fields: 'id,note,link,url,image'}, function (response) {
									if (!response || response.error) {
										console.log(response.error);	
									}else{
										var ThisPin = response.data;
										console.log("3"+ThisPin.pin.images['136x136,236x,1200x']);
									}
								})
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