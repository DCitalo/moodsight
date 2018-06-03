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
			var pins = [],
                databoard = {},
                datafirebase = [],
                obj = [],
		        dataMe = {};
			PDK.request('/v1/me', {fields: 'id,username,first_name,last_name,image,bio'}, function (response) {
			if (!response || response.error) {
				console.log(response.error);
			} else {
                dataMe = response.data;
                datafirebase.push({
                    pessoal : dataMe
                })
			}
			});
			PDK.me('boards', function (response) {
				if (!response || response.error) {
					console.log(response.error);
				} else {
                    databoard = response.data;
                    function ShowResults(value, index, ar) {
                        PDK.request('/v1/boards/'+ databoard[index].id +'/pins/', {fields: 'board,id,note,link,url,image,color'} , function (response) {
							if (!response || response.error) {
							alert('Error occurred');
							} else {
							if (response.hasNext) {
								response.next();
                            }
                            pins = response.data;
                            for(var i = 0; i < pins.length; i++){
                                datafirebase.push({
                                    boardName: pins[i].board.name,
                                    boardId: pins[i].board.id,
                                    boardUrl: pins[i].url,
                                    id: pins[i].id,
                                    note: pins[i].note,
                                    img: pins[i].image.original.url,
                                    url: pins[i].url,
                                    color: pins[i].color
                                })
                            }
                        }
                        })
                    }
					databoard.forEach(ShowResults)
				}
			});
			console.log(datafirebase)
			$.ajax({
				url:'/salva',
				type: 'POST',
				data: datafirebase,
				contentType: 'application/json',
				success: function() { console.log('success');},
				error  : function() { console.log('error');}
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