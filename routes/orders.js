const express = require('express');
const router = express.Router()

 const {getOrders, getOrder, createOrder, updateOrder, deleteOrder,updatePaymentStatus,updateOrderStatus, updateDetailOrders} = require('../controllers/orders')

 router.route('/').get(getOrders).post(createOrder);
 router.route('/:id').get(getOrder).delete(deleteOrder);
 router.route('/:id').get(getOrder).delete(deleteOrder);
 router.route('/:id').get(updateOrder);
 router.put('/payments/:id', updatePaymentStatus); 
 router.put('/status/:id', updateOrderStatus);
 router.put('/detailOrders/:id', updateDetailOrders);

module.exports = router;