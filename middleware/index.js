var User = require("../models/User");

const isLoggedIn = function (req, res, next) {
    // console.log(req.isAuthenticated());
    if(req.isAuthenticated()) return next();
    else {
        req.flash("error", "You must be logged in to see this page.");
        res.redirect('/users/login');
    }
};

const isLoggedAsAdmin = async function(req,res,next) {
    if(req.isAuthenticated()) {
        // console.log(req.session.passport.user);
        let isAdmin = false;
        await User.findOne({username: req.session.passport.user}, "admin", (err, result)=> {
            // console.log(result);
            isAdmin = result.admin;
        });
        if(isAdmin) return next();
        else return res.redirect('/users/login');
    } else {
        req.flash("error", "You must be logged in as administrator to see this page.");
        return res.redirect('/users/login');
    }
};

module.exports = {
    isLoggedIn,
    isLoggedAsAdmin
};