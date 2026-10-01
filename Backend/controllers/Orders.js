const orderModel = require("../models/Orders.js");
const userModel = require("../models/user");
const productModel = require("../models/Products");

/**
 * Handles inserting a new order into the database
 */
async function handleOrderInsertion(req, res) {
  const { Name, product, qty, productPrice } = req.body;
  try {
    let orderId = 1;
    
    // 1. Validate user existence
    const user = await userModel.findOne({ username: Name });
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    const userId = Number(user.userId || user.Id);
    if (isNaN(userId)) {
      return res.status(400).json({ success: false, msg: "User ID is missing or invalid Number format" });
    }

    // 2. Validate product existence
    const getProduct = await productModel.findOne({ name: product });
    if (!getProduct) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    const productId = Number(getProduct.Id);
    if (isNaN(productId)) {
      return res.status(400).json({ success: false, msg: "Product ID is missing or invalid Number format" });
    }

    // 3. Generate auto-incrementing Order ID
    const OrderIDCheck = await orderModel.findOne({}).sort({ Id: -1 });
    if (OrderIDCheck && typeof OrderIDCheck.Id !== "undefined") {
      orderId = Number(OrderIDCheck.Id) + 1;
    }

    // 4. Save new order
    const newCartProduct = new orderModel({
      Id: orderId,
      UserId: userId,
      ProductName: product,
      ProductId: productId,
      OrderTotal: Number(qty) * Number(productPrice),
      PaymentType: "UPI",
      NetQuantity: Number(qty)
    });

    await newCartProduct.save();
    return res.status(200).json({ success: true, msg: "Order placed successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Internal Server Error occurred" });
  }
}

/**
 * Displays all orders for a specific user, merging order metrics with product specifications
 */
async function handledisplayOrders(req, res) {
  try {
    const { Name } = req.body;
    const userCheck = await userModel.findOne({ username: Name });
    
    if (!userCheck) {
      return res.status(404).json({ success: false, msg: "User does not exist" });
    }


    // Extracting fields using your variations fallback
    const rawUserId = userCheck.Id || userCheck.userId || userCheck._id;
    const numericUserId = Number(rawUserId);

    // 2. Query orders from the collection
    const getOrderedProducts = await orderModel.find({ UserId: numericUserId }).lean();
    

    const RendercartItems = [];

    // 4. Build return array payload loop
    for (let i = 0; i < getOrderedProducts.length; i++) {
      const currentOrder = getOrderedProducts[i];
      const productDetails = await productModel.findOne({ name: currentOrder.ProductName }).lean();
      
      if (productDetails) {
        RendercartItems.push({
          ...productDetails,
          NetQuantity: currentOrder.NetQuantity,
          OrderTotal: currentOrder.OrderTotal,
          OrderId: currentOrder.Id
        });
      } else {
        RendercartItems.push({
          Id: currentOrder.ProductId,
          name: currentOrder.ProductName,
          price: currentOrder.OrderTotal / currentOrder.NetQuantity,
          NetQuantity: currentOrder.NetQuantity,
          OrderTotal: currentOrder.OrderTotal,
          OrderId: currentOrder.Id
        });
      }
    }

    return res.status(200).json({ success: true, orders: RendercartItems });

  } catch (err) {
    console.error("Display Orders Error: ", err.message);
    return res.status(500).json({ success: false, msg: "Internal Server Error occurred" });
  }
}




module.exports = { handleOrderInsertion, handledisplayOrders };
