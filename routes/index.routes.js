const isSignedIn = require("../middleware/is-signed-in");
const Appointment = require("../models/Appointment");
const router = require("express").Router()


router.get('/', (req, res) => {
    res.render('homepage.ejs')
})
router.get('/my-appointment', isSignedIn, async (req, res) => {
    const myAppointment = await Appointment.find({ owner: req.session.user._id }).populate('doctorName')
    res.render('user-appointment.ejs', { myAppointment: myAppointment })
})
router.get('/details/:appoitmentId', isSignedIn, async (req, res) => {
    const foundAppointment = await Appointment.findById(req.params.appoitmentId).populate('doctorName')
    res.render('details.ejs', { appointment: foundAppointment })
})
router.delete('/appointment/:appointmentId', async (req, res) => {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.appointmentId)
    res.redirect('/')
})
module.exports = router;
