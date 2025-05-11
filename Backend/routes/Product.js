const express=require("express");
const productRouter=express.Router();
const { handleInsertion }=require("../controllers/Products");
productRouter.post("/AddItems",handleInsertion);

module.exports=productRouter;