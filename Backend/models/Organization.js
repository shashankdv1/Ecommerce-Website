const mongoose=require("mongoose");

const OrganizationSchema=new mongoose.Schema({
 Id:{
    type:Number,
    unique:true,
    required:true
 },
 City:{
    type:String,
    required:true
 },
 WarehouseName:{
    type:String,
    required:true
 },
 State:{
    type:String,
    required:true
 }

});

const orgModel=mongoose.model("OrganizationalDetails",OrganizationSchema);

module.exports=orgModel;