const express = require("express");
const vendorRouter = express.Router();
const{handleRegistration, handleLogin, WarehouseCode}=require('../controllers/Vendor');
vendorRouter.post("/Register",handleRegistration);
vendorRouter.post("/Login",handleLogin);
vendorRouter.post("/generateCode",WarehouseCode);
module.exports=vendorRouter;