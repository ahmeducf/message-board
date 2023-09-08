const express = require('express');
const Message = require('../models/message');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const messages = await Message.find().sort('-createdAt');
  res.render('index', { title: 'Message Board', messages });
});

router.get('/new', (req, res, next) => {
  res.render('form', { title: 'New Message', sender: '', text: '' });
});

function validateFormData(req, res, next) {
  const { sender, text } = req.body;
  let senderErr = '';
  let textErr = '';

  if (!sender) {
    senderErr = 'Name is required';
  } else if (sender.length < 2 || sender.length > 100) {
    senderErr = 'Name must be between 2 and 100 characters';
  }

  if (!text) {
    textErr = 'Message is required';
  } else if (text.length < 2 || text.length > 1000) {
    textErr = 'Message must be between 2 and 1000 characters';
  }

  if (senderErr || textErr) {
    res.render('form', {
      title: 'Error creating message',
      sender,
      text,
      senderErr,
      textErr,
    });
    return;
  }

  next();
}

router.post('/new', validateFormData, async (req, res, next) => {
  try {
    const { sender, text } = req.body;
    const message = new Message({ sender, text });
    await message.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
