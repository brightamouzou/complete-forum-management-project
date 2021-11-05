const Admin=require("../../models/Admin")
const bcrypt=require("bcrypt")

module.exports.changeParams=async (req, res)=>{
    let {secretWord, password, username}=await Admin.findOne({_id:req.params.id})
    console.log(password,username, secretWord);

    console.log(req.body);

    

    try{

        if(req.body.secretWord){
            const secretWordValid=await bcrypt.compare(req.body.secretWord, secretWord)

            console.log(secretWordValid);

            if(secretWordValid===true){

                secretWord=await bcrypt.hash(req.body.secretWordNew, 10)




            }else{
                req.session.changeAdminParamsError="Le mot de passe actuel ou le mot secret d'administrateur actuel sasis sont incorrects "

                console.log("not valid secretWord");

                return res.redirect("/admin/changeParams")

            }
        }

        if(req.body.password){

            const passwordValid=await bcrypt.compare(req.body.password, password)

            if (passwordValid===true){
                password=await bcrypt.hash(req.body.passwordNew, 10)

            }else{
                req.session.changeAdminParamsError="Le mot de passe actuel/mot secret d'administrateur ne sont pas corrcts"
                console.log("not valid passwrod");

                return res.redirect("/admin/changeParams")
 
                
            }

        }

        if(req.body.username){
            username=req.body.username
            req.session.user.username=username

        }

        await Admin.updateOne({_id:req.params.id},{username, password, secretWord})

        res.redirect("/admin/changeParams")
    
    }catch(err){
        console.log(err.message);
        res.redirect("/admin/changeParams")
    }

  

}

