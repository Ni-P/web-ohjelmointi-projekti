const express = require('express');
const router = express.Router();
const passport = require("passport");
const middleware = require("../middleware");
var User = require("../models/User");

router.get('/', middleware.isLoggedAsAdmin, function(req, res) {
    User.find({}, function (err, users) {
        if(err){
            req.flash('error','Failed to get users list.');
            res.redirect('/');
        } else {
            res.render('users/users', {title: ' | Users', users});
        }
    });
});

router.get('/:id/show', middleware.isLoggedAsAdmin, function (req,res) {
   User.findById(req.params.id, function (err, user) {
       if(err){
           req.flash('error', 'Failed to get user details');
           res.redirect('/users');
       } else {
           res.render('users/show', {title: " | User", user});
       }
   })
});

router.get('/:id/edit', middleware.isLoggedAsAdmin, function (req, res) {
    res.send('WIP');
});

router.get('/:id/delete', middleware.isLoggedAsAdmin, function (req, res) {
    res.send('WIP');
});

router.post('/:id/delete', middleware.isLoggedAsAdmin, function (req, res) {
    res.send('WIP');
});

router.get('/register', function (req, res) {
    res.render("users/register", {title: " | Register"});
});

router.post('/register', function (req, res) {
    const userDetails = {
        username: req.body.username,
        admin: false,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        postalCode: req.body.postalcode,
        phone: req.body.phone,
        email: req.body.email,
    };
    let newUser =  new User(userDetails);
    User.register(newUser, req.body.password, function (err) {
        if(err){
            if(err.name === "UserExistsError"){
                req.flash("error", "Username already exists.");
            } else {
                req.flash("error", "Failed to register");
            }
            console.error(err);
            // req.flash("error", "Failed to register");
            return res.render('users/register', {title: "Register", error: req.flash("error")});
        }
        passport.authenticate('Local')(req,res,function(){
            req.flash("success", "Thank you for registering.");
            res.redirect('/cottages');
        });
    });
});

router.get('/login', function (req, res) {
    res.render('users/login',{title: "Login"});
});

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/cottages',
        failureRedirect: '/users/login'
    }), function(req, res) {

});

router.get('/logout', function(req, res) {
    req.flash("success", "You are now logged out");
    req.logout();
    res.redirect('/users/login');
});

module.exports = router;
