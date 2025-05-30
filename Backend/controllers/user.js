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
    const user=await userModel.findOne({}).sort({ userId: -1 });
     let userId = 1;

  if (typeof user?.userId !== "undefined") {
    userId = user.userId + 1;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    userId,
    username,
    number,
    Email,
    password: hashedPassword,
  });

  await newUser.save();
  res.json({ success: true, msg: "User registered successfully" });
};

const handleLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ msg: "Failed to logout" });
    }
    
    res.clearCookie("connect.sid", {
    httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: "/"   
    });

    return res.json({ success: true, msg: "Logged out" });
  });
};



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
