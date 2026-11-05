const router = require("express").Router()
const User = require('../models/User')
const Appointment = require('../models/Appointment')
const Department = require('../models/department')
const isSignedIn = require("../middleware/is-signed-in")
const Reviews = require('../models/Reviews')

router.get('/new', isSignedIn, async (req, res) => {
    const doctor = await User.find({ doctor: true })
    res.render('reviews/create.ejs', { doctor: doctor })
})
router.post('/new', isSignedIn, async (req, res) => {
    const newRview = await Reviews.create({
        title: req.body.title,
        reviewBody: req.body.reviewBody,
        rating: req.body.rating,
        doctorReviewed: req.body.doctor,
        owner: req.session.user._id
    })
})
router.get('/', async (req, res) => {
    const reviews = await Reviews.find()
    res.render('reviews/index.ejs', { reviews: reviews })
})
module.exports = router;
