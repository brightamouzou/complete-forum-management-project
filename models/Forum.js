const mongoose=require("mongoose");
const uniqueValidator=require("mongoose-unique-validator");


const ForumSchema=mongoose.Schema({

    name:{type:String, required:true, unique:true},
    description:{type:String, required:true},
    image:{type:String},

    //If boolean question
    isBoolenQuestion:{type:Boolean, default:false},
    voteForNumber:{type:Number},
    voteAgainstNumber:{type:Number},
    voteNumber:{type:Number},



}, {
    timestamps:true
})

ForumSchema.plugin(uniqueValidator);

module.exports=mongoose.model("Forum", ForumSchema);