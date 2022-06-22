var express = require('express');
var router = express.Router();

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/chapter_images/')
    },
    filename: function (req, file, cb) {
        // cb(null, file.originalname )
        const uniqueSuffix = Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix +'-'+ file.originalname)
    }
})
var upload = multer({ storage: storage })

var Check = require('../middleware/validator.js')
var AdminChapters = require('../controllers/adminChaptersController');

var admin = require('../config/admin');
var isAdmin = admin.isAdmin;

router.get('/', isAdmin,AdminChapters.GetAdminChapters);


router.get('/chapter-add',isAdmin,AdminChapters.GetAdminChaptersAdd);


router.post('/add',Check.adminChapters,AdminChapters.PostAdminChaptersAdd);


router.get('/edit/:id',isAdmin, AdminChapters.GetAdminChaptersEdit);


router.put('/update/:slug',Check.adminChapters,AdminChapters.PutAdminChaptersEdit);


router.delete('/delete/:slug',AdminChapters.DeleteAdminChaptersDelete);


router.get('/chapter-trash',isAdmin, AdminChapters.GetAdminChaptersTrash);


router.patch('/chapter-trash/restor/:id',AdminChapters.PatchAdminChaptersRestor);


router.delete('/chapter-trash/destroy/:id',AdminChapters.DeleteAdminChaptersDestroy);


router.get('/content/:id',isAdmin,AdminChapters.GetAdminChaptersContent);


router.put('/chapter-gallery/:id',upload.array('myFiles'),AdminChapters.PutAdminChaptersContent);

// Exports
module.exports = router;