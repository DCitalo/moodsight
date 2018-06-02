module.exports = function(app) {
      var admin = require("firebase-admin");
      var serviceAccount = require("../infra/moodsight-dc6b7-firebase-adminsdk-fvzsx-e71e9cf09a.json");
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://moodsight-dc6b7.firebaseio.com"
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
      // you have address available in req.body:
      // always send a response:
      res.json({ ok: true });
    });

    app.get("/Dashboard",function(req, res) {
      res.render('Dashboard/index');
    });
}