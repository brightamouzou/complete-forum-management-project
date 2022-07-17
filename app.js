const express=require("express");
const mongoose=require("mongoose");
const session=require('express-session');
const MongoDBSession=require("connect-mongodb-session")(session)
const app=express();
const dotenv=require("dotenv");
const methodOverride=require("method-override")
const morgan=require("morgan");
const helmet=require("helmet");
const adminRoutesApi=require("./routes/adminApi");
const adminRoutesFront=require("./routes/adminFront");
const forumRoutes=require("./routes/forum");
const authRoutes=require("./routes/auth");
const commentsRoutes=require("./routes/comment")
const answersRoutes=require("./routes/answers")
const bodyParser=require('body-parser');
const Forum=require("./models/Forum");
const forumsGetting=require("./middleware/forumsGetting")
const commentsGetting=require("./middleware/commentsGetting")
const  Comment=require("./models/Comment");
const Answer = require("./models/Answer");

const testsRoutes=require("./routes/testRoute")
dotenv.config();
mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser:true ,useUnifiedTopology:true})
   .then(()=>console.log("Connected to MongoDB"))
    .catch((err)=>console.error(err))

app.use(express.json())

app.use(bodyParser.urlencoded({extended:false}))

app.use(morgan("dev"));

const storeSession=new MongoDBSession({
    uri:process.env.MONGO_DB_URI,
    collection:"mySessions"

})



app.set("view engine", "ejs")
app.use(methodOverride('_method'))

app.use(session({
    secret:"key that do sign it",
    resave:false,
    saveUninitialized:false,
    store:storeSession,
    cookie:{
        maxAge:1000*60*60*24,
        path:"/"
    }

}))


app.use("/forums", express.static("public"))



app.get("/",forumsGetting,(req, res)=>{

    const currentForum=req.session.forums[0]

    res.redirect("/forums/"+currentForum._id)

})



app.get("/forums/:id", forumsGetting, async (req, res)=>{
    try{
        const currentForum=await Forum.findOne({_id:req.params.id})

        const comments=await Comment.find({forumId:req.params.id})

        comments.reverse()

     
        res.render("index", {currentForum, comments})


    }catch(err){
        res.redirect("/notfound")
    }



})

app.use(express.static("public"));


app.use("/admin/forums", express.static("public"))
app.use("/admin", adminRoutesFront)
app.use("/admin", express.static('public'))

app.use("/admin/forums/:id", express.static("public"))



app.use("/api/comments",commentsRoutes)

app.use("/api/answers",answersRoutes)


app.use("/api/admin", adminRoutesApi);


app.use("/api/auth",authRoutes);

app.use("/api/forum",forumRoutes);



app.get("/forums%20all", forumsGetting,(req, res)=>{
    res.render("forums", {forums: req.session.forums})


})


app.get("/notfound", (req, res)=>{
    res.render("notFound")
})



app.use("/api/tests",testsRoutes);

app.get("*", (req, res) => {
  res.redirect("/notfound");
});
const port=process.env.PORT||5000


app.listen(port, ()=>console.log("Listenning on the "+ port));
