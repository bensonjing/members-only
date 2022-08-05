import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema({
  title: { type: String, required: true },
  text: String,
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Message = mongoose.model("Message", MessageSchema);
export default Message;
