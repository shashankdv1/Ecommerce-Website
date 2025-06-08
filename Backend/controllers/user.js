const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userstatusModel=require("../models/userStatus");
async function handleLogin(req,res){
    const {username,Email,password } = req.body;
    const userDetail = await userModel.findOne({ 
        $or: [{ Email }, { username }]
    }); 
    const Id=userDetail.userId;
    const userstatus=await userstatusModel.findOne({userId:Id});
    if (!userDetail) return res.status(400).json({ msg: "user not found" });
    const isMatch = await bcrypt.compare(password, userDetail.password);
    if(userstatus?.status==="Disabled" && isMatch) return res.status(201).json({status:"Disabled",msg:"Account is disabled"});
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
  const status="Active";
const userStatus=new userstatusModel({
  userId,
  username,
  status
});
  await newUser.save();
  await userStatus.save();
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
const disableAccount = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userFound = await userModel.findOne({ username });
    const statusdetails=await userstatusModel.findOne({username});

    if (!userFound) {
      return res.status(404).json({
        success: false,
        msg: "User not found with the provided username.",
      });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: "Password mismatch. Please enter your correct account password.",
      });
    }

    statusdetails.status = "Disabled";
    await statusdetails.save();

    return res.status(200).json({
      success: true,
      msg: "The account has been successfully disabled.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: `Internal Server Error: ${error.message}`,
    });
  }
};
const enableAccount = async (req, res) => {
  const { Email } = req.body;
  try {
    const user = await userModel.findOne({ Email });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found with the provided Email.",
      });
    }

    const Id = user.userId;
    const statusDetails = await userstatusModel.findOne({ userId: Id });

    if (!statusDetails) {
      return res.status(404).json({
        success: false,
        msg: "User status not found.",
      });
    }

    if (statusDetails.status === "Disabled") {
      statusDetails.status = "Active";
      await statusDetails.save();
      return res.status(200).json({
        success: true,
        msg: "The account has been successfully enabled.",
      });
    } else {
      return res.status(200).json({
        success: true,
        msg: "The account is already active.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: `Internal Server Error: ${error.message}`,
    });
  }
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
    verifyToken,
    disableAccount,
    enableAccount
}
