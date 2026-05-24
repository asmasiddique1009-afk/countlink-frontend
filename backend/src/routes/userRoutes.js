// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const {
  updateProfile,
  updatePassword,
  updateBusiness,
  updateAvatar,
  addPaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
} = require('../controllers/userController');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/avatars/'),
  filename: (req, file, cb) => cb(null, `${req.user.id}-${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.put('/profile',                              protect, updateProfile);
router.put('/password',                             protect, updatePassword);
router.put('/business',                             protect, updateBusiness);
router.post('/avatar',                              protect, upload.single('avatar'), updateAvatar);
router.post('/payment-methods',                     protect, addPaymentMethod);
router.delete('/payment-methods/:methodId',         protect, deletePaymentMethod);
router.patch('/payment-methods/:methodId/default',  protect, setDefaultPaymentMethod);

module.exports = router;