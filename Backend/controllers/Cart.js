const CartModel=require("../models/Cart.js");
const userModel = require("../models/user");
const productModel=require("../models/Products");
async function handleCart(req,res)
{
   
    const{Name,product}=req.body;
  try{
     const productCheck=await CartModel.findOne({username:Name,productName:product});
     if(productCheck===null)
     {
        const newCartProduct=new CartModel({
                username:Name,
                productName:product
            });
            await newCartProduct.save(); 
            return res.status(200).json({success:true,msg:"Item successfully added to cart"});
     }
     else{
            return res.status(409).json({success:false,msg:"Item already present in  cart"});
     }   
  }  
catch(err)
{
     if (err.response?.status === 409) {
  } else {
  return res.status(500).json({success:false,msg:"Internal Server occured"});
  }

}
}

async function displayCart(req,res){
   try{
      const{Name}=req.body;
      const userCheck = await userModel.findOne({username:Name});
      if(userCheck!==null)
      {
         const getCartProducts = await CartModel.find({username:Name});
         const RendercartItems=[{}];
         if(getCartProducts!==null){
            for(let i = 0; i < getCartProducts.length; i++){
           RendercartItems.push(await  productModel.findOne({name:getCartProducts[i].productName}));
            }
         return res.status(200).json({success:true,cartProdcuts:RendercartItems});
         }
      }
      else{
          return res.status(409).json({success:false,msg:"User does not exist"});
      }
   }
   catch(err)
   {
 if (err.response?.status === 409) {
  } else {
  return res.status(500).json({success:false,msg:"Internal Server occured"});
  }
   }
}
module.exports={handleCart,displayCart};