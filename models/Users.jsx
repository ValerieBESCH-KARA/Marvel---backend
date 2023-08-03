const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },
  username: {
    type: String,
  },

  favourites: Array,
  comics: Array,
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
