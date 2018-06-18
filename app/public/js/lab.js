var id = $.cookie('idUser');
var idBoard = $.cookie('idBoard');
var numberBoard = $.cookie('NumberBoard');
$('.title-board').append('Painel' + numberBoard)
var boardRef = firebase.database().ref(id + "/boards/" + idBoard);
var userRef = firebase.database().ref(id);
var paleta = {
	color: {}
};
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
function update(jscolor, n) {
	$('.c-bg-color-' + n).css("background-color", "#" + jscolor)
	$('.c-color-' + n).css("color", "#" + jscolor)
}

const menuItems = document.querySelectorAll('.nav-top a[href^="#"]');

function getScrollTopByHref(element) {
	const id = element.getAttribute('href');
	return document.querySelector(id).offsetTop;
}

function scrollToPosition(to) {
	smoothScrollTo(0, to);
}

function scrollToIdOnClick(event) {
	event.preventDefault();
	const to = getScrollTopByHref(event.currentTarget) - 80;
	scrollToPosition(to);
}

menuItems.forEach(item => {
	item.addEventListener('click', scrollToIdOnClick);
});
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
	const startX = window.scrollX || window.pageXOffset;
	const startY = window.scrollY || window.pageYOffset;
	const distanceX = endX - startX;
	const distanceY = endY - startY;
	const startTime = new Date().getTime();

	duration = typeof duration !== 'undefined' ? duration : 400;
	const easeInOutQuart = (time, from, distance, duration) => {
		if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
		return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
	};

	const timer = setInterval(() => {
		const time = new Date().getTime() - startTime;
		const newX = easeInOutQuart(time, startX, distanceX, duration);
		const newY = easeInOutQuart(time, startY, distanceY, duration);
		if (time >= duration) {
			clearInterval(timer);
		}
		window.scroll(newX, newY);
	}, 1000 / 60); // 60 fps
};
userRef.on('value', function (snapshot) {
	var data = snapshot.val();
	var NomeUsuario = data.user.nome.username;
	$("#UsuarioNome").append(NomeUsuario);
})
boardRef.on('value', function (snapshot) {
	var url = "http://colormind.io/api/";
	var snapshot = snapshot.val();
	var NomeBoard = snapshot.boardName;
	$('#nomeBoard').append(NomeBoard);
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
			var paletteResult = JSON.parse(http.responseText).result;
			var p = 1;
			$.each(paletteResult, function (i, color) {
				var r = color["0"],
					g = color["1"],
					b = color["2"],
					RGB = [r, g, b],
					hex = rgbToHex(r, g, b);
				paleta.color[p] = hex;
				$('.c-bg-color-' + p).css("background-color", hex)
				$('.c-color-' + p).css("color", hex)
				$('.c-text-' + p).val(hex);
				p++
				if (p == Object.keys(paletteResult).length) {
					delay(function () {
						$('#loading').toggleClass('hide');
						console.log(paleta)
					}, 1000);
				}
			})
		}
	}
	http.open("POST", url, true);
	http.send(JSON.stringify(data));
})
$('.btn-generate').click(function () {
	var url = "http://colormind.io/api/";
	var data = {
		model: "default",
		input: []
	}
	data.input[0] = hexToRgb($('.c-text-1').val()).rgb;
	data.input[1] = hexToRgb($('.c-text-2').val()).rgb;
	data.input[2] = hexToRgb($('.c-text-3').val()).rgb;
	data.input[3] = hexToRgb($('.c-text-4').val()).rgb;
	data.input[4] = hexToRgb($('.c-text-5').val()).rgb;
	data.input.join();
	var http = new XMLHttpRequest();
	http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status == 200) {
			var paletteResult = JSON.parse(http.responseText).result;
			var p = 1;
			$.each(paletteResult, function (i, color) {
				var r = color["0"],
					g = color["1"],
					b = color["2"],
					RGB = [r, g, b],
					hex = rgbToHex(r, g, b);
				paleta.color[p] = hex;
				$('.c-bg-color-' + p).css("background-color", hex)
				$('.c-color-' + p).css("color", hex)
				$('.c-text-' + p).val(hex);
				p++
			})
			console.log(paleta)
		}
	}
	http.open("POST", url, true);
	http.send(JSON.stringify(data));
})
$('.btn-reset').click(function () {
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
						RGB = [r, g, b],
						hex = rgbToHex(r, g, b);
					paleta.color[p] = hex;
					$('.c-bg-color-' + p).css("background-color", hex)
					$('.c-color-' + p).css("color", hex)
					$('.c-text-' + p).val(hex);
					p++
				})
				console.log(paleta)
			}
		}
		http.open("POST", url, true);
		http.send(JSON.stringify(data));
	})
})

$('.c-switch').click(function () {
	$(this).toggleClass('c-bg-color-1')
})
function setFont(selectObject, i) {
	var value = selectObject.value;
	$('.c-font-' + i).css("font-family", value);
	$('.name-font-' + i).html(value)
}
$('.show-menu').click(function () {
	$('.menu-mb').css('left', '0%')
})
$('.hide-menu').click(function () {
	$('.menu-mb').css('left', '-100%')
})
$('#flat').click(function () {
	$('.topFace').css("transform", "rotateX(0deg) rotateY(0deg) rotateZ(0deg)")
})
$('#persp').click(function () {
	$('.topFace').css("transform", "rotateX(50deg) rotateY(10deg) rotateZ(-45deg)")
})
$('.btn-save').click(function () {
	console.log(id)
	console.log(paleta)
	$.post("/salvaPaleta", { id });
})
