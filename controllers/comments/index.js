const Comment=require("../../models/Comment");
const { deleteOne } = require("../../models/Forum");
const Forum=require("../../models/Forum")


module.exports.postComment=async(req, res)=>{
    originalUrl=req.originalUrl.split("/")
    let comment={}

    try{
        console.log(req.params.id);
        console.log(req.body);
        const curentForum=await Forum.findOne({_id:req.params.id})
        console.log(curentForum._id);

        if(req.session.isAuth){

            comment=new Comment({...req.body, username:req.session.user.username, forumId:curentForum._id, isAdmin:true})
        }else{
            comment=new Comment({...req.body, forumId:curentForum._id})

        }   
        await comment.save()
        console.log("saved");
        console.log(req.originalUrl);
        res.redirect("/forums/"+originalUrl[originalUrl.length-1])
    }catch(err){
        res.redirect("/forums/"+originalUrl[originalUrl.length-1])
    }


}

module.exports.likeComment=async (req, res)=>{
    const comment=await Comment.findOne({_id:req.params.id})

    console.log(comment);

    try{
        

        await comment.update({likes:Number(comment.likes)+1})
        console.log('saved like');

        res.redirect("/forums/"+comment.forumId)
    }catch(err){
        console.log(err.message);
        res.redirect("/forums/"+comment.forumId)
    }

}



module.exports.dislikeComment=async (req, res)=>{
    const comment=await Comment.findOne({_id:req.params.id})


    try{

        await comment.update({dislikes:Number(comment.dislikes)+1})

        res.redirect("/forums/"+comment.forumId)
        
    }catch(err){
        console.log(err.message);
        res.redirect("/forums/"+comment.forumId)
        
    }

}



module.exports.deleteComment=async(req, res)=>{
    console.log(req.body);

    const {forumId}=await Comment.findOne({_id:req.params.id})
    console.log(forumId);
    try{

        await Comment.deleteOne({_id:req.params.id})
        console.log("deleted");
    }catch(err){
        console.log(err.message);
        res.redirect(`/admin/forums/+${forumId}`)
    }

        res.redirect(`/admin/forums/${forumId}`)
    

}