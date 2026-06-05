const express = require('express');
const router = express.Router();

const {
  signup,
  login,
  getUserByID,
  updateStatus,
 deleteUser,
 getUserbystatus
 
} = require('../controllers/authController');

const {protect} = require('../middleware/authMiddleware'); // your JWT middleware
const upload = require('../middleware/upload'); // for avatar upload

// ================= AUTH =================
router.post('/signup', signup);
router.post('/login', login);
router.post('/signup-with-avatar', upload.single('avatar'), signup);

router.delete('/users/:id', deleteUser);
// ================= PROFILE =================
router.get('/me/:id', protect, getUserByID);
// Me
router.get("/me", protect, async (req, res) => {
  res.status(200).json(req.user);
});
router.get('/users/status/:status', getUserbystatus);
router.patch('/users/:id', updateStatus);


module.exports = router;