const dotenv = require("dotenv").config()
const bcrypt = require("bcrypt");
const User = require('./models/User')
const Department = require('./models/department')
const connectToDB = require('./db.js')
const mongoose = require("mongoose");


async function createadmin() {
    await connectToDB()

    for (const departmentName of ['Dental', 'Diabetes', 'Physiotherapy', 'Oncology']) {
        await Department.updateOne({ departmentName }, { departmentName }, { upsert: true })
    }

    const adminInDatabase = await User.findOne({ username: process.env.ADMIN_USERNAME })

    if (adminInDatabase) {
        console.log('admin already exists')
    } else {
        const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10)
        await User.create({
            username: process.env.ADMIN_USERNAME,
            password: hashedPassword,
            role: 'admin',
            status: 'approved'
        })
        console.log('admin created')
    }

    console.log('finished')
    await mongoose.disconnect()
}
createadmin()