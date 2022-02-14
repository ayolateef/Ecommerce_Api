const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number
                                                                             
        },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    isActive: {
      type: Boolean,
      defaultValue: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
