var app         = require('connect')()
var serveStatic = require('serve-static')

app.use(serveStatic('src'))

console.log(' ➜   Open: http://localhost:4041')
app.listen(4041)
