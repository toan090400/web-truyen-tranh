var express = require('express');
var router = express.Router();

var User = require('../controllers/userController');
var Check = require('../middleware/validator.js')

var admin = require('../config/admin');
var isUser = admin.isUser;

router.get('/register', User.GetRegister);

router.post('/register/add',Check.register, User.PostRegister);

router.get('/login', User.GetLogin);

router.post('/login', User.PostLogin);

router.get('/logout',isUser, User.GetLogout);

router.get('/information/:username',isUser, User.GetInformation);

router.put('/information/update/:id',Check.adminUserUpdate,User.PutInformationUpdate);

router.get('/information/password/:id' ,isUser, User.GetChangePassword);

router.put('/information/update/password/:id' ,Check.password,User.PutInformationUpdatePassword);





// Exports
module.exports = router;