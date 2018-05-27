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
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });

    load('routes',{cwd: 'app'}).into(app);

    return app;

}	