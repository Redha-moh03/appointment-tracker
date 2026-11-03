const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
    maxLength:40,
    trim: true
  },
  doctorDepartment:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Department"
  },
  doctorName:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  appointmentOwner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
}, {timestamps: true});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
