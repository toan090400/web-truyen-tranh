var express = require('express');
var router = express.Router();

var Search = require('../controllers/searchController');

router.get('/', Search.GetSearch);

// Exports
module.exports = router;