var app = require('./config/express')();
const PORT = 8080;
const HOST = '0.0.0.0';
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
