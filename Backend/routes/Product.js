const express=require("express");
const productRouter=express.Router();
const multer = require("multer");
const upload = multer();
const { handleInsertion }=require("../controllers/Products");
productRouter.post("/AddItems",upload.single("Image"),handleInsertion);

module.exports=productRouter;