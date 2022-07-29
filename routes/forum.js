const router=require("express").Router();
const forumControllers=require("../controllers/forum/index");


router.post("/post",forumControllers.postForum);//Poster un commentaire

router.delete("/delete/:id",forumControllers.deleteForm);//Supprimer un forum


module.exports=router
