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
  const order = await Order.findById(req.params.id).deepPopulate('order_details.itemId');
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

  // Getting all selected items
  const items = await Item.find({ _id: itemsId });

  // getting totalPrice and summing item
  const totalPrice = items.reduce((a, b) => a + b.price, 0);

  // Creating an order
  const order = await Order.create({
    userId,
    total_price: totalPrice,
  });

  // mapping order id to order details
  const mappedOrderDetail = itemsId.map((item) => ({
    orderId: order._id,
    itemId: item,
  }));


  const orderDetails = await OrderDetail.insertMany(mappedOrderDetail);
  const newOrder = await Order.updateOne(
    { _id: order._id },
    {
      $push: {
        order_details: orderDetails.map((id) => id._id),
      },
    }
  );

  return res.status(201).json({ success: true, data: newOrder });
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
