const mongoose = require("mongoose");

const productsSchema=new mongoose.Schema({
    Id:{
    type:Number,
    unique:true
},
name:{
    type:String,
    required:true,
    unique:true
},
price:{
    type:Number,
    required:true
},
category:{
    type:String,
    required:true
},
description:{
    type:String,
},
image: {
  data: Buffer,
  contentType: String
},
code:{
    type:String,
    required:true
},
addedBy:{
    type:String,
    required:true
},
approvedByAdmin:{
    type:Boolean,
    required:true
},
 addedOn: 
 { type: Date, default: Date.now }
});

const productModel=mongoose.model("Products",productsSchema);

module.exports=productModel;