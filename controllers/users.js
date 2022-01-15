const User = require("../model/Users");
const { validateUser } = require("../validation/user");

/**
 * GET all users
 */
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json({ success: true, data: users });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

/**
 * GET a single user
 */
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

/**
 * Post a user
 */
exports.createUser = async (req, res, next) => {
  try {
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
  console.log(user);
    return res.status(201).json({ success: true, data: user });


  } catch (err) {
    return res.status(400).json({ success: false, message: "" });
  }
};

/**
 *PUT users
 */
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

/**
 *Delete users
 */

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true, data: {} });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};
