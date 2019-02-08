const User = require("../models/User");
const Reservation = require("../models/Reservation");

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
            if(err) console.error(err);
            else isAdmin = result.admin;
        });
        if(isAdmin) return next();
        else  {
            req.flash("error", "You must be logged in as administrator to see this page.");
            return res.redirect('/users/login');
        }
    } else {
        req.flash("error", "You must be logged in as administrator to see this page.");
        return res.redirect('/users/login');
    }
};

const isOwnerOfReservation = function(req,res,next) {
    if(req.user.admin) return next();
    Reservation.findById(req.params.id,"user",function (err, reservation) {
        if(err) {
            console.error(err);
            res.redirect('/');
        } else {
            if(reservation.user==req.user.id){
                return next();
            } else {
                req.flash('error',"You are not the owner of this reservation.");
                res.redirect('/reservations');
            }

        }
    });
};

const isOwnerOfAccount = function(req,res,next){
    next();
};

module.exports = {
    isLoggedIn,
    isLoggedAsAdmin,
    isOwnerOfReservation,
    isOwnerOfAccount
};