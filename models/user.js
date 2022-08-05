import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: Boolean, required: true, default: false },
});

const User = mongoose.model("User", UserSchema);
export default User;
