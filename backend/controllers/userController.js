import mongoose from 'mongoose';
import UserSchema from '../models/userModel';

const User = mongoose.model('User', UserSchema);

export const getAll= async (req, res) => {
  const users = await User.find(); //.populate('message')
  console.log(users);
  res.json(users);
  res.send('toto');
};
