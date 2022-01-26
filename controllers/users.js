const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async')
const User = require("../model/Users");
const Order = require("../model/Orders");
const { validateUser } = require("../validation/user");

/**
 * GET all users
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

    return res.status(200).json({ success: true, data: users });
});

/**
 * GET a single user
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  
    const user = await User.findById(req.params.id).populate('users');
    if (!user) {
      return  next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    return res.status(200).json({ success: true, data: user });
});

/**
 * Post a user
 */
exports.createUser = asyncHandler(async (req, res, next) => {
    //validate input
   
    const { error } = validateUser(req.body);
  
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });
     
    
    const { first_name, last_name, email, password } = req.body;

    const user = await User.create({
      first_name,
      last_name,
      email,
      password
    });
  
    return res.status(201).json({ success: true, data: user });

});

/**
 *PUT users
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return  next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }
    return res.status(200).json({ success: true, data: user });
});

/**
 *Delete users
 */

exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return  next(new ErrorResponse(`User not found with is of ${req.params.id}`, 404));
    }
    return res.status(200).json({ success: true, data: {} });
});

/**
* Get orders by user's Id
 */
exports.getOrders = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return  next(new ErrorResponse(`User not found with is of ${req.params.id}`, 404));
  } 
  // Find all orders of a particular user by its ID
  const orders = await Order.find({ userId: user._id });
  return res.status(200).json({ success: true, data: orders });
});
