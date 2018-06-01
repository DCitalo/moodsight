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
			let pins = {};
			let	databoard = {};
			var jsonArr = [];
			PDK.me('boards', function (response) {
				if (!response || response.error) {
					console.log(response.error);
				} else {
					databoard = response.data;
					for each(var item in databoard){
						PDK.request('/v1/boards/'+ databoard[item].id +'/pins/', {fields: 'board,id,note,link,url,image,color'} , function (response) {
							if (!response || response.error) {
							alert('Error occurred');
							} else {
							pins = response.data;
							if (response.hasNext) {
								response.next();
							}
						})
					}	
				}
			});
			//$.post('/salva', {obj});
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