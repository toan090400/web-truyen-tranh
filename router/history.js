var express = require('express');
var router = express.Router();


var History = require('../controllers/historyController');

var admin = require('../config/admin');
var isUser = admin.isUser;

router.get('/:id',isUser,History.GetHistory);

router.post('/check',History.PostHistory);

router.delete('/delete/:id',History.DeleteHistory);
// Exports
module.exports = router;