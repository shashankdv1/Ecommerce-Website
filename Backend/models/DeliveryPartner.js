const mongoose=require("mongoose");

const DeliveryPartnerSchema={
PartnerId:{
type:Number,
required:true,
unique:true
},
Email:{
    type:String,
    required:true,
    unique:true
},
Mobile:{
    type:String,
    required:true,
},
Region:{
    type:String,
    required:true
},
City:{
    type:String,
    required:true
},
State:{
    type:String,
    required:true
},
Job:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
}
};

const DeliveryPartnerModel=mongoose.model("Delivery-Partner",DeliveryPartnerSchema);

module.exports=DeliveryPartnerModel;