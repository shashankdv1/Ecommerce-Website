const express = require("express");
const adminrouter = express.Router();
const adminModel = require("../models/Admin");
const{authMiddleware} =  require("../middlewears/index");
const {handleLogin,handleLogout,verifyToken} = require("../controllers/Admin");
adminrouter.post("/Adminlogin",handleLogin);
adminrouter.post("/logout", handleLogout);
adminrouter.get("/AddItems",authMiddleware,async(req,res)=>
    {
        try {
            const Admin = await adminModel.findById(req.user-details.userModelId);
            if (!Admin) {
                return res.status(404).json({ msg: "User not found" });
            }
            res.json({ name: Admin.username });
        } catch (error) {
            res.status(500).json({ msg: "Server error" });
        }
    });
adminrouter.get("/protected", verifyToken, (req, res) => {
    res.json({ success: true, msg: "You accessed a protected route!", user: req.user });
});

module.exports = adminrouter;