const router=require("express").Router();
const commentsControllers=require("../controllers/comments");


router.post("/post/:id", commentsControllers.postComment)

router.delete("/delete/:id", commentsControllers.deleteComment)

router.put("/like/:id", commentsControllers.likeComment)

router.put("/dislike/:id", commentsControllers.dislikeComment)



module.exports=router;