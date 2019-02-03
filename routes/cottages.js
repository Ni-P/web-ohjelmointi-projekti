const express = require('express');
const router = express.Router();
const Cottage = require("../models/Cottage");

const middleware = require("../middleware");

/* GET home page. */
router.get('/cottages', function(req, res, next) {

    Cottage.find({}, function(err, results){
        if(err){
            console.error(err);
        } else {
            res.header("X-Content-Type-Options", "nosniff");
            res.render('cottages/cottages', { results, title: ' | Cottages'});
        }
    });

    // res.render('cottages/cottages', { title: ' | Cottages'});
});

router.get('/cottages/new',function(req,res,next){
    res.render('cottages/newCottage', {title: ' | Add a new cottage'});
});

router.post('/cottages/new', middleware.isLoggedIn, function (req, res) {

    const newCottage = {
        name: req.body.name,
        location: req.body.location,
        reserved: null,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description
    };

    // console.log(req.body);
    // res.send(req.body);
    // return;

    Cottage.create(newCottage, function(err, newInsert){
        if(err){
            console.error(err);
        } else {
            res.send("inserted: "+newInsert.toString());
        }
    });

    //res.redirect('/',200);
});

module.exports = router;
