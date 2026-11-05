const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        required: true,
        maxLength: 40,
        trim: true
    }
}, { timestamps: true });

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
