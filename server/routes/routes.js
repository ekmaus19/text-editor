const express = require('express');
const models = require('../models/models');
var router = express.Router();

const User = models.User;
const Document = models.Document;
const app = express();

router.get('/current_user', (req, res) => {
  if (!req.user) {
    throw error;
  }
  res.send(req.user);
});

// create a new document
/*app.post('/doc/create', function (req, res) {
  new Document(req.body)
    .save()
    .then((doc) => res.json({
      id: doc._id,
      title: doc.title,
      owner: doc.owner}))
    });
*/

// Create a new doc
router.post('/dashboard/create', (req, res) => {
  console.log(req.user)
  console.log(req.body.title)
  console.log(req.body.password)
    if (req.body.title.length > 0 && req.body.password.length > 0) {
        var newDocument = new Document ({
            title: req.body.title,
            password: req.body.password,
            owner: req.user.username,
            edited: new Date(),
            collaborators: []
        })
        newDocument.save(function(err, document) {
            if (err) {
                res.send(err)
            } else {
                User.findById(req.user._id, (err, user) => {
                    if (err) {
                        res.status(404).json({error: 'User not found in database'})
                    } else {
                        user.documents.push(document._id)
                        user.save((err, user) => {
                          console.log('Document saved!')
                          res.json(document)
                        })

                    }
                })

            }
        })
    } else {
        res.status(400).send('Please, fill all the fields!')
    }
})

// Dashboard Route
// Loads all the documents associated with User
router.get('/dashboard', function(req, res){
    var userId = req.user._id
    if (userId) {
        var docArr = []
        User.findOne({_id: userId})
        .populate('documents')
        .exec(function(err, userObject) {
            if (err) {
                res.send('Could not find a document')
            } else {
              console.log(userObject);
                docArr = docArr.concat(userObject.documents)
            }
            res.json(docArr)
        })
    } else {
    res.send('You are not logged in!')
    }
})

// Document Route
// Loads the most recent version of individual document
router.get('/dashboard/:docId', function(req, res) {
    var docId = req.params.docId
    if(docId){
        Document.findOne({_id: docId}, function(err, docObject) {
            if(err) {
                res.send('Document does not exist')
            } else {
                res.json(docObject.history[-1])
            }
        })
    }
})


module.exports = router;
