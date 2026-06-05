const express = require('express');
const router = express.Router();
const { startConversation, sendMessage, getConversations, getMessages } = require('../controllers/messageController');
const { protect } = require("../middleware/authMiddleware");

router.post('/start', protect, startConversation);
router.post('/send', protect, sendMessage);
router.get('/conversations', protect, getConversations);
router.get('/:conversationId', protect, getMessages);

module.exports = router;