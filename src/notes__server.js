const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const User = mongoose.model("User", {
  username: String,
  password: String,
});

const Document = mongoose.model("Document", {
  title: String,
  password: String,
  passwordCheck: String,
  owner: String,
  lastEdit: String,
  // last edit/opened
  collaborators: [{
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }],
});

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())

/// routes

////
// TEST!!!
////

app.post('/register', (req, res) => {

  new User ({
    username: req.body.username,
    password: req.body.password
  })
  .save()
  .then(res => res.json())
  .catch((err) => res.status(500).end(err.message))
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
      .then(() => res.json({"ok":true}));
      .catch((err) => res.json(err));
    }
  });
});
