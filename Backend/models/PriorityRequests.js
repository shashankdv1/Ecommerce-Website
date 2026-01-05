const mongoose = require("mongoose");

const priorityRequestSchema = new mongoose.Schema({
  priorityRequestId: {
    type: Number,
    required: true,
    unique: true
  },
  productName: {
    type: String,
    required: true
  },
  options: {
    type: String,
    required: true
  },
  request: {
    type: String,
    required: true
  },
  Price:{
    type:Number
  }
});

module.exports = mongoose.model("priorityRequest", priorityRequestSchema);
