var express = require('express'),
    load = require('express-load'),
    cors = require('cors'),
    bodyParser = require('body-parser');

module.exports = function() {
	var app = express();
    app.set('view engine', 'ejs');
    app.set('views','./app/views');
    app.use(express.static('./app/public'))
    
    //middleware - BodyParser
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());
    app.use(cors());
    load('routes',{cwd: 'app'}).into(app);

    return app;

}	