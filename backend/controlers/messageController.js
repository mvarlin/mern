import UserSchema from '../models/userModel';
import mongoose from 'mongoose';
import MessageSchema from '../models/userModel';

const Message = mongoose.model('Message', MessageSchema);

const User = mongoose.model('User', UserSchema);

export const add = async(req, res) => {
  let user= await User.findOne({ username: req.body.userName });
  console.log('user', user);

  if(!user) {

    user= new User ({ userName: req.body.userName});
  }
  var message = new Message ({ msg:req.body.msg});
  await message.save();

  user.message.push(message);
  user = await user.save();

  res.send(user);
};
