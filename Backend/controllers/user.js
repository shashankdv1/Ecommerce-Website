const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function handleLogin(req,res){
    const {username,Email,password } = req.body;
    const userDetail = await userModel.findOne({ 
        $or: [{ Email }, { username }]
    }); 
    if (!userDetail) return res.status(400).json({ msg: "user not found" });
    const isMatch = await bcrypt.compare(password, userDetail.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
     req.session.username = userDetail.username;
    res.json({  success: true, msg: "successful",name:userDetail.username });
};

async function handleRegistration(req,res)
{
    const { username, number,Email, password } = req.body;
    if (!Email || !username || !number || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    const existinguserModel = await userModel.findOne({Email });
    if (existinguserModel) 
        {return res.status(400).json({ msg: "userModel already exists" });
}
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuserModel = new userModel({ username, number,Email, password: hashedPassword });
    await newuserModel.save();
    res.json({success:true, msg: "userModel registered successfully" });

};

async function handleLogout(req, res) {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.json({ success: true, msg: "Logged out successfully" });
}

function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
}

module.exports = {
    handleRegistration,
    handleLogin,
    handleLogout,
    verifyToken
}
