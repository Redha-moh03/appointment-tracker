const router = require("express").Router()
const User = require('../models/User')
const Appointment = require('../models/Appointment')
const Department = require('../models/department')
const isSignedIn = require("../middleware/is-signed-in")
const isPatient = require('../middleware/is-patient')
const mongoose = require('mongoose')

router.get('/', isSignedIn, isPatient, async (req, res) => {
    const doctor = await User.find({ role: 'doctor', status: 'approved' })
    const department = await Department.find()
    const departmentId = req.query.department

    if (!mongoose.isValidObjectId(departmentId)) {
        return res.redirect('/book')
    }
    const chosenDepartment = await Department.findById(departmentId)
    if (!chosenDepartment) {
        return res.redirect('/book')
    }
    const Doctor = await User.find({
        role: 'Doctor',
        status: 'approved',
        department: chosenDepartment._id
    })
    res.render('book/book.ejs', {
        doctor: doctor,
        department: department,
        chosenDepartment: chosenDepartment
    })
})

router.post('/new', isSignedIn, isPatient, async (req, res) => {
    const startTime = new Date(req.body.date + ' ' + req.body.startTime)
    const docAppoint = await Appointment.find({
        doctorName: req.body.doctor
        , startTime: startTime
    })
    const patientAppoint = await Appointment.find({
        owner: req.session.user._id,
        startTime: startTime
    })
    if (docAppoint.length > 0) {
        res.send('Doctor is not available at that time')
        res.redirect('/book')
    }
    else if (patientAppoint.length > 0) {
        res.send('You already have an appointment at that time')
        res.redirect('/book')
    }
    else {
        const newAppointment = await Appointment.create({
            day: req.body.date,
            startTime: new Date(req.body.date + ' ' + req.body.startTime),
            endTime: new Date(startTime.getTime() + 1800000),
            doctorName: req.body.doctor,
            department: req.body.department,
            owner: req.session.user._id
        })
        res.redirect('/book')
    }
})


module.exports = router;