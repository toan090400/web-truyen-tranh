var express = require('express');
var router = express.Router();


var Products = require('../controllers/productController')

router.get('/:product',Products.GetLinkPdoductDetail);

// Exports
module.exports = router;