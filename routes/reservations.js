const express = require('express');
const router = express.Router();

const Reservation = require('../models/Reservation');
const Cottage = require("../models/Cottage");
var User = require("../models/User");

const middleware = require("../middleware");

router.get('/', middleware.isLoggedIn, function (req, res) {

    User.findById(req.user._id,'reservations',function (err, user) {
        if(err){
            console.error(err);
            res.redirect('/');
        } else { // TODO: populate cottages
            User.populate(user,"reservations", function (err,reservations) {
                if(err){
                    console.error(err);
                    res.redirect('/');
                } else {
                    console.log(reservations.reservations);
                    res.render('reservations/reservations', {reservations: reservations.reservations, title: " | Reservations" });
                }
            })
        }
    })

});

router.get('/:id/new', middleware.isLoggedIn, function (req, res) {
   res.render('reservations/newReservation', {title: " | Reservation"});
});

router.post('/:id/new', middleware.isLoggedIn, function (req, res) {
    const newReservation = {
        user: req.user._id,
        cottage: req.params.id,
        date: req.body.reservasionDay
    };

    Reservation.create(newReservation, function (err, newInsert) {
        if(err){
            console.error(err);
            req.flash('error', "Could not make the reservation.");
            res.render(`/${req.params.id}/new`);
        } else {
            req.flash('success', "Reservasion was successfull.");
            User.findById(newReservation.user,function (err, newEntry) {
                if(err){
                    console.error(err);
                    res.redirect('/');
                } else {
                    newEntry.reservations.push(newInsert);
                    newEntry.save();
                    res.redirect('/reservations');
                }
            })
            // res.redirect('/reservations');
        }
    });
    // res.redirect(`/${req.params.id}/new`);
});

module.exports = router;
