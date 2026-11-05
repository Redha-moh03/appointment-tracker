const router = require("express").Router()
const User = require('../models/User')
const Appointment = require('../models/Appointment')
const Department = require('../models/department')
const isSignedIn = require("../middleware/is-signed-in")

router.get('/', isSignedIn, async (req, res) => {
    const doctor = await User.find({ doctor: true })
    res.render('book/book.ejs', { doctor: doctor })
})

router.post('/new', isSignedIn, async (req, res) => {
    const newAppointment = await Appointment.create({
        day: req.body.date,
        startTime: new Date(req.body.date + ' ' + req.body.startTime),
        doctorName: req.body.doctor,
        department: req.body.department,
        owner: req.session.user._id
    })
    res.redirect('/')
})


module.exports = router;