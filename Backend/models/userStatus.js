const mongoose = require("mongoose");
const userstatusSchema=new mongoose.Schema({
userId:{
type:Number,
unique:true
},
username:{
    type:String,
    unique:true
},
status:{
    type:String,
    required:true
},
RegisteredOn: 
 { type: Date,
 default: Date.now },
  disabledOn:{
    type:Date
 },
 deletionInitiated:{
    type:Date
 },
 deletionCompleted:{
    type:Date
 }
});
const userstatusModel=mongoose.model("user-status-details",userstatusSchema);
module.exports=userstatusModel;