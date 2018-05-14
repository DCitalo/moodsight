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

    load('routes',{cwd: 'app'}).into(app);

    return app;

}	