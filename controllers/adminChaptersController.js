var Product = require('../models/product');
var Chapter = require('../models/chapter');
var { validationResult } = require('express-validator');

var mkdirp = require('mkdirp');
var fs = require('fs-extra');
var resizeImg = require('resize-img');

var adminChapters = {

    GetAdminChapters: async (req, res) => {
        var chapters = await Chapter.find({}).sort({product: 1});
        if(chapters){
            res.render('admin/chapter/chapters',{
                chapters: chapters,
            })
        }
    },

    GetAdminChaptersAdd: async (req, res) => {
        var products = await Product.find({});
        if(products){
            res.render('admin/chapter/chapter_add',{
                products: products,
            })
        }
        
    },

    PostAdminChaptersAdd:function(req,res) {
        Product.find({},function (err, products) {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                // return res.status(422).jsonp(errors.array())
                const alert = errors.array()
                res.render('admin/chapter/chapter_add', {
                    alert,
                    products: products
                })
            }
            else{
                Chapter.findOne({
                    name:req.body.name,
                    product:req.body.product
                },function (err, chapter) {
                    if(chapter){
                        req.flash('error', `Chương "${req.body.name}" của truyện "${req.body.product}" đã tồn tại!`);
                        res.redirect('/admin/chapters/chapter-add');
                    }
                    else{
                        Product.findOne({name: req.body.product},function (err,data){
                            var newChapter = new Chapter({
                                name: req.body.name,
                                description: req.body.description,
                                product: req.body.product,
                                image: data.image,
                            });
                            newChapter.save(function(err) {
                                if(err){
                                    return console.log(err);
                                }
                                req.flash('success', `Thêm chương "${req.body.name}" của truyện "${req.body.product}" thành công.`);
                                res.redirect('/admin/chapters');
                            });
                        })
                    }
                })

            }
            
        });
        
    },

    GetAdminChaptersEdit: function (req, res) {
        Chapter.findById({_id:req.params.id}, function (err, chapter) {
            if (err) {
                console.log(err);
                res.redirect('/admin/chapter_update');
            } else {
                res.render('admin/chapter/chapter_update', {
                    name: chapter.name,
                    product: chapter.product,
                    content: chapter.content,
                    slug: chapter.slug,
                    description: chapter.description,
                    id: chapter._id,
                });
            }
        });
    },

    PutAdminChaptersEdit: function (req, res) {
        Chapter.findOne({slug:req.params.slug}, function (err, chapter_new) {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                // return res.status(422).jsonp(errors.array())
                const alert = errors.array()
                res.render('admin/chapter/chapter_update', {
                    alert,
                    slug: chapter_new.slug,

                    name: req.body.name,
                    product: req.body.product,
                    description: req.body.description,
                    id: req.body.id,
                })
            }
            else{
                chapter_new.description = req.body.description;

                chapter_new.save(function (err) {
                    if (err){
                        console.log(err);
                    }

                    req.flash('success', 'Cập nhật thông tin thành công.');
                    res.redirect('/admin/chapters');
                });
            }
        });
        
    },

    DeleteAdminChaptersDelete: function (req, res) {
        Chapter.delete({slug:req.params.slug}, function (err) {
            if (err){
                return console.log(err);
            }
            req.flash('success', 'Xóa chương thành công.');
            res.redirect('/admin/chapters');
        });
    },
    
    GetAdminChaptersTrash: async (req, res) => {
        var chapters = await Chapter.findDeleted({});
        if(chapters){
            res.render('admin/chapter/chapter_trash',{
                chapters: chapters,
            })
        }
    },

    PatchAdminChaptersRestor:function (req, res) {
        Chapter.restore({_id:req.params.id}, function (err) {
            if (err){
                return console.log(err);
            }
            req.flash('success', 'Khôi phục chương thành công.');
            res.redirect('/admin/chapters/chapter-trash');
        });
    },

    DeleteAdminChaptersDestroy: async (req, res) => {
        var chapters = await Chapter.findByIdAndDelete({_id:req.params.id});
        if(!chapters){
            return console.log(chapters);
        }
        req.flash('success', 'Xóa vĩnh viễn chương thành công.');
        res.redirect('/admin/chapters/chapter-trash');

    },

    GetAdminChaptersContent: async (req, res) => {
        Chapter.findById({_id:req.params.id}, function (err, chapter) {
            if (err) {
                console.log(err);
                res.redirect('/admin/chapter_content');
            } else {
                res.render('admin/chapter/chapter_content', {
                    name: chapter.name,
                    product: chapter.product,
                    content: chapter.content,
                    description: chapter.description,
                    slug: chapter.slug,
                    description: chapter.description,
                    id: chapter._id,
                });
            }
        });
    },
    // munter 
    PutAdminChaptersContent: function (req, res) {
        
        Chapter.findOne({_id:req.params.id}, function (err, chapter) {
            var image = req.files[0];
            if(image){
                chapter.content = req.files;

                
    
                chapter.save(function (err) {
                    if (err){
                        console.log(err);
                    }

                    req.flash('success', 'Cập nhật nội dung thành công.');
                    res.redirect('/admin/chapters');
                });
            }
            else{
                req.flash('error', 'Bạn chưa chọn nội dung!');
                res.render('admin/chapter/chapter_content',{
                    id: chapter._id,
                    name: chapter.name,
                    product: chapter.product,
                    content: chapter.content,
                    description: chapter.description,
                });
            }
        });
    },

    
        
}
module.exports = adminChapters;