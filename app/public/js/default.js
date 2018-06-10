var config = {
    apiKey: "AIzaSyBr1s64aEZ1TApJSuod9nIE8-fqjKPdtoo",
    authDomain: "moodsight-dc6b7.firebaseapp.com",
    databaseURL: "https://moodsight-dc6b7.firebaseio.com",
    projectId: "moodsight-dc6b7",
    storageBucket: "moodsight-dc6b7.appspot.com",
    messagingSenderId: "755238016909"
  };
firebase.initializeApp(config);
var database = firebase.database();

var delay = (function(){
	var timer = 0;
	return function(callback, ms){
	  clearTimeout (timer);
	  timer = setTimeout(callback, ms);
	};
  })(); 
function pintrestLogout(){
	window.pAsyncInit = function() { 
	    PDK.init({
	        appId: "4956315507922840393",
	        cookie: true
		});
		PDK.logout();
	}
}
function pintrestLogin(){
	window.pAsyncInit = function() { 
	    PDK.init({
	        appId: "4956315507922840393",
	        cookie: true
	    });
	    PDK.login({ scope : 'read_relationships,read_public' }, function(response){
	        if (!response || response.error) {
				PDK.request('/v1/me', {fields: 'id'}, function (response) {
					if (!response || response.error) {
						console.log(response.error);
					} else {
						var id = response.data.id;
						delay(function(){              
							$.post("/login", {id});	
							$.cookie('idUser', id);
							var userRef = firebase.database().ref(id);
							userRef.on('value', function(snapshot) {
								$.cookie('user', JSON.stringify(snapshot.val()));	
							});						
							window.location.replace('/Dashboard');
						}, 1000);
					}
				})
	        } else {
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
				delay(function(){    
					console.log(datafirebase)           
					$.post("/salva", {datafirebase}); 
					$.post("/login"); 
				}, 1000);
	        }
			
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
var n = $('.car-cont').data("car");
var m = 0;
if(n == 0){
	$('#setaE').css("visibility","hidden")
}
$('#setaE').click(function() {
	n--;
	m += 10;
	if(n == 0){
		$('#setaE').css("visibility","hidden")
	}
	if(n != 6){
		$('#setaD').css("visibility","visible")
	}
	$('.car-cont').css("transform","translateX("+ m +"%)")
});
$('#setaD').click(function() {
	n++;
	m -= 10;
	if(n == 6){
		$('#setaD').css("visibility","hidden")
	}
	if(n != 0){
		$('#setaE').css("visibility","visible")
	}
	$('.car-cont').css("transform","translateX("+ m +"%)")
});
$('.tabs').each(function(){
    var $active, $content, $links = $(this).find('a');
    $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
    $active.addClass('active');
    $content = $($active[0].hash);
    $links.not($active).each(function () {
        $(this.hash).hide();
    });
    $(this).on('click', 'a', function(e){
        $active.removeClass('active');
        $content.hide();
        $active = $(this);
        $content = $(this.hash);
        $active.addClass('active');
        $content.show();
        e.preventDefault();
    });
});
