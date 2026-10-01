const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  Id: {
    type: Number,
    unique: true,
    required: true
  },
  UserId: {
    type: Number,
    required: true
  },
  ProductId: {
    type: Number,
    required: true,
  },
  ProductName: {
    type: String,
    required: true
  },
  OrderTotal: {
    type: Number,
    required: true
  },
  PaymentType: {
    type: String,
    required: true,
  },
  NetQuantity: {
    type: Number,
    required: true
  },
  TransactionOn: { 
    type: Date, 
    default: Date.now 
  }
});

// ✅ THE CRITICAL FIX: Pass "orders" as the 3rd argument to force Mongoose to target the correct collection
const OrderModel = mongoose.model("orders", orderSchema);

module.exports = OrderModel;
