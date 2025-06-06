const productModel = require("../models/Products");
const handleMobile=async(req,res)=>{
try{
      const mobileModels = await productModel.find({ Category: "Mobile" });
    if (!mobileModels || mobileModels.length===0) {
       return res.json({ success: false, msg: "Product not found" });
    }
    res.json({ success: true, mobiles:mobileModels});

}
catch (error) {
     console.error("Error rendering Mobile Category items:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
const handleElectronics=async(req,res)=>{
try{
      const electronicModels = await productModel.find({ Category: "Electronics" });
    if (!electronicModels || electronicModels.length===0) {
       return res.json({ success: false, msg: "Product not found" });
    }
    res.json({ success: true, eItems:electronicModels});

}
catch (error) {
     console.error("Error rendering Electronics Category items:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
const handleHomeItems=async(req,res)=>{
try{
      const homeModels = await productModel.find({ Category: "Appliances" });
    if (!homeModels || homeModels.length===0) {
       return res.json({ success: false, msg: "Product not found" });
    }
    res.json({ success: true, homeItems:homeModels});

}
catch (error) {
     console.error("Error rendering Home Category items:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
const handleGroceries=async(req,res)=>{
try{
      const GroceryModels = await productModel.find({ Category: "Groceries" });
    if (!GroceryModels || GroceryModels.length===0) {
       return res.json({ success: false, msg: "Product not found" });
    }
    res.json({ success: true, GroceryItems:GroceryModels});

}
catch (error) {
     console.error("Error rendering Grocery Category items:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
const handleBooks=async(req,res)=>{
try{
      const BooksModels = await productModel.find({ Category: "Books" });
    if (!BooksModels || BooksModels.length===0) {
       return res.json({ success: false, msg: "Product not found" });
    }
    res.json({ success: true, BookItems:BooksModels});

}
catch (error) {
     console.error("Error rendering Books Category items:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
const handleAutoMobile=async(req,res)=>{
try{
      const autoMobileModels = await productModel.find({ Category: "AutoMobile" });
    if (!autoMobileModels || autoMobileModels.length===0) {
       return res.json({ success: false, msg: "Product not found" });
    }
    res.json({ success: true, AutoMobileItems:autoMobileModels});

}
catch (error) {
     console.error("Error rendering AutoMobile Category items:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
const handleTrending=async(req,res)=>{
try{
    const year = 2025; 
const start = new Date(Date.UTC(year, 4, 1)); 
const end = new Date(Date.UTC(year, 6, 1));
      const trendingModels = await productModel.find({
  addedOn: { $gte: start, $lt: end }
});
    if (!trendingModels || trendingModels.length===0) {
       return res.json({ success: false, msg: "Trending Products not found" });
    }
    res.json({ success: true, trend:trendingModels});

}
catch (error) {
     console.error("Error rendering AutoMobile Category items:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
const getProductStats=async(req,res)=>{
    
    try{
      const MblCount=await productModel.countDocuments({Category:"Mobile"});
    const ElectronicsCount = await productModel.countDocuments({Category:"Electronics"});
    const GroceryCount = await productModel.countDocuments({Category:"Groceries"});
    const HomeItemsCount = await productModel.countDocuments({Category:"Appliances"});
    const BooksCount = await productModel.countDocuments({Category:"Books"});
    const AutoMobileCount = await productModel.countDocuments({Category:"AutoMobile"});
        return res.status(200).json({success:true,MobileCount:MblCount,ElecCount:ElectronicsCount,GroceryCnt:GroceryCount,HomeItemsCnt:HomeItemsCount,BooksCnt:BooksCount,AutoCnt:AutoMobileCount});
    }

    catch(error)
    {
        res.status(500).json({msg:"Internal Server error"});
    }
};
module.exports={handleMobile,handleElectronics,handleHomeItems,handleGroceries,handleBooks,handleAutoMobile,handleTrending,getProductStats};