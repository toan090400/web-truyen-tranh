var express = require('express');
var router = express.Router();


var Chapters = require('../controllers/chapterController');

var admin = require('../config/admin');
var isUser = admin.isUser;

router.get('/:product/chapter/:name',isUser,Chapters.GetLinkChapter);
// Exports
module.exports = router;