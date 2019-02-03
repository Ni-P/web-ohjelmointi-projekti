const express = require('express');
const router = express.Router();

const middleware = require("../middleware");

router.get('/',function (req, res) {
    res.send('under constructions');
});

module.exports = router;
