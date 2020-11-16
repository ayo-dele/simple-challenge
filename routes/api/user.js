var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');

// Get all users
router.get('/', function(req, res, next){
  User.find().then(function(user){
    if(!user){ return res.sendStatus(401); }
    return res.json(user);
  }).catch(next);
});

//Get user by username
router.get('/:username', function(req, res, next){
  User.findOne({username: req.params.username}).then(function(user){
    if(!user){ return res.sendStatus(401); }
    return res.json(user);
  }).catch(next);
});

// Edit user by username
router.put('/:username', function(req, res, next){
  User.findOne({username: req.params.username}).then(function(user){
    if(!user){ return res.sendStatus(401); }

    if(typeof req.body.username !== 'undefined'){
      user.username = req.body.username;
    }
    if(typeof req.body.contact.email !== 'undefined'){
      user.contact.email = req.body.contact.email;
    }
    if(typeof req.body.contact.firstName !== 'undefined'){
      user.contact.firstName = req.body.contact.firstName;
    }
    if(typeof req.body.contact.lastName !== 'undefined'){
      user.contact.lastName = req.body.contact.lastName;
    }
    if(typeof req.body.profilePictureUrl !== 'undefined'){
      user.profilePictureUrl = req.body.profilePictureUrl;
    }

    return user.save().then(function(){
      return res.json(user.toJSONObject());
    });
  }).catch(next);
});

// Create new user
router.post('/', function(req, res, next){
  var user = new User();

  if(typeof req.body.username !== 'undefined'){
    user.username = req.body.username;
  }
  if(typeof req.body.profilePictureUrl !== 'undefined'){
    user.profilePictureUrl = req.body.profilePictureUrl;
  }
  user.contact = {};
  if(typeof req.body.contact.email !== 'undefined'){
    user.contact.email = req.body.contact.email;
  }
  if(typeof req.body.contact.firstName !== 'undefined'){
    user.contact.firstName = req.body.contact.firstName;
  }
  if(typeof req.body.contact.lastName !== 'undefined'){
    user.contact.lastName = req.body.contact.lastName;
  }

  user.save().then(function(){
    return res.json(user.toJSONObject());
  }).catch(next);
});

// Get User by username
router.delete('/:username', function(req, res, next) {
  User.findOneAndDelete({username: req.params.username}).then(function(){
    return res.sendStatus(204);
  }).catch(next);
});

module.exports = router;
