const VendorModel = require("../models/Vendor");
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

module.exports={handleRegistration}