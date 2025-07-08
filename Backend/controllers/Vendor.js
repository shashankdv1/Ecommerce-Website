const vendorModel = require("../models/Vendor");
const VendorModel = require("../models/Vendor");
const bcrypt = require("bcryptjs");
const WarehouseModel=require("../models/Warehouse");
const ItemRequestModel=require("../models/ItemRequest");
const priorityRequestModel=require("../models/PriorityRequests.js");
const productModel=require("../models/Products.js");
async function WarehouseCode(req,res)
{
  try{
  const{city,warehouseName,state}=req.body;
  if(!city ||!warehouseName ||!state)
  {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const existingWarehouseModel=await WarehouseModel.findOne({warehouseName});
  if(existingWarehouseModel)
  {
     return res.status(400).json({ msg: "Warehouse already exists" });
  }
  const warehouse=await WarehouseModel.findOne({}).sort({ warehouseId: -1 });
    let warehouseId = 1;
  if (typeof warehouse?.warehouseId !== "undefined") {
    warehouseId = warehouse.warehouseId + 1;
  }
  const code = {
      "Andhra Pradesh": 123,
      "Arunachal Pradesh": 201,
      "Assam": 204,
      "Bihar": 205,
      "Chhatisgarh": 301,
      "Goa": 221,
      "Haryana": 333, 
      "Himachal Pradesh": 222, 
      "Jharkhand": 224,        
      "Karnataka": 167,
      "Kerala": 401,
      "Madhya Pradesh": 111,
      "Maharastra": 264,
      "Manipur": 222,
      "Meghalaya": 64,
      "Mizoram": 65,
      "Nagaland": 63,
      "Odisha": 336,
      "Punjab": 777,
      "Rajasthan": 100,
      "Sikkim": 260,
      "Tamil Nadu": 444,
      "Telegana": 101,
      "Tripura": 233,
      "Uttar Pradesh": 451,
      "Uttarakhand": 29,
      "West Bengal": 12
    };
  let codeValue=code[state];
  const organizationCode=`${codeValue}-${warehouseId}`;
  const newWarehouse=new WarehouseModel({
    city,
    warehouseName,
    state,
    warehouseId,
    organizationCode
  });
  await newWarehouse.save();
  res.json({success: true, msg: "Warehouse registered successfully"});
}
catch(error)
{
  return res.status(500).json("Internal Server error Occured");
}

}
async function handleRegistration(req,res)
{
  try{
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
}
catch(error)
{
  return res.status(500).json("Internal Server error Occured");
}
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

async function warehouseDetails(req,res)
{
  try{
    const existingWarehouse = await WarehouseModel.find({});
    const warehouseLatest= await WarehouseModel.findOne({}).sort({Id:-1});
     dataLength=warehouseLatest?.Id;
  if (!existingWarehouse) {
       return res.status(401).json({ success: false, msg: "Product not found"});
    }
    res.status(200).json({ success: true,items:existingWarehouse,len:dataLength});
  } catch (error) {
     console.error("Error rendering items:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
}

async function RequestManagement(req,res)
{
  const {ProductName,Price,Category,OrganizationCode,ProductDescription,Image}= req.body;   

  const OrgCheck = await WarehouseModel.findOne({organizationCode:OrganizationCode});
  if(!OrgCheck)
  {
    return res.status(400).json({success: false, msg: "Organization  code you entered is invalid"});
    
  }
  try{
    const latest = await ItemRequestModel.findOne({}).sort({RequestId:-1});
    let RequestId=1;
 if(typeof latest?.RequestId !== "undefined")
  {
    Id=latest.RequestId+1;
  }
  const existingRequest = await ItemRequestModel.findOne({ProductName});
   if (existingRequest) {
      return res.status(400).json({ success: false, msg: "Request with this Productname already exists" });
    }
      const Image = req.file ? {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        } : null;
        const newRequest = new ItemRequestModel({
          RequestId,
          ProductName,
          Price,
          Category,
         OrganizationCode,
          ProductDescription,
          Image,
        });
        await newRequest.save();
          res.status(200).json({ success: true});
  }
  catch(error)
  {
     console.error(error);
    res.status(500).json({ success: false, msg: "Internal server error" });

  }
}
async function handlePriorities(req, res) {
  const { ProductName, Options, request } = req.body;

  try {
    const itemCheck = await productModel.findOne({
      name: { $regex: new RegExp(`^${ProductName}$`, "i") }
    });

    if (!itemCheck &&(Options==="PriceChange" || Options==="DeleteItem")) {
      return res.status(400).json({
        success: false,
        msg: "Item does not exist. Cannot perform request."
      });
    }
    
    // Get latest priorityRequestId
    const latest = await priorityRequestModel.findOne().sort({ priorityRequestId: -1 });

    let priorityRequestId = 1;
    if (latest && latest.priorityRequestId) {
      priorityRequestId = latest.priorityRequestId + 1;
    }

    // Prepare and save new request
    const newPriorityRequest = new priorityRequestModel({
      priorityRequestId,
      productName: ProductName,
      options: Options,
      request
    });

    console.log("📝 Saving new priority request:", newPriorityRequest);

    await newPriorityRequest.save();

    return res.status(200).json({
      success: true,
      msg: "Your request is successfully queued to be reviewed"
    });

  } catch (error) {
    console.error("🔥 Internal Server Error:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error"
    });
  }
}


module.exports={handleRegistration,handleLogin,WarehouseCode,warehouseDetails,RequestManagement,handlePriorities};