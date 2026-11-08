const dotenv = require("dotenv").config()
const bcrypt = require("bcrypt");
const User = require('../models/User')
const Appointment = require('../models/Appointment')
const Department = require('../models/department')
const connectToDB = require('./db.js')
const mongoose = require("mongoose");


async function admin() {
    connectToDB()
    const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 14)
    await User.create({
        username: admin,
        password: hashedPassword,
        role: 'admin',
        status: 'approved'
    })
    console.log('finshed')
}
mongoose.disconnect()
admin()