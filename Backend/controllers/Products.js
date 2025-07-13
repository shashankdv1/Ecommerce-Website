require('dotenv').config();
const productModel = require("../models/Products");
const warehouseModel = require("../models/Warehouse"); 

const handleInsertion = async (req, res) => {
  try {
    const adminCode = process.env.ADMIN_CODE;
    const { name, price, category, description, code } = req.body;

    if (!name || !price || !category || !description || !code) {
      return res.status(400).json({ success: false, msg: "All fields are required" });
    }

    const warehouseCheck = await warehouseModel.findOne({ organizationCode: code });

    let addedBy = "admin";
    if (adminCode !== code) {
      if (!warehouseCheck) {
        return res.status(401).json({ success: false, msg: "The provided organization code is false" });
      }
      addedBy = "vendor";
      approvedByAdmin=false;
    }
    if(adminCode===code)
    {
      approvedByAdmin=true;
    }
    const lastProduct = await productModel.findOne({}).sort({ Id: -1 });
    let Id = lastProduct?.Id ? lastProduct.Id + 1 : 1;

  
    if(adminCode!==code){
    const existingProduct = await productModel.findOne({ name, code });
    if (existingProduct) {
      return res.status(409).json({ success: false, msg: "Product with this Name already exists for given region" });
    }
  }
  
    const image = req.file ? {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    } : null;

    const newProduct = new productModel({
      Id,
      name,
      price,
      category,
      description,
      image,
      code,
      addedBy,
      approvedByAdmin
    });

    await newProduct.save();

    return res.status(200).json({ success: true, msg: "Product inserted successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
const renderItems=async(req,res) =>{
try {
    const dataProduct = await productModel.find({approvedByAdmin:true}); 
    const dataLatest= await productModel.findOne({}).sort({Id:-1});
    dataLength=dataLatest?.Id;
    if (!dataProduct) {
       return res.json({ success: false, msg: "Product not found"});
    }
    res.json({ success: true,items:dataProduct,len:dataLength});
  } catch (error) {
     console.error("Error rendering items:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
const getImage = async (req, res) => {
  try {
    const dataProduct = await productModel.findOne({Id:1});
    //const ImageCount=await productModel.findOne({Id}).sort({Id:-1});
      if (!dataProduct || !dataProduct.image) {
      return res.status(404).send("Image not found");
    }

      res.set("Content-Type", dataProduct.image.contentType || "image/png");
   res.status(200).send(dataProduct.image.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
const deleteItems=async(req,res)=>{
try{
const { Id, name } = req.body;
const getProduct = await productModel.findOne({ Id, Name });
const productName=getProduct.name;
if(!getProduct) 
  {
    return res.status(400).json({msg:"Product Not found"});
  }
else{
  await productModel.deleteOne({ $or: [{ Id }, { name }]});
   res.json({  success: true, msg: "successful",name:productName });
}
}
catch(err)
{
  res.status(500).send("Server error");
}
}

module.exports={handleInsertion,renderItems,getImage,deleteItems};
