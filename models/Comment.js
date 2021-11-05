const mongoose=require("mongoose");

const commentSchema=new mongoose.Schema({
    username:{type:String}, //Nom de celui qui commente
    forumId:{type:String, required:true},
    content:{type:String, max: 500, required:true},
    answers:{type:Array, default:[]},
    likes:{type:Number, default:0},
    dislikes:{type:Number, default:0},
    isAdmin:{type:Boolean, default:false}

    
}, {
    timestamps:true
})



module.exports=mongoose.model("Comment",commentSchema);