const router=require("express").Router();
const isAuthCheck=require('../middleware/isAuthCheck.js/isAUthCheck')
const isAuthCheckOnLoginPage=require("../middleware/isAuthCheck.js/isAuthCheckOnLoginPage")



const adminControllers=require("../controllers/admin/index");
const adminSettingsControllers=require("../controllers/admin/settings");




//LIste des forums et autres

router.post("/signup",isAuthCheck,adminControllers.signup); //signup de l'admin
router.post("/login", adminControllers.login);
router.post("/logout", isAuthCheck,adminControllers.logout); //Login de l'admin
 //Login de l'admin




//Paramètres de l'admin
//router.post("/settings/signup", adminControllers.signup);//Ajout d'un nouvel admin

router.post("/settings/changeParams/:id", adminSettingsControllers.changeParams);//Changer de mot de passe

module.exports=router


