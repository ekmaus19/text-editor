import React from 'react';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bodyParser from 'body-parser';
import './index';

const path = require('path');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const app = express();

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);

const User = mongoose.model('User', {
  username: String,
  password: String,
  docsowned: {
    type: mongoose.Schema.ObjectId,
    ref: 'Document',
  },
  docscollabed: {
    type: mongoose.Schema.ObjectId,
    ref: 'Document',
  },
});

const Document = mongoose.model('Document', {
  title: String,
  password: String,
  owner: String,
  // last edit/opened
  edited: String,
  collaborators: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

// Passport Serialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Passport Deserialize
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Passport Strategy
passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  },
));

app.use('/', (passport));

module.exports = app;


export default class App extends React.Component {
  render() {
    return (<div>
      <h2>Welcome to React!</h2>
    </div>);
  }
}
