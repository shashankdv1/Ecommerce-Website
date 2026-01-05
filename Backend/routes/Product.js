const express=require("express");
const productRouter=express.Router();
const multer = require("multer");
const upload = multer();
const { handleInsertion }=require("../controllers/Products");
const{searching}=require("../controllers/Search");
const {renderItems}=require("../controllers/Products");
const{getImage}=require("../controllers/Products");
const{deleteItems}=require("../controllers/Products");
const{handleTrendingProducts}=require("../controllers/Products");
productRouter.post("/AddItems",upload.single("image"),handleInsertion);
productRouter.get("/RenderItems",renderItems);
productRouter.post("/DeleteItems",deleteItems)
productRouter.get("/getImage/:Id",getImage);
productRouter.get("/trending",handleTrendingProducts);
productRouter.post("/searchItem", searching);

module.exports=productRouter;