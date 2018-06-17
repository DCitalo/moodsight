var id = $.cookie('idUser');
var idBoard = $.cookie('idBoard');
var boardRef = firebase.database().ref(id + "/boards/" + idBoard);
var userRef = firebase.database().ref(id);
function hexToRgb(hex) {
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function (m, r, g, b) {
		return r + r + g + g + b + b;
	});
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		rgb: [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
	} : null;
}
function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function update(jscolor) {
	$('.cont-pal-lab').closest('.pal-lab').css("background-color", "#" + jscolor)
}
userRef.on('value', function (snapshot) {
	var data = snapshot.val();
	var NomeUsuario = data.user.nome.username;
})
boardRef.on('value', function (snapshot) {
	var url = "http://colormind.io/api/";
	var snapshot = snapshot.val();
	var input = [];
	var data = {
		model: "default",
		input: []
	}
	var k = 0;
	$.each(snapshot.pins, function (i, pin) {
		var rgbColor = hexToRgb(pin.color)
		data.input[k] = rgbColor.rgb;
		k++;
		data.input.join();
	})
	var http = new XMLHttpRequest();

	http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status == 200) {
			var palette = JSON.parse(http.responseText).result;
			var p = 1;
			$.each(palette, function (i, color) {
				var r = color["0"],
					g = color["1"],
					b = color["2"],
					rgb = rgbToHex(r, g, b);
				$('.c-bg-color-' + p).css("background-color", "rgb(" + r + "," + g + "," + b + ")")
				$('.c-text-' + p).append("#" + rgb);
				$('.c-text-' + p).val(rgb);
				p++
			})
		}
	}
	http.open("POST", url, true);
	http.send(JSON.stringify(data));
})

//'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAHcRZekasi - l8mC0Uj_eTweB_AM0NLpDc'
