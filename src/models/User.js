import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  password: { type: String, require: true },
  date: { type: Date, default: Date.now },
  comments: [],
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
  console.log(this.password);
});

const User = mongoose.model("User", userSchema);
export default User;
