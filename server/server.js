import http from 'http';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bodyParser from 'body-parser';

const models = require('./models/models');

const User = models.User;
var Document = models.Document;
const routes = require('./routes/routes');
const auth = require('./routes/auth');
const path = require('path');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const app = express();

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

mongoose.connection.on('connected', () => {
  console.log('connected to mongoDB');
});
mongoose.connect(process.env.MONGODB_URI);

app.use(session({
  secret: process.env.SECRET,
  name: 'googleDocClone',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  proxy: true,
  resave: true,
  saveUninitialized: true,
}));

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
// app.use('/', routes);

//DO NOT DELETE. Route for dashboard rendering(To be tested)
//Reminder: Be aware of async issue -> Make sure that Document.findById pushes all the docs before we return docArr
/*
app.get('/dashboard', function(req, res){
  var userId = req.user._id
    if (userId) {
        var docArr = []
        User.findById(userId, function(err, user) {
            var userDocuments = user.documents
            userDocuments.forEach(document => {
                Document.findById(document, function(err, documentObject) {
                docArr.push(documentObject)
                })
            })
        })
    } else {
    res.send('You are not logged in!')
    }
})
*/

app.post('/dashboard/create', function(req, res) {
  if(req.body.title.length > 0 && req.body.password.length > 0 && req.body.owner.length > 0) {
      var newDocument = new Document ({
        title: req.body.title,
        password: req.body.password,
        owner: req.body.owner,
        edited: new Date(),
        collaborators: []
      })
      newDocument.save(function(err, document) {
        if (err) {
          res.send(err)
        } else {
          console.log('User saved!')
            console.log(document)
            res.json({success: true})
        }
      })
  } else {
    res.status(500).send('Please, fill all the fields!')
  }
})




module.exports = app;

const server = http.createServer(app);
server.listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
