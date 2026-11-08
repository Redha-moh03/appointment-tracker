const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['patient', 'admin', 'doctor'],
    required: true,
    default: 'patient'
  },
  status: {
    type: String,
    enum: ['approved', 'rejected', 'pending'],
    default: 'approved',
    required: true

  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
