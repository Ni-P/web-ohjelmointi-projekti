const express = require('express');
const router = express.Router();
const Cottage = require("../models/Cottage");
const Reservation = require('../models/Reservation');

const middleware = require("../middleware");

/* GET home page. */
router.get('/', function(req, res, next) {
    Cottage.find({}, function(err, results) {
        if(err){
            console.error(err);
        } else {
            // res.header("X-Content-Type-Options", "nosniff");
            res.render('cottages/cottages', { results, title: ' | Cottages'});
        }
    });

    // res.render('cottages/cottages', { title: ' | Cottages'});
});

router.get('/new', middleware.isLoggedAsAdmin, function(req, res) {
    res.render('cottages/newCottage', {title: ' | Add a new cottage'});
});

router.post('/cottages/new', middleware.isLoggedAsAdmin, function (req, res) {
    const newCottage = {
        name: req.body.name,
        location: req.body.location,
        reserved: null,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description
    };

    Cottage.create(newCottage, function(err, newInsert){
        if(err){
            console.error(err);
            req.flash("error", "Error, could not add new cottage");
            res.redirect("/cottages");
        } else {
            req.flash("success", "New cottage added succesfully.");
            res.redirect("/cottages");
        }
    });

    //res.redirect('/',200);
});

router.get('/:id/delete', middleware.isLoggedAsAdmin, function (req, res) {
    Reservation.find({ cottage: req.params.id }, function (err, reservations) {
        if(err){
            console.error(err);
            res.redirect('/cottages');
        } else {
            Reservation.populate(reservations, "user", function (err, populated) {
                if (err) {
                    console.error(err);
                    res.redirect('/');
                } else {
                    console.log(populated.toString());
                    res.render('cottages/deleteCottage',
                        {   reservations: populated,
                            title: " | Reservations"
                        });
                }
            })
        }
    })
});

router.post('/:id/delete', middleware.isLoggedAsAdmin, function (req, res) {
    Reservation.deleteMany({cottage: req.params.id}, function (err) {
        if (err) {
            console.error(err);
            res.redirect('/');
        } else {
            Cottage.deleteOne({_id: req.params.id}, function (err) {
                if (err) {
                    console.error(err);
                    res.redirect('/');
                } else {
                    res.redirect('/cottages');
                }
            })
        }
    })
});

module.exports = router;
