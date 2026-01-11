const mongoose = require("mongoose");

const cartSchema= new mongoose.Schema({
username:{
    type:String,
    required:true
},
productName:{
    type:String,
    required:true,
    unique:true
}
});

const CartModel=mongoose.model("userCart",cartSchema);
module.exports=CartModel;
