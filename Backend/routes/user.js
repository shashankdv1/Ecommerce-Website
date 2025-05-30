const express = require("express");
const router = express.Router();
const {handleLogin,handleRegistration,handleLogout,verifyToken} = require("../controllers/user");
router.post("/register",handleRegistration);
router.post("/Login",handleLogin);
router.get("/logout", handleLogout);
router.get("/protected", verifyToken, (req, res) => {
    res.json({ success: true, msg: "You accessed a protected route!", user: req.user });
});

module.exports = router;