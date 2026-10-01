const bcrypt = require("bcryptjs");
const DeliveryPartnerModel=require("../models/DeliveryPartner");
const handleRegistration=async(req,res)=>
{
try{
const {Email,Mobile,Region,City,State,Job,password,confirmPass}=req.body;
 const hashedPassword = await bcrypt.hash(password, 10);
    if(password!==confirmPass)
    {
        return res.status(401).json({success:false,msg:"The Password does not match"});
    }

     const existingPartner=await DeliveryPartnerModel.findOne({Email});
     if(existingPartner) return res.status(400).json({success:false,msg:"The partner already exists"});
     const Partner=await DeliveryPartnerModel.findOne({}).sort( {PartnerId: -1});
     let PartnerId=1;
     if(typeof Partner?.PartnerId !== "undefined") PartnerId=Partner.PartnerId+1;

    const newPartner=new DeliveryPartnerModel({
        PartnerId,
        Email,
        Mobile,
        Region,
        City,
        State,
        Job,
        password:hashedPassword
    });
    await newPartner.save();
    return res.status(200).json({success:true,msg:"You are successfully registered as delivery partner"});
}
catch(error)
{
    return res.status(500).json({success:false,msg:error.message});
}

}
const handleLogin=async(req,res)=>{
    try{

    }
    catch(error)
    {

    }
}

module.exports={handleRegistration,handleLogin};