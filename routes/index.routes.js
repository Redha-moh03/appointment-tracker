const isSignedIn = require("../middleware/is-signed-in");
const Appointment = require("../models/Appointment");
const router = require("express").Router()
const User = require('../models/User')


router.get('/', (req, res) => {
    res.render('homepage.ejs')
})
router.get('/my-appointment', isSignedIn, async (req, res) => {
    const myAppointment = await Appointment.find({ owner: req.session.user._id }).populate('doctorName')
    res.render('user-appointment.ejs', { myAppointment: myAppointment })
})
router.get('/details/:appointmentId', isSignedIn, async (req, res) => {
    const foundAppointment = await Appointment.findById(req.params.appointmentId).populate('doctorName')
    res.render('details.ejs', { appointment: foundAppointment })
})
router.delete('/appointment/:appointmentId', isSignedIn, async (req, res) => {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.appointmentId)
    res.redirect('/')
})
router.get('/edit/:appointmentId', isSignedIn, async (req, res) => {
    const editedAppointment = await Appointment.findById(req.params.appointmentId)
    const doctor = await User.find({ role: 'doctor', status: 'approved' })
    res.render('edit-appointment.ejs', {
        appointment: editedAppointment,
        doctor: doctor
    })
})
router.put('/edit/:appointmentId', isSignedIn, async (req, res) => {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.appointmentId, {
        day: req.body.date,
        startTime: new Date(req.body.date + ' ' + req.body.startTime),
        doctorName: req.body.doctor,
        department: req.body.department,
        owner: req.session.user._id
    })
    res.redirect('/')
})
module.exports = router;
