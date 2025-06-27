const express = require("express");
const vendorRouter = express.Router();
const{handleRegistration, handleLogin, WarehouseCode,warehouseDetails}=require('../controllers/Vendor');
vendorRouter.post("/Register",handleRegistration);
vendorRouter.post("/Login",handleLogin);
vendorRouter.post("/generateCode",WarehouseCode);
vendorRouter.post("/WarehouseDetails",warehouseDetails)
module.exports=vendorRouter;