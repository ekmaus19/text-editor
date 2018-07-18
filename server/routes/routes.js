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

// create a new document
app.post('/doc/create', function (req, res) {
  new Document(req.body)
    .save()
    .then((doc) => res.json({
      id: doc._id,
      title: doc.title,
      owner: doc.owner}))
    });

// get the ID of another document
app.post('/doc/:id', function (req, res) {
  Document.findOne(req.params.id, (err, doc) => {
    doc.collaborators.push(req.body.userid)
    doc.save()
      .then(() => res.json({"ok":true}))
      .catch((err) => res.json(err))
    }
  );
});
