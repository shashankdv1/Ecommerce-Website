const express = require("express");
const vendorRouter = express.Router();
const{handleRegistration, handleLogin}=require('../controllers/Vendor');
vendorRouter.post("/Register",handleRegistration);
vendorRouter.post("/Login",handleLogin);
module.exports=vendorRouter;