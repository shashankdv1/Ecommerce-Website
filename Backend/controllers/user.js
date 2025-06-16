const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cron = require("node-cron");
const userstatusModel=require("../models/userStatus");
let timeoutId=0;
async function handleLogin(req,res){
    const {username,Email,password } = req.body;
    try{
    const userDetail = await userModel.findOne({ 
        $or: [{ Email }, { username }]
    }); 
    if (!userDetail) return res.status(400).json({ msg: "user not found" });
     const Id=userDetail?.userId;
    const userstatus=await userstatusModel.findOne({userId:Id});
    const isMatch = await bcrypt.compare(password, userDetail.password);
    if(userstatus?.status==="Disabled" && isMatch) return res.status(201).json({status:"Disabled",msg:"Account is disabled"});
    if(userstatus.deletionInitiated === true || userstatus.deletionCompleted === true) return res.status(201).json({status:"Archived",msg:"Account is scheduled for deletion"});
      if(userstatus?.status==="deleted") return res.status(401).json({status:"Deleted",msg:"your Account is deleted"});
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
     req.session.username = userDetail.username;
    res.json({  success: true, msg: "successful",name:userDetail.username,status:"Active" });
  }
  catch(error){
    return res.json({success:false,msg:"Internal Server error occured"});
  }
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
   const time = new Date(); 
    statusdetails.status = "Disabled";
    statusdetails.disabledOn=time;
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
const deleteAccount = async (req, res) => {
  const { username, password } = req.body;
  console.log("Request Body:", req.body);

  try {
    const userFound = await userModel.findOne({ username });
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

    const Id = userFound.userId;
    const statusDoc = await userstatusModel.findOne({ userId: Id });

    if (!statusDoc) {
      return res.status(404).json({ success: false, msg: "Status document not found." });
    }

    if (statusDoc.status === "Disabled") {
      return res.status(201).json({
        status: "disabled",
        note: "Please first enable your account to delete it.",
      });
    }

    if (statusDoc.status === "Active") {
      const TEN_DAYS = 10 * 24 * 60 * 60 * 1000; 
      const today = new Date();
      const targetDate = new Date(today.getTime() + TEN_DAYS);

      statusDoc.deletionInitiated = today;
      statusDoc.deletionCompleted = targetDate;
      await statusDoc.save();

      console.log(`Scheduled deletion at: ${targetDate}`);

    timeoutId= setTimeout(async () => {
        await statusDoc.updateOne(
          { userId: Id },
          { $set: { status: "deleted" } }
        );
      }, TEN_DAYS);

      return res.status(200).json({
        success: true,
        msg: "Account will be deleted after 10 days.",
      });
    }
  } catch (error) {
    console.error("Delete account error:", error);
    return res.status(500).json({ success: false, msg: error.message });
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
    const statusDetails = await userstatusModel.findOne({ Id });

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

async function activateAccount(req,res)
{
  const {Email}=req.body;
  const userFound = await userModel.findOne({Email});
  const Id=userFound.userId;
  try{
    const statusDoc=await userstatusModel.findOne({ userId: Id });
    if(statusDoc?.deletionCompleted!==null)
    {
   (timeoutId==0)?timeoutId=0:clearTimeout(timeoutId);
   const setter = { userId:Id };

  await userstatusModel.updateOne(setter, { $unset: { deletionInitiated: "",deletionCompleted:"" } });
     statusDoc.status="Active";
     await statusDoc.save();
   res.status(200).json({success:true,msg:"Account activatation was successful"});
    }
  }
  catch(error)
  {
    return res.status(500).json({
       success: false,
      msg: `Internal Server Error: ${error.message}`,
    })
  }
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
    verifyToken,
    disableAccount,
    enableAccount,
    deleteAccount,
    activateAccount
}
