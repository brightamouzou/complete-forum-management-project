const mongoose=require("mongoose");
const uniqueValidator=require("mongoose-unique-validator");

const adminSchema=mongoose.Schema({
    name:{type:String, minLength:3},
    username:{type:String, minLength:3, unique:true},
    password:{type:String, minLength:4 },
    secretWord:{type:String, minLength:4},
    img:{type:String},
    isAdmin:{type:Boolean, default:false}

})

adminSchema.plugin(uniqueValidator);


module.exports=mongoose.model("Admin",adminSchema);