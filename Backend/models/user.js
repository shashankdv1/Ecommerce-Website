const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
userId:{
type:Number,
unique:true
},
username:{
    type:String,
    unique:true
},
number:{
    type:String,
    unique:true,
    required:true
},
Email:{
    type:String,
    unique:true,
    required:true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
},
password:{
    type:String,
    required:true
},
});

const userModel=mongoose.model("user-details",userSchema);

module.exports=userModel;