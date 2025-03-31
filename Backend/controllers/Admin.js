const adminModel = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function handleLogin(req,res){
    const {username,Email,password } = req.body;
    const adminDetail = await adminModel.findOne({ 
        $or: [{ Email }, { username }]
    }); 
    if (!adminDetail) return res.status(400).json({ msg: "user not found" });
    const isMatch = await bcrypt.compare(password, adminDetail.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const token = jwt.sign({ adminModelId: adminModel._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie('token', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 3600 * 1000 
    });
    
    res.json({  success: true, token, msg: "successful",name:adminDetail.username });
};

async function handleRegistration(req,res)
{
    const { username, number,Email, password } = req.body;
    if (!Email || !username || !number || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    const existingadminModel = await adminModel.findOne({ Email });
    if (existingadminModel) return res.status(400).json({ msg: "userModel already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newadminModel = new adminModel({ username, number,Email, password: hashedPassword });
    await newadminModel.save();
    res.json({ msg: "userModel registered successfully" });
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

