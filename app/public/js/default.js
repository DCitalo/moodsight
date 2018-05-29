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
			let dataMe = [];
			PDK.request('/v1/me', {fields: 'id,username,first_name,last_name,image,bio'}, function (response) {
			if (!response || response.error) {
				console.log(response.error);
			} else {
				dataMe = response.data;
			}
			});
			let pins = [];
			let	databoard = [];
			PDK.me('boards', function (response) {
				if (!response || response.error) {
					console.log(response.error);
				} else {
					databoard = response.data;
					databoard.map((k) =>{
						PDK.request('/v1/boards/'+ k.id +'/pins/', {fields: 'id,note,link,url,image,color'} , function (response) {
							if (!response || response.error) {
							alert('Error occurred');
							} else {
								pins = pins.concat(response.data);
								if (response.hasNext) {
									response.next(); // this will recursively go to this same callback
								}
							}
						});
					})	
				}
			});
			console.log(databoard)
			console.log(dataMe)
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