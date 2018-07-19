const mongoose = require('mongoose');

if (!process.env.MONGODB_URI) {
  console.log('Error: MONGODB_URI is not set. Did you run source env.sh ?');
  process.exit(1);
}

const connect = process.env.MONGODB_URI;
mongoose.connect(connect);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  documents: [{
    type: mongoose.Schema.ObjectId,
      ref: 'Document'
  }]
});

const docSchema = mongoose.Schema({
  title: String,
  password: String,
  owner: String,
  // last edit/opened
  edited: String,
  collaborators: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User',
  }],
   history: Array
});

const User = mongoose.model('User', userSchema);
const Document = mongoose.model('Document', docSchema);

module.exports = {
  User,
  Document,
};
