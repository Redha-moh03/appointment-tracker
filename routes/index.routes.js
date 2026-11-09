const isSignedIn = require("../middleware/is-signed-in");
const Appointment = require("../models/Appointment");
const Department = require("../models/department");
const router = require("express").Router()
const User = require('../models/User')

router.get('/', (req, res) => {
    res.render('homepage.ejs')
})
router.get('/my-appointment', isSignedIn, async (req, res) => {
    if (req.session.user.role === 'patient') {
        const myAppointment = await Appointment.find({ owner: req.session.user._id }).populate('doctorName', 'owner', 'department').sort('startTime')
    }
    if (req.session.user.role === 'doctor') {
        const myAppointment = await Appointment.find({ doctorName: req.session.user._id }).populate('doctorName', 'owner', 'department').sort('startTime')
    }
    res.render('user-appointment.ejs', { myAppointment: myAppointment })
})
router.get('/details/:appointmentId', isSignedIn, async (req, res) => {
    const foundAppointment = await Appointment.findById(req.params.appointmentId).populate('doctorName', 'owner', 'department').sort('startTime')
    res.render('details.ejs', { appointment: foundAppointment })
})
router.put('/appointment/:appointmentId/cancel', isSignedIn, async (req, res) => {
    const deletedAppointment = await Appointment.findByIdAndUpdate(req.params.appointmentId, { status: 'cancelled' }, { new: true })
    res.redirect('/')
})
router.put('/appointment/:appointmentId/complete', isSignedIn, async (req, res) => {
    const completedAppointment = await Appointment.findByIdAndUpdate(req.params.appointmentId, { status: 'completed' }, { new: true })
    res.redirect('/')
})
router.get('/edit/:appointmentId', isSignedIn, async (req, res) => {
    const editedAppointment = await Appointment.findById(req.params.appointmentId).populate('doctorName', 'owner', 'department').sort('startTime')
    const doctor = await User.find({ role: 'doctor', status: 'approved' })
    res.render('edit-appointment.ejs', {
        appointment: editedAppointment,
        doctor: doctor
    })
})
router.put('/edit/:appointmentId', isSignedIn, async (req, res) => {
    const startTime = new Date(req.body.date + ' ' + req.body.startTime)
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.appointmentId, {
        day: req.body.date,
        startTime: new Date(req.body.date + ' ' + req.body.startTime),
        endTime: startTime.getTime() + 1800000
    })
    res.redirect('/')
})
module.exports = router;
