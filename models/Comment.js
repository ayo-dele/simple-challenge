const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  hashTags: [String],
  mentions: [String],
  text: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {timestamps: true});

CommentSchema.methods.toJSONObject = function(){
  return {
    id: this._id,
    hashTags: this.hashTags,
    mentions: this.mentions,
	text: this.text,
	userId: this.userId
  };
};

mongoose.model('Comment', CommentSchema);
