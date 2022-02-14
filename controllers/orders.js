const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Order = require("../model/Orders");
const User = require("../model/Users");
const OrderDetail = require("../model/Order_Detail");
const Item = require("../model/Items");


const { validateOrder } = require("../validation/order");

/**
 * GET all orders
 */
exports.getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();

  return res.status(200).json({ success: true, data: orders });
});

/**
 * GET a single order
 */
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await OrderDetail.find({ orderId: req.params.id }).deepPopulate('order_details.itemId');
  if (!order) {
    return next(
      new ErrorResponse(`Order not found with id of ${req.params.id}`, 404)
    );
  }

  return res.status(200).json({ success: true, data: order });
});

/**
 * Post an order
 */
exports.createOrder = asyncHandler(async (req, res, next) => {
  //validate input
  const { error } = validateOrder(req.body);
  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

  const { userId, itemsId } = req.body;
  const ids = itemsId.map((item) => item.id);

  // Getting all selected items
  const items = await Item.find({ _id: ids });

  // getting totalPrice and summing item
  const totalPrice = items.reduce((a, b) => a + b.price, 0);

  // Creating an order
  const order = await Order.create({
    userId,
    total_price: totalPrice,
  }); 

  console.log('order created', order)

  // mapping order id to order details
  const mappedOrderDetail = itemsId.map((item) => ({
    orderId: order._id,
    itemId: item.id,
    quantity: item.qty
  }));

  console.log('mappedOrderDetail', mappedOrderDetail)


  const orderDetails = await OrderDetail.insertMany(mappedOrderDetail);

  return res.status(201).json({ success: true, data: orderDetails });
});

/**
 *PUT orders
 */
exports.updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!order) {
    return next(  
      new ErrorResponse(`Order not found with id of ${req.params.id}`, 404)
    );
  }
  return res.status(200).json({ success: true, data: order });
});
 
 exports.updatePaymentStatus = asyncHandler(async (req, res, next) => {
   const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body,  {
     new: true,
     runValidators: true
   })
    return res.status(200).json({ success: true, data: updatedOrder });
 });

exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  console.log("order found", order)
  // checking if user has paid
  if(order.payment_status === "unpaid") {
    return next( 
      new ErrorResponse(`ordered Item not been paid for`, 404) 
    );
  }
  // update order status to shipped
 const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body,  { 
     new: true,
     runValidators: true
   })

  /** deduct item shipped from inventory */ 
  // get the order details
  const orderDetails = await OrderDetail.find({ orderId: order._id });
  // 
  for (const detail of orderDetails) {
    await OrderDetail.updateOne(
      { _id: detail._id },
      { $set: { status: 'delivered' }}
    )
    await Item.updateOne(
      { _id: detail.itemId },
      { $inc: { quantity: -detail.quantity } } 
    )
  } 
   
  return res.status(200).json({success: true, data: updatedOrder })
})

/**
 * Update Detail orders
 */

 exports.updateDetailOrders = asyncHandler(async(req, res, next) => {
/**
 * add the item returned to inventory
 */
// Get the order details
const orderDetails = await OrderDetail.findOne({ _id: req.params.id });
if(!orderDetails){
  return next(
    new ErrorResponse(`orderdetail not found with is of ${req.params.id}`, 404))
}
// Add item returned to inventory
const item = await Item.findByIdAndUpdate(orderDetails.itemId,
  { $inc: { quantity: orderDetails.quantity }},
  {
    new: true,
    runValidators: true
  })

const updatedOrderDetail = await OrderDetail.findByIdAndUpdate(
  orderDetails._id,
  {$set: {status: 'returned'}},
  {
    new : true,
    runValidators: true
  })
return res.status(200).json({success: true, data: {item, updatedOrderDetail} })
})

/**
 *Delete orders
 */

exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    return next(
      new ErrorResponse(`User not found with is of ${req.params.id}`, 404)
    );
  }
  return res.status(200).json({ success: true, data: {} });
});

/**
 *Get orders by Users Id
 */

exports.getUserOrders = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`User not found with is of ${req.params.id}`, 404)
    );
  }
  // Find all orders of a particular user by its ID
  const orders = await Order.find({ userId: user._id });
  return res.status(200).json({ success: true, data: orders });
});
