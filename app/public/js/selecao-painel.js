var id = $.cookie('idUser');
var userRef = firebase.database().ref(id);
userRef.on('value', function (snapshot) {
    var data = snapshot.val();
    var NomeUsuario = data.user.nome.username;
    $("#UsuarioNome").append(NomeUsuario);
    let numeroBoard = 1;
    $.each(data.boards, function (i, board) {
        if (numeroBoard % 4 == 0) {
            let banner = "<div class='painel-cont'><img src='/img/Banner-premium-AD.png' src='' /></div>"
            $("#Dashboard").append(banner)
        }
        var boardId = board;
        console.log(boardId)
        let painel = "<div id=" + numeroBoard + " class='painel-cont DF FW CSP tamfont1'>\
                        <span class='tamfont3 bg-gradient-3 color-1 Upper bold font-1 text-center title-board'>Painel " + numeroBoard + "</span>\
                        <ul class='pin-car w-80 DF FW CSS'>"
        $.each(board.pins, function (i, pin) {
            painel += "<li class='pin-img'><img src=" + pin.img + "></li>"
        })
        painel += "  </ul>\
                        <button data-lab="+ boardId + " href='http://wwww.moodsight.com.br/Laboratorio' class='btn-start btn-round DF FW CSS color-4'><i class='icon-small icon-upload'></i><span class='start-text font-1 tamfont3 bold'>Iniciar</span></button>\
                    </div>"
        $("#Dashboard").append(painel);
        numeroBoard++
        if (numeroBoard == Object.keys(data.boards).length) {
            delay(function () {
                $('#loading').toggleClass('hide');
            }, 1000);
        }
    })
    $('.btn-start').click(function () {
        var idBoard = $(this).data("lab");
        $.cookie('idBoard', idBoard);
        window.location.replace('http://www.moodsight.com.br/Laboratorio');
    })
    $('.pin-car').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 5,
        infinite: true,
        slidesToScroll: 4,
        prevArrow: "<button type='button' class='slick-prev'><i class='bgcolor-6 icon-seta-esquerda icon-small'></i></button>",
        nextArrow: "<button type='button' class='slick-next'><i class='bgcolor-6 icon-seta-direita icon-small'></i></button>"
    });
});