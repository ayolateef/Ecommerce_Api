const Order = require("../model/Orders");
const { validateOrder } = require("../validation/order");

/**
 * GET all orders
 */
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    return res.status(200).json({ success: true, data: orders });
  } catch (err) {
   return res.status(400).json({ success: false, message: 'order not found'});
  }
};

/**
 * GET a single order
 */
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'order not found' });
    }
   return res.status(200).json({ success: true, data: order });
  } catch (err) {
   return  res.status(400).json({ success: false, message: 'order not found' });
  }
};

/**
 * Post an order
 */
exports.createOrder = async (req, res, next) => {
  try {
    //validate input
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send({ success: false, message: error.details[0].message });

    const { name_of_item, unit_price, quantity } = req.body;

    const order = await Order.create({
      name_of_item,
      unit_price,
      total_price: unit_price * quantity,
      quantity,
    });

   return res.status(201).json({ success: true, data: order });
  } catch (err) {
    return res.status(400).json({ success: false, message: err });
  }
};

/**
 *PUT orders
 */
exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return res.status(400).json({ success: false, message: 'order not found' });
    }
   return res.status(200).json({ success: true, data: order });
  } catch (err) {
    return res.status(400).json({ success: false, message: 'order not found' });
  }
};
/**
 *Delete orders
 */

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(400).json({ sucess: false, message: 'order not found' });
    }
   return  res.status(200).json({ success: true, data: {} });
  } catch (err) {
    return res.status(400).json({ success: true, data: {} });
  }
};