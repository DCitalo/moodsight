module.exports = function(app) {
      var admin = require("firebase-admin");
      var serviceAccount = require("../infra/moodsight-dc6b7-firebase-adminsdk-fvzsx-e71e9cf09a.json");
      var userID;
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
      app.post('/login', (req, res) =>{
        userID = req.body.id;
        var db = admin.database();
        var ref = db.ref(req.body.id);
        var usersRef = ref.child("teste");
        usersRef.update({
          oi : foi
        })
        res.json({ ok: true });
        
      });
      app.post('/salva', (req, res) => {
        var db = admin.database();
        userID = req.body.datafirebase[0].pessoal.id;
        var ref = db.ref(userID);
        var usersRef = ref.child("user");
        usersRef.update({
            nome: {
              nome: req.body.datafirebase[0].pessoal.first_name,
              sobrenome: req.body.datafirebase[0].pessoal.last_name
            },
            image_profile: {
              url: req.body.datafirebase[0].pessoal.image["60x60"].url
            }
        });
        for(var i= 1; i < req.body.datafirebase.length; i++){
          var boardRef = ref.child("boards/"+req.body.datafirebase[i].boardId);
          boardRef.update({
              boardName: req.body.datafirebase[i].boardName,
              boardUrl: req.body.datafirebase[i].boardUrl,
          });
          var pinRef = boardRef.child("pins/"+req.body.datafirebase[i].id)
          pinRef.update({
              note: req.body.datafirebase[i].note,
              img: req.body.datafirebase[i].img,
              url: req.body.datafirebase[i].url,
              color: req.body.datafirebase[i].color
          })
        }
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