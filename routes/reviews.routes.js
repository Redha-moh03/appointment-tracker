const router = require("express").Router()
const User = require('../models/User')
const Appointment = require('../models/Appointment')
const Department = require('../models/department')
const isSignedIn = require("../middleware/is-signed-in")
const Reviews = require('../models/Reviews')
const isPatient = require("../middleware/is-patient")

router.get('/new', isSignedIn, isPatient, async (req, res) => {
    const doctor = await Appointment.find({
        status: "completed",
        owner: req.session.user._id
    }).populate('owner doctorName')
    if (doctor.length > 0) {
        res.render('reviews/create.ejs', { doctor: doctor })
    }
    else {
        return res.send("you cant review this doctor")
    }
})
router.post('/new', isSignedIn, isPatient, async (req, res) => {
    const doctor = await Appointment.findOne({
        status: "completed",
        owner: req.session.user._id
    })
    if (!doctor) {
        return res.send("you cant review this doctor")
    }
    const newRview = await Reviews.create({
        title: req.body.title,
        reviewBody: req.body.reviewBody,
        rating: req.body.rating,
        doctorReviewed: req.body.doctor,
        owner: req.session.user._id
    })
    res.redirect('/')
})
router.get('/', async (req, res) => {
    const reviews = await Reviews.find()
    res.render('reviews/index.ejs', { reviews: reviews })
})
router.get('/:reviewId', isSignedIn, async (req, res) => {
    const foundReview = await Reviews.findById(req.params.reviewId).populate('doctorReviewed owner')
    res.render('reviews/details.ejs', { review: foundReview })
})
module.exports = router;
