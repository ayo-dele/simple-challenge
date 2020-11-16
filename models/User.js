const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {type: String, lowercase: true, index: true},
}, {timestamps: true});

const UserSchema = new mongoose.Schema({
  contact: ContactSchema,
  username: {type: String, lowercase: true, index: true},
  profilePictureUrl: String,
  id: String
}, {timestamps: true});

UserSchema.methods.toJSONObject = function(){
  return {
    username: this.username,
    profilePictureUrl: this.profilePictureUrl,
    updatedAt: this.updatedAt,
    id: this._id,
    contact: {
      firstName: this.contact.firstName,
      lastName: this.contact.lastName,
      email:  this.contact.email,
    },
  };
};

mongoose.model('User', UserSchema);
