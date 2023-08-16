import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

userSchema.pre("save", async function (next) {
  // Check to see if password is modified. If it is, encrypt it. If not, execute next();
  if (!this.isModified("password")) {
    next();
  }
  // Encrypt the password
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.models.User || mongoose.model("User", userSchema);

