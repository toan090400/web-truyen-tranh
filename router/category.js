var express = require('express');
var router = express.Router();

var Categorys = require('../controllers/categoryController');

// Get all product in category page = 1
router.get('/', Categorys.GetCategorys);

// Get all product in category page >= 1 
router.get('/page/:page',Categorys.GetCategorysPage);

// Get product = category page = 1
router.get('/:name',Categorys.GetLinkProductCategorys);

// Get product = category page >= 1 
router.get('/:name/page/:page',Categorys.GetProductCategorysPage);

// Exports
module.exports = router;