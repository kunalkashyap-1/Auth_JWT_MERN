const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Schema
const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    pswd: { type: "String", required: true },
  },
  // Include createdAt and updatedAt fields in the schema
  { timestaps: true }
);

// Hash user's password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10); // Generate a salt with a complexity of 10
  // Hash the user's password with the generated salt
  this.pswd = await bcrypt.hash(this.pswd, salt);
});

// Add matchPassword method to User model to compare entered password and password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Compare the entered password with the hashed password stored in the database
  return await bcrypt.compare(enteredPassword, this.pswd);
};

// Create User model from the userSchema
const User = mongoose.model("user", userSchema);

// Export User model
module.exports = User;
