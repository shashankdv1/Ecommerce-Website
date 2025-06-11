const mongoose=require("mongoose");

const VendorSchema=new mongoose.Schema({
VendorId:{
    type:Number,
    unique:true
},
Email:{
    type:String,
    required:true,
    unique:true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
},
Mobile:{
    type:String,
    required:true,
    unique:true
},
OrganizationName:{
    type:String,
    required:true,
    unique:true,
},
password:{
     type:String,
    required:true
}
});

const vendorModel=mongoose.model("Vendor-details",VendorSchema);
module.exports=vendorModel