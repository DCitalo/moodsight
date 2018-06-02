let express = require('express'),
    load = require('express-load'),
    bodyParser = require('body-parser'),
    fs = require('fs');
    
module.exports = function() {
	let app = express();
    app.set('view engine', 'ejs');
    //app.set('views','./app/views');
    app.set('views','./app/views');
    app.use(express.static('./app/public'))
    
    //middleware - BodyParser
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    
    load('routes',{cwd: 'app'}).into(app);

    return app;

}	