const Comment=require("../models/Comment");

module.exports=async (req, res, next)=>{
    console.log(req.params.id);
    
    const comments=await Comment.find({forumId:req.params.id})
    console.log(comments);

    next()
}