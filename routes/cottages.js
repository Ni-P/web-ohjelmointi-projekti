var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/cottages', function(req, res, next) {

    res.render('cottages/cottages', { title: ' | Cottages'});
});

module.exports = router;
