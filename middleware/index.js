const isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()) return next();
    else {
        req.flash("error", "You must be logged in to see this page.");
        res.redirect('/users/login');
    }
};

module.exports = {
    isLoggedIn
};