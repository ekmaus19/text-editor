import http from 'http';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bodyParser from 'body-parser';
import socketIO from 'socket.io'
//import {auth} from './socket-api'
import {document} from './socket-api/document.js'

const models = require('./models/models');

const User = models.User;
const Document = models.Document;
const routes = require('./routes/routes');
const auth = require('./routes/auth');
const path = require('path');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const app = express();
const server = http.Server(app)
const io = socketIO(server)

app.use(session({
  secret: process.env.SECRET,
  name: 'googleDocClone',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  proxy: true,
  resave: true,
  saveUninitialized: true,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

mongoose.connection.on('connected', () => {
  console.log('connected to mongoDB');
});
mongoose.connect(process.env.MONGODB_URI);


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
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  },
));

app.use('/', auth(passport));
app.use('/', routes);


//io.on('documentChange'm )


module.exports = app;

//const server = http.createServer(app);
server.listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
