const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const UserdataController = {
  Index: (req, res) => {
    User.find({}, '-password', (err, users) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ users: users, token: token });
    });
  },
  FindByID: (req, res) => {
    const userId = req.params.id;
    User.findById(userId)
		.populate('user_id', '-password')
    .exec((err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        return res.status(200).json({ user: user, token: token });
      });
  },
  addFriend: async (req, res) => {
    const friendUserIdToAdd = req.body.addingfriend;
    const userWhoseFriendListToAddToId = req.body.user;
  
    try {
      if (!mongoose.Types.ObjectId.isValid(userWhoseFriendListToAddToId) || !mongoose.Types.ObjectId.isValid(friendUserIdToAdd)) 
      {return res.status(400).json({ error: 'Invalid user ID' });}
  
      const user = await User.findById(userWhoseFriendListToAddToId);
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (!user.friends.includes(friendUserIdToAdd)) {
        user.friends.push(friendUserIdToAdd);
        await user.save();
        console.log('Friend added successfully');
        return res.status(200).json({ message: 'Friend added successfully' });
      } else {
        console.log('Friend already exists in the user\'s friends list');
        return res.status(400).json({ error: 'Friend already exists in the user\'s friends list' });
      }
    } catch (error) {
      console.error('Error adding friend:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
};

module.exports = UserdataController;