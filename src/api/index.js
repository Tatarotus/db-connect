const express = require('express');
const mongoose = require('mongoose');
const Users = require('../models/users');

const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lhovv.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
  });

const router = express.Router();
router.get('/users', async (req, res, next) => {
  try {
    const response = await Users.find();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/users', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const newUser = new Users({
      name,
      email,
    });
    newUser.save();
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

router.get('/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
