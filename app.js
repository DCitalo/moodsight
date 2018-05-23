var app = require('./config/express')();

var port = process.env.PORT || 5000;

    app.listen(port, function () {
        console.log('Server running at ' + port + '/');
    });