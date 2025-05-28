const authMiddleware = (req,res,next)=>{
   if (req.session && req.session.username) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports =authMiddleware;