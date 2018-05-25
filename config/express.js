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

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'https://moodsight.herokuapp.com/');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });
    app.use(bodyParser.urlencoded({extended : true}));
    
    load('routes',{cwd: 'app'}).into(app);

    return app;

}	