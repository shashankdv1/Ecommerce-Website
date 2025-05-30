const productModel = require("../models/Products");
const handleInsertion = async (req, res) => {
  try {
    const {Name, Price, Category, Description } = req.body;
  const product = await productModel.findOne({});
  let Id=0;
  if(typeof(product)==Number)
  {
    Id=product;
  }
    if(Id===0)
    {
      Id=1;
    }
    else if(Id>=1)
    {
    Id+=1;
    }
   const existingProduct = await productModel.findOne({ Name });
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
const renderItems=async(req,res) =>{
try {
    const dataProduct = await productModel.findOne({Id:1}); 
    //console.log(new Date(dataProduct.addedOn)+ (5.5 * 60 * 60 * 1000));
    if (!dataProduct) {
       return res.json({ success: false, msg: "Product not found"});
    }

    res.json({ success: true, name: dataProduct.Name,price:dataProduct.Price});
  } catch (error) {
     console.error("Error rendering items:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
const getImage = async (req, res) => {
  try {
    const dataProduct = await productModel.findOne({ Id: 1 });
    if (!dataProduct || !dataProduct.Image) {
      return res.status(404).send("Image not found");
    }

      res.set("Content-Type", dataProduct.Image.contentType || "image/png");
   res.status(200).send(dataProduct.Image.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports={handleInsertion,renderItems,getImage};
