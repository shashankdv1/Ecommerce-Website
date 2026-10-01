const orderModel=require("../models/Orders.js");
const userModel = require("../models/user");
const productModel=require("../models/Products");

async function handleOrderInsertion(req, res) {
  const { Name, product, qty, productPrice } = req.body;

  try {
    let orderId = 1;

    // 1. Fetch user data safely (Adjust field name to 'name' or 'username' depending on your model)
    const user = await userModel.findOne({ username: Name }); 
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    
    // Force casting to Number to satisfy schema rules
    const userId = Number(user.userId || user.Id);
    if (isNaN(userId)) {
      return res.status(400).json({ success: false, msg: "User ID is missing or invalid Number format" });
    }

    // 2. Fetch product data safely
    const getProduct = await productModel.findOne({ name: product }); 
    if (!getProduct) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }
    
    // Force casting to Number to satisfy schema rules
    const productId = Number(getProduct.Id);
    if (isNaN(productId)) {
      return res.status(400).json({ success: false, msg: "Product ID is missing or invalid Number format" });
    }

    // 3. Calculate Sequential Order ID Safely
    const OrderIDCheck = await orderModel.findOne({}).sort({ Id: -1 }); 
    if (OrderIDCheck && typeof OrderIDCheck.Id !== "undefined") {
      orderId = Number(OrderIDCheck.Id) + 1;
    }

    // 4. Generate the Order Record
    const newCartProduct = new orderModel({
      Id: orderId,
      UserId: userId,
      ProductName: product,
      ProductId: productId,
      OrderTotal: Number(qty) * Number(productPrice),
      PaymentType: "UPI",
      NetQuantity: Number(qty)
      // 💡 TransactionOn is skipped here; Mongoose auto-applies Date.now() cleanly
    });

    await newCartProduct.save(); 
    return res.status(200).json({ success: true, msg: "Order placed successfully" });

  } catch (err) {
    console.error("Database Order Error Details:", err.message);
    return res.status(500).json({ success: false, msg: "Internal Server Error occurred" });
  }
}



// async function displayCart(req,res){
//    try{
//       const{Name}=req.body;
//       const userCheck = await userModel.findOne({username:Name});
//       if(userCheck!==null)
//       {
//          const getCartProducts = await orderModel.find({username:Name});
//          const RendercartItems=[{}];
//          if(getCartProducts!==null){
//             for(let i = 0; i < getCartProducts.length; i++){
//            RendercartItems.push(await  productModel.findOne({name:getCartProducts[i].productName}));
//             }
//          return res.status(200).json({success:true,cartProdcuts:RendercartItems});
//          }
//       }
//       else{
//           return res.status(409).json({success:false,msg:"User does not exist"});
//       }
//    }
//    catch(err)
//    {
//  if (err.response?.status === 409) {
//   } else {
//   return res.status(500).json({success:false,msg:"Internal Server occured"});
//   }
//    }
// }
module.exports={handleOrderInsertion};