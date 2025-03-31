const mongoose = require("mongoose");

const adminSchema=new mongoose.Schema({
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

const adminModel=mongoose.model("admin-details",adminSchema);

module.exports=adminModel;