const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Item = require("../model/Items");
const { validateItem } = require("../validation/item");

/**
 * GET all Items
 */
exports.getItems = asyncHandler(async (req, res, next) => {
  
    const items = await Item.find({});

    return res.status(200).json({ success: true, data: items });
});
/**
 * GET a single Item
 */
exports.getItem = asyncHandler(async(req, res, next) => {
    const item = await Item.findById(req.params.id).populate({path: 'categoryId', select: 'name'});

    if (!item) {
      return  next(new ErrorResponse(`Item not found with id of ${req.params.id}`, 404));
    }

   return res.status(200).json({ success: true, data: item });
});

/**
 * Post an Item
 */
exports.createItem = asyncHandler(async (req, res, next) => {
    //validate input
    const { error } = validateItem(req.body);
    if (error) return next (new ErrorResponse(error.details[0].message, 400));

    const { name, price, quantity, categoryId } = req.body;
    // name, price and is_active
// creat a new item
    const item = await Item.create({
      name,
      price,
      quantity,
      categoryId
    });

   return res.status(201).json({ success: true, data: item});
});

/**
 *PUT orders
 */
exports.updateItem = asyncHandler(async (req, res, next) => {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body,{status: 'paid'}, {$set: {status: 'finished', 'payment.status': 'paid'}},{
      new: true,
      runValidators: true,
    });
    if (!item) {
      return  next(new ErrorResponse(`Item not found with id of ${req.params.id}`, 404));
    }
   return res.status(200).json({ success: true, data: item });
});
/**
 *Delete orders
 */

exports.deleteItem = asyncHandler(async (req, res, next) => {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return  next(new ErrorResponse(`Items not found with id of ${req.params.id}`, 404));
    }
   return  res.status(200).json({ success: true, data: {} });
});

// /**
//  *Get orders by Users Id
//  */

// exports.getOrders = asyncHandler(async (req, res, next) => {
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     return  next(new ErrorResponse(`User not found with is of ${req.params.id}`, 404));
//   } 
//   // Find all orders of a particular user by its ID
//   const orders = await Item.find({ userId: user._id });
//   return res.status(200).json({ success: true, data: orders });
// });