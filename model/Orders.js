const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
     name_of_item: {
          type:String,
          required: [true, 'Please add the name of item']
     },  
     unit_price: {
               type: Number,
               required: [true, 'Please add the price'],
     },
     quantity: {
               type: Number,
               required: [true, 'Please add the quantity needed']
     },   
     total_price: {
          type: Number
     },

}, {timestamps: true});


module.exports = mongoose.model('Order', OrderSchema);