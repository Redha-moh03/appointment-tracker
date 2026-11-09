const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    day: {
        type: Date,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['cancelled', 'completed', 'booked'],
        default: 'booked'
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    },
    doctorName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });
const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
