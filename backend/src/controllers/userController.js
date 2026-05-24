// controllers/userController.js
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/response');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');

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
    return successResponse(res, 200, 'Profile updated', { user });
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

    if (newPassword !== confirmPassword)
      return errorResponse(res, 400, 'Passwords do not match');

    if (newPassword.length < 8)
      return errorResponse(res, 400, 'Minimum 8 characters required');

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
      { business: { companyName, regNumber, vatNumber, address, country, city, postalCode } },
      { new: true }
    );

    if (!user) return errorResponse(res, 404, 'User not found');
    return successResponse(res, 200, 'Business info updated', { user });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// =====================
// UPDATE AVATAR
// =====================
const updateAvatar = async (req, res) => {
  try {
    if (!req.file) return errorResponse(res, 400, 'No file uploaded');

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: avatarUrl },
      { new: true }
    );

    return successResponse(res, 200, 'Avatar updated', { avatar: user.avatar });
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

    return successResponse(res, 200, 'Default updated', { paymentMethods: user.paymentMethods });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  updateProfile,
  updatePassword,
  updateBusiness,
  updateAvatar,
  addPaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
};