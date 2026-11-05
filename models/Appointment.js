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
    department: {
        type: String,
        required: true,
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
