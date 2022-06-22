var express = require('express');
var router = express.Router();

var Categorys = require('../controllers/homeController');

// Get home page = 1
router.get('/', Categorys.GetHome);

// Get home page >= 1 
router.get('/page/:page',Categorys.GetHomePage);



// Exports
module.exports = router;