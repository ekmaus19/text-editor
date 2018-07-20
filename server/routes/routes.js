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
})*/

// Create for testing purposes in backend
/*
router.post('/dashboard/create', function(req, res) {
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
                res.json(document)
            }
        })
    } else {
        res.status(400).send('Please, fill all the fields!')
    }
})
*/


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


// Adding collaborators
// Adds collaborator ID to document collection
// Adds document ID to user collection
router.post('/dashboard/:docId/addCollaborator', function(req, res) {
    let docId = req.params.docId
    let collaborator;
    User.findOne({username: req.body.username})
        .exec()
        .then(function(collaborator1){
            collaborator = collaborator1
            if(collaborator === null) {
                res.status(400).send('Collaborator not found')
            } else {
                collaborator.documents.push(docId)
                collaborator.save()
                return Document.findById(docId).exec()
            }
        })
        .then(function(documentObject){
            if(documentObject === null) {
                res.status(400).send('Collaborator ID not found')
            } else {
                documentObject.collaborators.push(collaborator._id)
                return documentObject.save()
            }
        }).then(function(updatedDocumentObject){
            res.send(updatedDocumentObject)
    })
        .catch(function(err) {
            res.status(500).send('Database error', err)
        })
})



module.exports = router;
