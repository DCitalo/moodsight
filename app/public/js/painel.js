var id = $.cookie('idUser');
var userRef = firebase.database().ref(id);
var url = "http://colormind.io/api/";
var data = {
	model: "default",
	input: [
		[44, 43, 44],
		[90, 83, 82],
		[57, 46, 44],
		[34, 98, 55],
		[89, 32, 45],
		[56, 37, 00],
		[43, 31, 16],
		[78, 43, 55]
	]
}

var http = new XMLHttpRequest();

http.onreadystatechange = function () {
	if (http.readyState == 4 && http.status == 200) {
		var palette = JSON.parse(http.responseText).result;
	}
}

http.open("POST", url, true);
http.send(JSON.stringify(data));