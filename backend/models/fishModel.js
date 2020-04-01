import mongoose, { Schema } from 'mongoose';

var personFish = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
    //unique: true,
    required: true,
  },
  desc: {
    type: String,
    unique: true,
    //lowercase: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // status: {
  //   type: Boolean,
  //   required: true,
  // },
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'unavailable',
    required: true
  },

});

export default mongoose.model('Fish', personFish);
