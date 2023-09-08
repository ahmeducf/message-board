const express = require('express');
const Message = require('../models/message');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const messages = await Message.find().sort('-createdAt');
  res.render('index', { messages });
});

router.get('/new', (req, res, next) => { 
  res.render('form');
});

router.post('/new', async (req, res, next) => { 
  const { sender, text } = req.body;
  const message = new Message({ sender, text });
  await message.save();
  res.redirect('/');
});

module.exports = router;
