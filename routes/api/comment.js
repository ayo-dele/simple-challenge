var router = require('express').Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

//Get All Comments
router.get('/', function(req, res, next){
  Comment.find().then(function(comment){
    if(!comment){ return res.sendStatus(401); }
    return res.json(comment);
  }).catch(next);
});

//Comment by CommentId
router.get('/:id', function(req, res, next){
  Comment.findById(req.params.id).then(function(comment){
    if(!comment){ return res.sendStatus(401); }
    return res.json(comment);
  }).catch(next);
});

//All Comments by User by user Id
router.get('/user/:userId', function(req, res, next){
  const { userId } = req.params;

  User.findById(userId).then(function(user){
    if(!user){ return res.sendStatus(401); }

    Comment.find({userId: userId}).then(function(comment){
      if(!comment){ return res.sendStatus(401); }
      return res.json(comment);
    }).catch(next);

  }).catch(next);

});

//Update Comment by Comment ID
router.put('/:id', function(req, res, next){
  Comment.findById(req.params.id).then(function(comment){
    if(!comment){ return res.sendStatus(401); }

    if(typeof req.body.hashTags !== 'undefined'){
      comment.hashTags = req.body.hashTags;
    }
    if(typeof req.body.mentions !== 'undefined'){
      comment.mentions = req.body.mentions;
    }
    if(typeof req.body.id !== 'undefined'){
      comment.id = req.body.id;
    }
    if(typeof req.body.text !== 'undefined'){
      comment.text = req.body.text;
    }

    comment.save().then(function(){
      return res.json(comment.toJSONObject());
    }).catch(next);
  }).catch(next);
});

//Create new Comment
router.post('/', function(req, res, next){
  User.findById(req.body.userId).then(function(user){
    if(!user){ return res.sendStatus(401); }

    var comment = new Comment();

    comment.userId = user._id;

    if(typeof req.body.hashTags !== 'undefined'){
      comment.hashTags = req.body.hashTags;
    }
    if(typeof req.body.mentions !== 'undefined'){
      comment.mentions = req.body.mentions;
    }
    if(typeof req.body.id !== 'undefined'){
      comment.id = req.body.id;
    }
    if(typeof req.body.text !== 'undefined'){
      comment.text = req.body.text;
    }
    
    comment.save().then(function(){
      return res.json(comment.toJSONObject());
    }).catch(next);

  }).catch(next);
});

//Delete Comment by comment id
router.delete('/:id', function(req, res, next) {
  Comment.findByIdAndDelete(req.params.id).then(function(){
    return res.sendStatus(204);
  }).catch(next);
});

module.exports = router;
