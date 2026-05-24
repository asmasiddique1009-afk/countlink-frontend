const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/response');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// =====================
// SIGNUP
// =====================
const signup = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json("Passwords do not match");
    }

    const allowedRoles = ["advertiser", "publisher"];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json("Invalid role");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json("Email already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const userCreated = await User.create({
      fullName,
      email,
      role,
      password: hashPassword,
    });
    res.status(200).json({ userCreated });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// =====================
// LOGIN
// =====================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Invalid credentials");
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id.toString(),
      userRole: user.role,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// =====================
// GET CURRENT USER
// =====================
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return errorResponse(res, 404, 'User not found');

    return successResponse(res, 200, 'User fetched successfully', { user });
  } catch (error) {
    return errorResponse(res, 500, 'Server error. Please try again.');
  }
};

// =====================
// UPDATE PERSONAL INFO
// =====================
const updateProfile = async (req, res) => {
  try {
    const { fullName, phone, phoneCode, timezone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { fullName, phone, phoneCode, timezone },
      { new: true, runValidators: true }
    );

    if (!user) return errorResponse(res, 404, 'User not found');

    return successResponse(res, 200, 'Profile updated successfully', { user });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// =====================
// UPDATE PASSWORD
// =====================
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return errorResponse(res, 400, 'New passwords do not match');
    }

    if (newPassword.length < 8) {
      return errorResponse(res, 400, 'Password must be at least 8 characters');
    }

    const user = await User.findById(req.user.id).select('+password');
    if (!user) return errorResponse(res, 404, 'User not found');

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return errorResponse(res, 400, 'Current password is incorrect');

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return successResponse(res, 200, 'Password updated successfully');
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// =====================
// UPDATE BUSINESS INFO
// =====================
const updateBusiness = async (req, res) => {
  try {
    const { companyName, regNumber, vatNumber, address, country, city, postalCode } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        business: { companyName, regNumber, vatNumber, address, country, city, postalCode }
      },
      { new: true }
    );

    if (!user) return errorResponse(res, 404, 'User not found');

    return successResponse(res, 200, 'Business info updated successfully', { user });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// =====================
// UPDATE AVATAR
// =====================
const updateAvatar = async (req, res) => {
  try {
    // req.file comes from multer middleware
    if (!req.file) return errorResponse(res, 400, 'No file uploaded');

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: avatarUrl },
      { new: true }
    );

    return successResponse(res, 200, 'Avatar updated successfully', { avatar: user.avatar });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// =====================
// ADD PAYMENT METHOD
// =====================
const addPaymentMethod = async (req, res) => {
  try {
    const { type, label, value, isDefault } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return errorResponse(res, 404, 'User not found');

    // Agar naya method default hai toh baaki sab ka default false karo
    if (isDefault) {
      user.paymentMethods.forEach(m => m.isDefault = false);
    }

    user.paymentMethods.push({ type, label, value, isDefault: isDefault || false });
    await user.save();

    return successResponse(res, 200, 'Payment method added', { paymentMethods: user.paymentMethods });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// =====================
// DELETE PAYMENT METHOD
// =====================
const deletePaymentMethod = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return errorResponse(res, 404, 'User not found');

    user.paymentMethods = user.paymentMethods.filter(
      m => m._id.toString() !== req.params.methodId
    );
    await user.save();

    return successResponse(res, 200, 'Payment method removed', { paymentMethods: user.paymentMethods });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// =====================
// SET DEFAULT PAYMENT METHOD
// =====================
const setDefaultPaymentMethod = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return errorResponse(res, 404, 'User not found');

    user.paymentMethods.forEach(m => {
      m.isDefault = m._id.toString() === req.params.methodId;
    });
    await user.save();

    return successResponse(res, 200, 'Default payment method updated', { paymentMethods: user.paymentMethods });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  signup,
  login,
  getMe,
  updateProfile,
  updatePassword,
  updateBusiness,
  updateAvatar,
  addPaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
};