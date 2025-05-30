const mongoose = require("mongoose");

const productsSchema=new mongoose.Schema({
    Id:{
    type:Number,
    unique:true
},
Name:{
    type:String,
    required:true,
    unique:true
},
Price:{
    type:Number,
    required:true
},
Category:{
    type:String,
    required:true
},
Description:{
    type:String,
},
Image: {
  data: Buffer,
  contentType: String
},
 addedOn: 
 { type: Date, default: Date.now }
});

const productModel=mongoose.model("Products",productsSchema);

module.exports=productModel;