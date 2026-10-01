const mongoose = require("mongoose");

const orderSchema=new mongoose.Schema({
Id:{
    type:Number,
    unique:true,
    required:true
},
UserId:{
    type:Number,
    required:true
},
ProductId:{
    type:Number,
    required:true,
},
ProductName:{
    type:String,
    required:true
},
OrderTotal:{
    type:Number,
    required:true
},
PaymentType:{
    type:String,
    required:true,
},
NetQuantity:{
    type:Number,
    required:true
},
TransactionOn: 
 { type: Date, default: Date.now }
});

const OrderModel=mongoose.model("Orders_Added",orderSchema);

module.exports=OrderModel;