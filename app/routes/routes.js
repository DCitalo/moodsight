module.exports = function(app) {
      var admin = require("firebase-admin");
      var serviceAccount = require("../infra/moodsight-dc6b7-firebase-adminsdk-fvzsx-e71e9cf09a.json");
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://moodsight-dc6b7.firebaseio.com"
      });
      app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });
      app.get("/",function(req, res) {
        res.render('home/index');
      });
      app.post('/salva', (req, res) => {
        var db = admin.database();
        var ref = db.ref("users");
        var usersRef = ref.child(req.body.data.id);
        usersRef.set({
            nome: {
              first_name: req.body.data.first_name,
              last_name: req.body.data.last_name
            },
            url: req.body.data.url
        });
        // you have address available in req.body:
        console.log(req.body.dataBoards);
        // always send a response:
        res.json({ ok: true });
      });
      app.get("/Dashboard",function(req, res) {
        res.render('Dashboard/index');
      });
      app.get("/Biblioteca-de-Conteudo",function(req, res) {
        res.render('Biblioteca-de-Conteudo/index');
      });
      app.get("/Ajuda",function(req, res) {
        res.render('Ajuda/index');
      });
      app.get("/Contato",function(req, res) {
        res.render('Contato/index');
      });    
      app.get("/Sobre",function(req, res) {
        res.render('Sobre/index');
      });    
}