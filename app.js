var app = require('./config/express')();

var port = process.env.PORT || 3000;

    app.listen(port, function () {
        console.log('Server running at http://127.0.0.1:' + port + '/');
    });