const express = require("express");
const Deliveryrouter = express.Router();
const {handleRegistration}=require("../controllers/Delivery");
Deliveryrouter.post("/PartnerRegister",handleRegistration);

module.exports=Deliveryrouter;