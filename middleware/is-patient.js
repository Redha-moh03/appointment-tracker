const isPatient = (req, res, next) => {
    if (req.session.user.role === 'patient') return next();
    res.send("404");
};

module.exports = isPatient;
