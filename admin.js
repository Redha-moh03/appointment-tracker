const dotenv = require("dotenv").config()
const bcrypt = require("bcrypt");
const User = require('../models/User')
const Appointment = require('../models/Appointment')
const Department = require('../models/department')
const connectToDB = require('./db.js')
