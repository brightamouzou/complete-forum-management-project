const Answer=require("../../models/Answer")
const Comment=require("../../models/Comment")
module.exports.postAnswer=async(req, res)=>{
    console.log(req.params);
    console.log(req.originalUrl);
    let answer={};

    try{
        if (req.session.isAuth){
            answer=new Answer({...req.body, isAdmin:true, username:req.session.user.username, forumId:req.params.id1, commentId:req.params.id2})

        }else{

             answer=new Answer({...req.body, forumId:req.params.id1, commentId:req.params.id2})
        }


        await answer.save()

        await Comment.updateOne({_id:req.params.id2}, {$push:{answers:answer}})
        
        res.redirect("/forums/"+req.params.id1)

    }catch(err){
        console.log("crash");
        console.log(err.message);
        res.redirect("/forums/"+req.params.id1)

    }

}

