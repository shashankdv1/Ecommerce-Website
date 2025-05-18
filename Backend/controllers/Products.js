const productModel = require("../models/Products");
const handleInsertion = async (req, res) => {
  try {
    const { Id, Name, Price, Category, Description } = req.body;
   const existingProduct = await productModel.findOne({ Id });
     
    if (existingProduct) {
      return res.json({ success: false, msg: "Product with this ID already exists" });
    }
    const Image = req.file ? {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    } : null;
    const newProduct = new productModel({
      Id,
      Name,
      Price,
      Category,
      Description,
      Image,
    });

    await newProduct.save();
    res.status(200).json({ success: true});
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
module.exports={handleInsertion};
