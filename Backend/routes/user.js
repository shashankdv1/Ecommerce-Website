const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const{authMiddleware} =  require("../middlewears/index");
const {handleLogin,handleRegistration,handleLogout,verifyToken} = require("../controllers/user");
router.post("/register",handleRegistration);
router.post("/Login",handleLogin);
router.post("/logout", handleLogout);
router.get("/Main",authMiddleware,async(req,res)=>
    {
        try {
            const user = await userModel.findById(req.user-details.userModelId);
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
            res.json({ name: user.username });
        } catch (error) {
            res.status(500).json({ msg: "Server error" });
        }
    });
router.get("/protected", verifyToken, (req, res) => {
    res.json({ success: true, msg: "You accessed a protected route!", user: req.user });
});

module.exports = router;