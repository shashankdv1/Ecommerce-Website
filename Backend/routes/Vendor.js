const express = require("express");
const vendorRouter = express.Router();
const{handleRegistration, handleLogin, OrganizationCode}=require('../controllers/Vendor');
vendorRouter.post("/Register",handleRegistration);
vendorRouter.post("/Login",handleLogin);
vendorRouter.post("/generateCode",OrganizationCode);
module.exports=vendorRouter;