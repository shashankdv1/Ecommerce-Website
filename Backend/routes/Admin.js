const express = require("express");
const adminrouter = express.Router();
const {handleLogin,handleLogout,verifyToken,getCustomercount} = require("../controllers/Admin");
adminrouter.post("/Adminlogin",handleLogin);
adminrouter.post("/logout", handleLogout);
adminrouter.get("/protected", verifyToken, (req, res) => {
    res.json({ success: true, msg: "You accessed a protected route!", user: req.user });
});
adminrouter.get("/CustomerCount",getCustomercount);
module.exports = adminrouter;