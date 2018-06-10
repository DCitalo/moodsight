var data = JSON.parse(Cookies.get("basket-data")); 
console.log(data)
var NomeUsuario = data.user.nome.nome;
$("#UsuarioNome").append(NomeUsuario);