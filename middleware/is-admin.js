const isAdmin = (req, res, next) => {
    if (req.session.user.role === 'admin') { return next() };
    res.send("404");
};

module.exports = isAdmin;
