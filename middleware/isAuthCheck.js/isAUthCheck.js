
module.exports=isAuthCheck=(req, res, next)=>{
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/admin/login')
    }
}
