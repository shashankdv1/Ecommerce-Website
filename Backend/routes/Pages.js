const express = require("express");
const Pagerouter = express.Router();
const{handleMobile}=require("../controllers/Pages");
Pagerouter.get("/Mobiles",handleMobile);
module.exports=Pagerouter;
