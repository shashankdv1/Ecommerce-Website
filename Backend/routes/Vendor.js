const express = require("express");
const vendorRouter = express.Router();
const multer = require("multer");
const upload = multer();
const{handleRegistration, handleLogin, WarehouseCode,warehouseDetails,RequestManagement,handlePriorities}=require('../controllers/Vendor');
vendorRouter.post("/Register",handleRegistration);
vendorRouter.post("/Login",handleLogin);
vendorRouter.post("/generateCode",WarehouseCode);
vendorRouter.post("/WarehouseDetails",warehouseDetails)
vendorRouter.post("/RequestManagement",upload.single("image"),RequestManagement);
vendorRouter.post("/PriorityRequests",handlePriorities);
module.exports=vendorRouter;