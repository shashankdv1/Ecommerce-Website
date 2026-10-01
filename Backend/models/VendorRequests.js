const mongoose=require("mongoose");
const VendorRequestsSchema=new mongoose.Schema({
RequestId:{
    type:number,
    unique:true,
    required:true
},
Name:{
    type:String,
    required:true,

},
Price:{
    type:Number,
    required:true
},
Category:{
    type:String,
    required:true
},
OrganizationalCode:{
    type:Number,
    required:true
}
});
const vendorRequestsModel=mongoose.model("VendorRequests",VendorRequestsSchema);
module.exports=vendorRequestsModel;
