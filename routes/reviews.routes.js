const router = require("express").Router()
const User = require('../models/User')
const Appointment = require('../models/Appointment')
const Department = require('../models/department')
const isSignedIn = require("../middleware/is-signed-in")
const Reviews = require('../models/Reviews')

router.get('/new', isSignedIn, async (req, res) => {
    res.render('/reviews/create.ejs')
})
router.post('/new', isSignedIn, async (req, res) => {
    const newRview = await Reviews.create()
})

module.exports = router;
