const isDoctor = (req, res, next) => {
    if (req.session.user.role === 'doctor') return next();
    res.send("404");
};

module.exports = isDoctor;
