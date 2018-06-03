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
        var usersRef = ref.child(req.body.datafirebase.pessoal.id);
        userRef.push({
            nome: {
              nome: req.body.datafirebase.pessoal.first_name,
              sobrenome: req.body.datafirebase.pessoal.last_name
            },
            image_profile: {
              url: req.body.datafirebase.pessoal.image["60x60"].url
            }
        });
        for(var i= 1; i < req.body.datafirebase.length; i++){
          usersRef.push({
            boardName: req.body.datafirebase[i].boardName,
            boardId: req.body.datafirebase[i].boardId,
            boardUrl: req.body.datafirebase[i].boardUrl,
            id: req.body.datafirebase[i].id,
            note: req.body.datafirebase[i].note,
            img: req.body.datafirebase[i].img,
            url: req.body.datafirebase[i].url,
            color: req.body.datafirebase[i].color
          })
        }
        // you have address available in req.body:
        console.log(req.body.datafirebase);
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