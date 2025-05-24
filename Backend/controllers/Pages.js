const productModel = require("../models/Products");
const handleMobile=async(req,res)=>{
try{
      const mobileModels = await productModel.find({ Category: "Mobile" });
    if (!mobileModels || mobileModels.length===0) {
       return res.json({ success: false, msg: "Product not found" });
    }
    res.json({ success: true, mobiles:mobileModels});

}
catch (error) {
     console.error("Error rendering Mobile Category items:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

module.exports={handleMobile};