const productModel = require("../models/Products");

const searching = async (req, res) => {
  const { searchText } = req.body;
  try {
    
    if (!searchText) {
      return res.status(400).json({
        success: false,
        msg: "Please enter an item name to search."
      });
    }

    const product = await productModel.findOne({ name: {$regex: new RegExp(`^${searchText}`, "i") } });
 
    if (!product) {
        
          return res.status(202).json({
        success: false,
        msg: "No Matching Items Found!"
      });
    }
    res.status(200).json({
        success: true,
        ItemName: product.name,
        msg: "Product was found successfully"
      
    })
  } catch (error) {
    console.error("Error searching product:", error);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { searching };
