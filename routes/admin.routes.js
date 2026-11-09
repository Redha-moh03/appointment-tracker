const router = require("express").Router()
const User = require('../models/User')
const Appointment = require('../models/Appointment')
const Department = require('../models/department')
const isSignedIn = require("../middleware/is-signed-in")
const isAdmin = require("../middleware/is-admin")

router.get('/users', isAdmin, async (req, res) => {
    const users = await User.find().populate('department')
    res.render('admin/all-users.ejs', { users: users })
})
router.put('/approve/:userId', isAdmin, async (req, res) => {
    const newUser = await User.findByIdAndUpdate(req.params.userId, { status: 'approved' }, { new: true })
    res.redirect('/admin/users')

})
router.put('/reject/:userId', isAdmin, async (req, res) => {
    const newUser = await User.findByIdAndUpdate(req.params.userId, { status: 'rejected' }, { new: true })
    res.redirect('/admin/users')
})
module.exports = router;