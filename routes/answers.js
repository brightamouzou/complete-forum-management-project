const router=require("express").Router();
const answerControllers=require("../controllers/answers/index")

router.post("/post/:id1/:id2",answerControllers.postAnswer)

module.exports=router;