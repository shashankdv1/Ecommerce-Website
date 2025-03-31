const express = require("express");
const router = express.Router();
const adminModel = require("../models/Admin");
const{authMiddleware} =  require("../middlewears/index");
const {handleLogin,handleRegistration,handleLogout,verifyToken} = require("../controllers/Admin");
router.post("/register",handleRegistration);
router.post("/login",handleLogin);
router.post("/logout", handleLogout);
router.get("/Main",authMiddleware,async(req,res)=>
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
router.get("/protected", verifyToken, (req, res) => {
    res.json({ success: true, msg: "You accessed a protected route!", user: req.user });
});

module.exports = router;