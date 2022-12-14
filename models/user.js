import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  membership: { type: Boolean, required: true, default: false },
});

const User = mongoose.model("User", UserSchema);
export default User;
