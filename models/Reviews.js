const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength:10,
    maxLength:40,
    trim: true
  },
  reviewBody: {
    type: String,
    minLength:10,
    maxLength:500,
    required: true,
  },
  rating : {
    type:Number,
    required:true,
    min:0,
    max:10,
    default:10,
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  doctorReviewed:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  }

}, {timestamps: true});

const Reviews = mongoose.model("Reviews", reviewsSchema);

module.exports = Reviews;
