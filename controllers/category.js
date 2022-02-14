const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { validateCategory } = require("../validation/category");
const Category = require("../model/Category");
const Items = require("../model/Items");

/**
 * GET all Category
 */
exports.getCategorys = asyncHandler(async (req, res, next) => {
  const categorys = await Category.find();

  return res.status(200).json({ success: true, data: categorys });
});
/**
 * GET a Category
 */
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(
      new ErrorResponse(`Item not found with id of ${req.params.id}`, 404)
    );
  }

  return res.status(200).json({ success: true, data: category });
});

/**
 * Post a Category
 */
exports.createCategory = asyncHandler(async (req, res, next) => {
  //validate input
  const { error } = validateCategory(req.body);
  if (error) return next(new ErrorResponse(error.details[0].message, 400));

  const { name, description } = req.body;

  const category = await Category.create({
    name,
    description,
  });

  return res.status(201).json({ success: true, data: category });
});

/**
 *PUT orders
 */
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    return next(
      new ErrorResponse(`Item not found with id of ${req.params.id}`, 404)
    );
  }
  return res.status(200).json({ success: true, data: category });
});
