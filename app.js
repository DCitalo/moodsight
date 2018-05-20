var app = require('./config/express')();

const PORT = 8080;

app.listen(PORT, () =>  console.log(`Servidor rodando`));
