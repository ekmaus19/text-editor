const express = require('express');
const models = require('../models/models');

const User = models.User;

const app = express();

app.get('/current_user', (req, res) => {
  if (!req.user) {
    throw error;
  }
  res.send(req.user);
});
