const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
