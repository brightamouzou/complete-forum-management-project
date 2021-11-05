const bcrypt=require("bcrypt");
const Admin=require("../../models/Admin")

module.exports.signup=(req,res,next)=>{

    bcrypt.hash(req.body.password, 10)
        .then(hash1 => {
            const password=hash1

            bcrypt.hash(req.body.secretWord, 10)
            .then(hash2=>{
                secretWord=hash2

                const admin=new Admin({name:req.body.name, username:req.body.username,  password, secretWord})
                
                admin.save()
                    .then(() => {
                        console.log("yes");
                        res.redirect("/admin")
                    
                    })
                    .catch(error =>{
                        req.session.signupError="Oups! Quelque chose d'imprévu s'est produit"
                        res.redirect("/admin/signup")

                    } );
            })
            .catch(error =>{
                req.session.signupError="Oups! Quelque chose d'imprévu s'est produit"
                res.redirect("/admin/signup")

            } );
        
        })
        .catch(error =>{
            req.session.signupError="Oups! Quelque chose d'imprévu s'est produit"
            res.redirect("/admin/signup")

        } );


};



module.exports.login=async(req, res, next)=>{



    console.log(req.body);
    if (req.body.username){
        Admin.findOne({
            username:req.body.username})
            .then(user=>{
                bcrypt.compare(req.body.password,user.password )

                    .then(valid=>{
                        if(valid){
                            bcrypt.compare(req.body.secretWord,user.secretWord)

                                .then(valid =>{
                                    if(valid){
                                        console.log("dfgh");
                                        delete req.session.isAuth
                                        const {username, name}=user
                                        req.session.isAuth=true
                                        req.session.user={username, name, _id:user._id}
                                        
                                        res.redirect("/admin")

                                        
                                    }else{
                                        req.session.loginError="username/Mot de passe ou mot secret d'administrateur incorrect"
                                        res.redirect('/admin/login')


                                    }

                                })
                                .catch(()=>{
                                    req.session.loginError="Oups! Quelque chose d'imprévu s'est produit"

                                    res.redirect('/admin/login')
                                })
                                

                            
                        }
                        else{
                            req.session.loginError="Username/Mot de passe ou mot secret d'administrateur incorrect"
                            res.redirect("/admin/login")
                        }


                    })
                    
                

                    .catch(err=> {
                        req.session.loginError="Oups! Quelque chose d'imprévu s'est produit! Veuillez reessayer."
                        res.redirect("/admin/login")


                    })
                  
            }).catch(err=> {
                req.session.loginError="Oups! Quelque chose d'imprévu s'est produit! Veuillez reessayer."
                res.redirect("/admin/login")
        
        
            })



    }else{
        req.session.loginError="Oups! Quelque chose d'imprévu s'est produit! Veuillez reessayer."
        res.redirect("/admin/login")

    }

}






module.exports.logout=(req, res)=>{
    req.session.destroy()
    return res.redirect("/admin/login")
}