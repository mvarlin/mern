import { Schema } from 'mongoose';

const MessageSchema = new Schema({
  messages: {
    type: String,
    required: true
  },
  username: { type: Schema.Type.objectId, ref: 'User' }
});

export default MessageSchema;
