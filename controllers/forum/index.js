const Forum=require("../../models/Forum")


module.exports.postForum= async(req, res)=>{
    console.log(req.body);

    try{
        
        const forum=new Forum({...req.body})

        await forum.save()
        
        res.redirect("/admin")
        
    }catch(err){
        console.log(err.message);
        res.status(400).render("addForumAdmin", {error:"Oups! UNe erreur s'est produite lors de l'ajout du forum"})
    }
}

module.exports.deleteForm=async(req, res)=>{
    console.log(req.params.id);

    try{
        const forum=await Forum.findOne({_id:req.params.id})
        console.log(forum)

        if (forum){
            await Forum.deleteOne({_id:req.params.id})
            console.log("deleted");

        }else{
            res.redirect("/admin")

        }
        return res.redirect('/admin')


    }catch(err){
        console.log(err.message);

        res.redirect("/admin/forums")
    }
    
}