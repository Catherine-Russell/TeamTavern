const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: {type: String, required: true},
  password: { type: String, required: true },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: []}]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
