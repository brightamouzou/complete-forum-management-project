const router = require("express").Router();
const bcrypt=require("bcrypt");
const TestUser = require("../models/TestUser");
const jwt=require("jsonwebtoken")
const cors=require("cors");

router.post('/signup',(req,res)=>{
     bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new TestUser({
          username: req.body.username,
          password: hash
        });
        user.save()
          .then((newUser) =>{
             res.status(201).json({ 
                message: 'Utilisateur créé !' ,
                newUser:{
                    username:newUser.username
                }
            })
          }) 
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
});


router.post("/login",(req,res)=>{

      TestUser.findOne({ username: req.body.username })
        .then((user) => {
          if (!user) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
          }
          bcrypt
            .compare(req.body.password, user.password)
            .then((valid) => {
              if (!valid) {
                return res
                  .status(401)
                  .json({ error: "Mot de passe incorrect !" });
              }
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                  expiresIn: "24h",
                }),
              });
            })
            .catch((error) => res.status(500).json({ error:error.message}));
        })
        .catch((error) => res.status(500).json({ error:error.message }));
})
router.get("/users/:username", (req, res) => {
  TestUser.findOne({ username: req.params.username},{password:0})
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé !" });
      }
      return res.status(200).json({
        username:user.username,
      }); 
    })
});

module.exports=router;

