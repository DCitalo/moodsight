var app = require('./config/express')();

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>  console.log(`Servidor rodando`));
