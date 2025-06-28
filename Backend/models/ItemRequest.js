const mongoose = require("mongoose");


const ItemRequestSchema=mongoose.Schema({
RequestId:{
    type:Number,
    required:true,
    unique:true
},
ProductName:{
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
OrganizationCode:{
    type:String,
     required:true,
},
ProductDescription:{
type:String,
 required:true
},
Image: {
  data: Buffer,
  contentType: String
},
});

const ItemRequestModel=mongoose.model("ItemRequests",ItemRequestSchema);

module.exports=ItemRequestModel;