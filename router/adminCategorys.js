var express = require('express');
var router = express.Router();

var Check = require('../middleware/validator.js')
var AdminCategorys = require('../controllers/adminCategorysController');

var admin = require('../config/admin');
var isAdmin = admin.isAdmin;

router.get('/',isAdmin, AdminCategorys.GetAdminCategorys);


router.get('/category-add',isAdmin,AdminCategorys.GetAdminCategorysAdd);


router.post('/add',Check.adminCategorys,AdminCategorys.PostAdminCategorysAdd);


router.get('/edit/:slug',isAdmin, AdminCategorys.GetAdminCategorysEdit);


router.put('/update/:slug',Check.adminCategorys,AdminCategorys.PutAdminCategorysEdit);


router.delete('/delete/:slug',AdminCategorys.DeleteAdminCategorysDelete);


router.get('/category-trash',isAdmin, AdminCategorys.GetAdminCategorysTrash);


router.patch('/category-trash/restor/:id',AdminCategorys.PatchAdminCategorysRestor);


router.delete('/category-trash/destroy/:id',AdminCategorys.DeleteAdminCategorysDestroy);



// Exports
module.exports = router;