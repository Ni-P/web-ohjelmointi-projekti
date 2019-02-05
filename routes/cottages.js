const express = require('express');
const router = express.Router();
const Cottage = require("../models/Cottage");

const middleware = require("../middleware");

/* GET home page. */
router.get('/cottages', function(req, res, next) {
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

router.get('/cottages/new', middleware.isLoggedAsAdmin, function(req, res) {
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
        } else {
            req.flash("success", "New cottage added succesfully.");
            res.redirect("/cottages");
        }
    });

    //res.redirect('/',200);
});

module.exports = router;
