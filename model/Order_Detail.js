const mongoose = require('mongoose');
//  deepPopulate = require('mongoose-deep-populate')(mongoose);

const { Schema } = mongoose;

const OrderDetailSchema = new mongoose.Schema({   
     orderId: {
          type: Schema.Types.ObjectId,
          ref: 'Order',
          required: true
     },
     itemId:{
          type: Schema.Types.ObjectId,
          ref: 'Item',
          required: true
     },
     quantity: {
       type: Number,
       required: true   
     },
     status: {
          type: String,
          enum: ['pending', 'shipped', 'delivered', 'returned'],
          default: 'pending'
        }
     
},
 
 {timestamps: true});
 const deepPopulate = require('mongoose-deep-populate')(mongoose);
OrderDetailSchema.plugin(deepPopulate);

module.exports = mongoose.model('OrderDetail', OrderDetailSchema);



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
   - itemId - 5 - watc
   - orderId - 1
**/