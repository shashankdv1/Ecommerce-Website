const productModel = require("./models/Product");
async function handleInsertion(req,res)
{
    const existingproductModel = await userModel.findOne({Id });
    if(existingproductModel)
    {
       return  res.status(400).json({ msg: "productModel already exists"});
    }
}