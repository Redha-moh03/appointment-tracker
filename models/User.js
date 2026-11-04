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
  doctor : {
    type:Boolean,
    required:true
  },
  department:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Department"
  }]
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;
