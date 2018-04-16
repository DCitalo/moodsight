function pintrestLogin(){
	window.pAsyncInit = function() {
	    PDK.init({
	        appId: "4956315507922840393",
	        cookie: true
	    });
	    PDK.login({ scope : 'read_relationships,read_public' }, function(response){
	        if (!response || response.error) {
	          console.log('Error occurred');
	        } else {
	          console.log(JSON.stringify(response));
	        }
	    var pins = [];
	    PDK.request('/v1/me/boards/', function (response) {
	      if (!response || response.error) {
	       console.log('Error occurred');
	      } else {
	      	var data = response.data;
	      	console.log(data)
	      	data.map(function(p) {
	      		console.log(p.name)
	      		//var yahoo = $( "#result" ).load( p.url );
	       		//console.log(yahoo);
	      		//console.log("https://api.pinterest.com/v1/me/"+p.id+"?access_token="+PDK.getSession().accessToken+"&fields=counts" )
	      	})
	      	//console.log(data)
	        PDK.getSession().accessToken; 
	        PDK.logout();
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