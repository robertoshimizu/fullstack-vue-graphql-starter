// Module to connect to MongoDB
const mongoose = require("mongoose");

// Module that creates a MD5 hash from a string
const md5 = require("md5");

// Module that encript a string, in our case the password
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true // remove whitespaces before and after
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Post"
  }
});

// We need to add an avatar to the avatar field We use gravatar
// An avatar is an image that represents YOU online - a little picture that appears next to your name when you interact with websites.
// A Gravatar is a Globally Recognized Avatar. You upload it and create your profile just once, and then when you participate in any
// Gravatar-enabled site, your Gravatar image will automatically follow you there.
// All URLs on Gravatar are based on the use of the hashed value of an email address.
// Images and profiles are both accessed via the hash of an email, and it is considered the primary way of identifying an identity within the system.
// In our case we will use the hash of the username instead of the email.

UserSchema.pre("save", function (next) {
  this.avatar = `http://gravatar.com/avatar/${md5(this.username)}?d=identicon`;
  next(); // This is from Express, to pass control to the next function
});

// Hash password so it cannot be seen when access database. We use bcrypt module required above
// Observe the series of callback functions

// Schema.pre('save', function ()=>{}) is a mongoose middleware
// https://mongoosejs.com/docs/middleware.html#order


UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  });
});
// Check lecture 33 to see how you can generate another signup user in the GraphQL playground

// Finally we will inject the UserSchema in the variable 'User' that will be called in the resolvers.js
// and later on we will construct the context of the ApolloServer in server.js

module.exports = mongoose.model("User", UserSchema);
