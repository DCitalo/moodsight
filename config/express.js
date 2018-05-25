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
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'https://www.moodsight.com.br/');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    app.use(bodyParser.urlencoded({extended : true}));

    load('routes',{cwd: 'app'}).into(app);

    return app;

}	