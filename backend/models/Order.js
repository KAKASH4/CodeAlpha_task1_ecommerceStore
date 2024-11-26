const mongoose=require("mongoose");
const OrderSchema = new mongoose.Schema({
    items: [
      {
        product_id: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    total_price: Number,
    order_date: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model('Order', OrderSchema);
  