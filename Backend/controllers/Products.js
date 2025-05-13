const productModel = require("../models/Products")
async function handleInsertion(req,res)
{
    const existingproductModel = await userModel.findOne({Id });
    if(existingproductModel)
    {
       return  res.status(400).json({ msg: "productModel already exists"});
    }
    const newProductModel=new productModel({Id,Name,Price,Category,Dexcription,Image});
    newProductModel.save();
    res.json({success:true, msg: "productModel registered successfully" })
}
module.exports={handleInsertion};
