var id = $.cookie('idUser'); 
var userRef = firebase.database().ref(id);
userRef.on('value', function(snapshot) {
    console.log(snapshot.val());	
});	
console.log(data)
$(document).ready(function(){
    var NomeUsuario = data.user.nome.nome;
    $("#UsuarioNome").append(NomeUsuario);
    let numeroBoard = 1;
    $.each(data.boards,function(i, board){
        let painel ="<div id="+numeroBoard+" class='painel-cont tamfont1'>\
                        <span class='tamfont3 color-2 Upper bold font-1'>Painel "+numeroBoard+"</span>\
                        <ul class='pin-car DF FW CSS'>"
                            $.each(board.pins,function(i, pin){
                                painel +="<li class='pin-img'><img src="+pin.img+"></li>"
                            })
            painel +="</ul></div>"
        $("#Dashboard").append(painel);
        numeroBoard++               
    })
    $('.pin-car').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
      });
})
