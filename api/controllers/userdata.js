const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const UserdataController = {
  Index: (req, res) => {
    User.find({}, '-password', (err, users) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ users: users, token: token });
    });
  },
  Find: (req, res) => {
    User.findById(req.user_id)
      .exec((err, user) => {
        if (err) {
          throw err;
        }
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ user: user, token: token });
      });
  }
};

module.exports = UserdataController;
