const mongoose = require("mongoose");
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const { Schema } = mongoose;


const OrderSchema = new mongoose.Schema(
  {
    total_price: {
      type: Number,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    payment_status: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

OrderSchema.plugin(deepPopulate)
module.exports = mongoose.model("Order", OrderSchema);

/**
 * 
 * ITEM SCEMA - 4
     - name
     - price
     - isActive

  
   
   ORDER DETAILS SCEMA- 2
   - itemId - 4 - bag
   - orderId - 1

    ORDER DETAILS SCEMA- 1
   - itemId - 4 - watc
   - orderId - 1
**/
