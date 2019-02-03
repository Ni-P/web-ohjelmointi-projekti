var express = require('express');
var router = express.Router();
const Cottage = require("../models/Cottage");

/* GET home page. */
router.get('/cottages', function(req, res, next) {

    Cottage.find({}, function(err, results){
        if(err){
            console.error(err);
        } else {
            res.render('cottages/cottages', { results, title: ' | Cottages'});
        }
    });

    // res.render('cottages/cottages', { title: ' | Cottages'});
});

router.get('/cottages/new',function(req,res,next){
    res.render('cottages/newCottage', {title: ' | Add a new cottage'});
});

router.post('/cottages/new', function (req, res, next) {

    const newCottage = {
        name: "Cottage 3",
        location: "Place 3",
        reserved: null,
        price: 100,
        image: "5817984136_a85f4ab07b_b.jpg",
        description: "Number 3"
    };

    console.log(req.body);
    res.send(req.body);
    return;

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
