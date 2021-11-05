const Forum=require("../models/Forum")
const forumsGetting=require("../middleware/forumsGetting")
const isAuthCheck=require("../middleware/isAuthCheck.js/isAUthCheck")
const isAuthCheckOnLoginPage=require("../middleware/isAuthCheck.js/isAuthCheckOnLoginPage")
const Comment=require("../models/Comment")
const { error } = require("npmlog")




const router=require("express").Router();

router.get("/", isAuthCheck,forumsGetting,(req, res)=>{
   
    res.render("admin", {forums:req.session.forums, user:req.session.user})
 
})

router.get("/changeParams", isAuthCheck,  (req, res)=>{

    console.log(req.originalUrl);

    res.render("changeParamsAdmin", {user:req.session.user, error:req.session.changeAdminParamsError})
})


router.get("/forums/:id",isAuthCheck,forumsGetting, async(req, res)=>{
    try{
        const currentForum=await Forum.findOne({_id:req.params.id})

        const comments=await Comment.find({forumId:req.params.id})
        comments.reverse()

     
        res.render("forumAdmin", {currentForum, comments})


    }catch(err){
        res.redirect("/notfound")
    }

} )

router.get("/login",isAuthCheckOnLoginPage, (req, res)=>{
    res.render("adminLogin", {error:req.session.loginError});

})


router.get("/signup", isAuthCheck,(req, res)=>{
    res.render("adminSignup", {user:req.session.user, error:req.session.signupError});
    
})


router.get("/ajouter%20un%20forum", isAuthCheck,(req, res)=>{
    res.render("addForumAdmin", {user:req.session.user});

})

module.exports=router;
