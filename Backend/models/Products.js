const mongoose = require("mongoose");

const productsSchema=new mongoose.Schema({
Id:{
    type:Number,
    unique:true,
    required:true
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
Image:{
    type:Buffer,
    contentType:String
}
});

const productModel=mongoose.model("Products",productsSchema);

module.exports=productModel;