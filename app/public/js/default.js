var delay = (function(){
	var timer = 0;
	return function(callback, ms){
	  clearTimeout (timer);
	  timer = setTimeout(callback, ms);
	};
  })(); 
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
		var pins = [];
		var data = [];
	    PDK.request('/v1/me', function (response) {
	      if (!response || response.error) {
	       console.log(response.error);
	      } else {
	      	data = response.data;
	      }
		});
		
		delay(function(){    
            console.log(data)           
            $.post("/salva", {data}); 
        }, 1000);
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