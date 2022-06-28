var express = require('express');
var router = express.Router();

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/product_images/')
    },
    filename: function (req, file, cb) {
        // cb(null, file.originalname )
        const uniqueSuffix = Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix +'-'+ file.originalname)
    }
})
var upload = multer({ storage: storage })

var Check = require('../middleware/validator.js')
var AdminProducts = require('../controllers/adminProductsController');


var admin = require('../config/admin');
var isAdmin = admin.isAdmin;

// router.get('/', isAdmin,AdminProducts.GetAdminProducts);
router.get('/', AdminProducts.GetAdminProducts);


router.get('/product-add',isAdmin,AdminProducts.GetAdminProductsAdd);


router.post('/add',Check.adminProducts,AdminProducts.PostAdminProductsAdd);


router.get('/edit/:id', isAdmin,AdminProducts.GetAdminProductsEdit);


router.put('/update/:id',Check.adminProducts,AdminProducts.PutAdminProductsEdit);


router.delete('/delete/:name',AdminProducts.DeleteAdminProductsDelete);


router.get('/product-trash',isAdmin, AdminProducts.GetAdminProductsTrash);


router.patch('/product-trash/restor/:id',AdminProducts.PatchAdminProductsRestor);


router.delete('/product-trash/destroy/:id',AdminProducts.DeleteAdminProductsDestroy);

router.get('/image/:id',isAdmin,AdminProducts.GetAdminChaptersImage);

router.put('/chapter-gallery/:id',upload.single('myFiles'),AdminProducts.PutAdminChaptersImage);



// Exports
module.exports = router;