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
			var obj = [];
			let dataMe = {};
			PDK.request('/v1/me', {fields: 'id,username,first_name,last_name,image,bio'}, function (response) {
			if (!response || response.error) {
				console.log(response.error);
			} else {
				dataMe = response.data;
				obj = Object.assign({}, dataMe);
			}
			});
			let pins = {};
			let	databoard = {};
			console.log(obj)
			//$.post('/salva', {});
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