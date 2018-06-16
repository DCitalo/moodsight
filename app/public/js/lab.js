var id = $.cookie('idUser');
var idBoard = $.cookie('idBoard');
var userRef = firebase.database().ref(id + "/boards/" + idBoard);
console.log(id + "/boards/" + idBoard)
function hexToRgb(hex) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function (m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		rgb: [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
	} : null;
}
userRef.on('value', function (snapshot) {
	var data = snapshot.val();
	console.log(data)
	var url = "http://colormind.io/api/";
	var colors = {
		model: "default",
		input: ""
	}
	$.each(data.pins, function (i, pin) {
		var rgbColor = hexToRgb(pin.color)
		colors.input += '[' + rgbColor.rgb + ']';
	})
	console.log(JSON.stringify(colors))
	var http = new XMLHttpRequest();
	http.open("POST", url, true);
	http.send(JSON.stringify(colors));
	http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status == 200) {
			var palette = JSON.parse(http.responseText).result;
			console.log(palette)
		}
	}
})

//'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAHcRZekasi - l8mC0Uj_eTweB_AM0NLpDc'