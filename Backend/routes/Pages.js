const express = require("express");
const Pagerouter = express.Router();
const{handleMobile, handleElectronics, handleHomeItems, handleGroceries, handleAutoMobile, handleBooks, handleTrending,getProductStats}=require("../controllers/Pages");
Pagerouter.get("/Mobiles",handleMobile);
Pagerouter.get("/Electronics",handleElectronics);
Pagerouter.get("/HomeAppliances",handleHomeItems);
Pagerouter.get("/Groceries",handleGroceries);
Pagerouter.get("/AutoMobile",handleAutoMobile);
Pagerouter.get("/Books",handleBooks);
Pagerouter.get("/Trending",handleTrending);
Pagerouter.get("/Stats",getProductStats)
module.exports=Pagerouter;

