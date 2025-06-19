const vendorModel = require("../models/Vendor");
const VendorModel = require("../models/Vendor");
const OrganizationModel=require("../models/Organization");
const bcrypt = require("bcryptjs");
async function handleRegistration(req,res)
{
    const { Email,Mobile,OrganizationName,password} = req.body;
    if (!Email || !Mobile || !OrganizationName || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    const existingVendorModel = await VendorModel.findOne({Email });
    if (existingVendorModel) 
        {
            return res.status(400).json({ msg: "VendorModel already exists" });
        }

     
    const vendor=await VendorModel.findOne({}).sort({ VendorId: -1 });
    let VendorId = 1;
  if (typeof vendor?.VendorId !== "undefined") {
    VendorId = vendor.VendorId + 1;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newVendor = new VendorModel({
    VendorId,
    Email,
    Mobile,
    OrganizationName,
    password: hashedPassword,
  });
  await newVendor.save();
  res.json({ success: true, msg: "Vendor registered successfully" });
};

async function handleLogin(req,res)
{
  const{email,password}=req.body;
  try{
  const existingVendorModel=await vendorModel.findOne({Email: email});
  if(!existingVendorModel)
  {
    return res.status(400).json({msg:"Provided Email does not exists"})
  }
  const isMatch=  await bcrypt.compare(password,existingVendorModel.password);
  if(isMatch)
  {
    return res.status(200).json({success:true,msg:"You have successfully logged in",OrgName: existingVendorModel.OrganizationName});
  }
  return res.json(401).json({success:false,msg:"You entered an wrong password or email Please reenter your credentials"});
  }
  catch(error)
  {
    return res.status(500).json({msg:"Internal Server error"});
  }
}

async function OrganizationCode(req,res)
{

}

module.exports={handleRegistration,handleLogin};