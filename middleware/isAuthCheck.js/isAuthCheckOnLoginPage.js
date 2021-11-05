module.exports=isAuthCheckOnLoginPage=(req, res, next)=>{
    console.log(req.session);
    if (req.session.isAuth){
        res.redirect('/admin')
    }else{
        next()
    }
}
