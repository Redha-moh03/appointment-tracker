const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  day: {
    type: Date,
    required: true,
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

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
