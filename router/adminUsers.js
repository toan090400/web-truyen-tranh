var express = require('express');
var router = express.Router();

var Check = require('../middleware/validator.js');

var AdminUsers = require('../controllers/adminUsersController');

var admin = require('../config/admin');
var isAdmin = admin.isAdmin;


router.get('/',isAdmin, AdminUsers.GetAdminUsers);

router.get('/google',isAdmin, AdminUsers.GetAdminUsersGoogle);


router.get('/user-add',isAdmin,AdminUsers.GetAdminUsersAdd);


router.post('/add',Check.adminUser,AdminUsers.PostAdminUsersAdd);


router.get('/edit/:username',isAdmin, AdminUsers.GetAdminUsersEdit);


router.put('/update/:id',Check.adminUserUpdate,AdminUsers.PutAdminUsersEdit);


router.delete('/delete/:username',AdminUsers.DeleteAdminUsersDelete);


router.get('/user-trash',isAdmin, AdminUsers.GetAdminUsersTrash);


router.patch('/restor/:username',AdminUsers.PatchAdminUsersRestor);


router.delete('/destroy/:username',AdminUsers.DeleteAdminUsersDestroy);



// Exports
module.exports = router;