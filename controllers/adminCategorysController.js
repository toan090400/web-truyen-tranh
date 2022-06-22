var Category = require('../models/category');
var { validationResult } = require('express-validator');

var adminCategorys = {

    GetAdminCategorys: async (req, res) => {
        var categorys = await Category.find({});
        if(categorys){
            res.render('admin/category/categorys',{
                categorys: categorys,
            })
        }
    },

    GetAdminCategorysAdd: async (req, res) => {
        res.render('admin/category/category_add');
    },

    PostAdminCategorysAdd:function(req,res) {
        var name = req.body.name;
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            const alert = errors.array()
            res.render('admin/category/category_add', {
                alert,
            })
        }
        else{
            Category.findOne({name:name}, function (err, category) {
                if(category){
                    req.flash('error', `Thể loại truyện "${name}" đã tồn tại!`);
                    res.redirect('/admin/categorys/category-add');
                }
                else{
                    var newCategory = new Category({
                        name: name,
                        description: req.body.description,
                    });
                    newCategory.save(function(err) {
                        if(err){
                            return console.log(err);
                        }
                        Category.find({},function (err, categorys) {
                            if (err) {
                                console.log(err);
                            } else {
                                req.app.locals.categorys = categorys;
                            }
                        });
                        req.flash('success', `Thêm thể loại truyện "${name}" thành công.`);
                        res.redirect('/admin/categorys');
                    });
                }
            });
            
        }
    },

    GetAdminCategorysEdit: async (req, res) => {
        var categorys = await Category.findOne({slug:req.params.slug});
        if (categorys) {
            res.render('admin/category/category_update', {
                name: categorys.name,
                slug: categorys.slug,
                description: categorys.description,
                id: categorys._id
            });
        }
    },

    PutAdminCategorysEdit: function (req, res) {

        Category.findOne({slug:req.params.slug}, function (err, category) {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                // return res.status(422).jsonp(errors.array())
                const alert = errors.array()
                res.render('admin/category/category_update', {
                    alert,
                    slug: category.slug,
                    name: req.body.name,
                    description: req.body.description,
                    id: req.body.id,
                })
            }
            else{

                category.name = req.body.name;
                category.description = req.body.description;

                category.save(function(err) {
                    if(err){
                        return console.log(err);
                    }
                    Category.find({},function (err, categorys) {
                        if (err) {
                            console.log(err);
                        } else {
                            req.app.locals.categorys = categorys;
                        }
                    });
                    req.flash('success', 'Cập nhật thông tin thành công.');
                    res.redirect('/admin/categorys');
                });
            }
        });
    },

    DeleteAdminCategorysDelete: function (req, res) {
        Category.delete({slug:req.params.slug}, function (err) {
            if (err){
                return console.log(err);
            }
            Category.find({},function (err, categorys) {
                if (err) {
                    console.log(err);
                } else {
                    req.app.locals.categorys = categorys;
                }
            });
            req.flash('success', 'Xóa thể loại truyện thành công.');
            res.redirect('/admin/categorys');
        });
    },
    
    GetAdminCategorysTrash: async (req, res) => {
        var categorys = await Category.findDeleted({});
        if(categorys){
            res.render('admin/category/category_trash',{
                categorys: categorys,
            })
        }
    },

    PatchAdminCategorysRestor:function (req, res) {
        Category.restore({_id:req.params.id}, function (err) {
            if (err){
                return console.log(err);
            }
            Category.find({},function (err, categorys) {
                if (err) {
                    console.log(err);
                } else {
                    req.app.locals.categorys = categorys;
                }
            });
            req.flash('success', 'Khôi phục thể loại truyện thành công.');
            res.redirect('/admin/categorys/category-trash');
        });
    },

    DeleteAdminCategorysDestroy: async (req, res) => {
        var categorys = await Category.findByIdAndDelete({_id:req.params.id});
        if(!categorys){
            return console.log(categorys);
        }
        req.flash('success', 'Xóa vĩnh viễn thể loại truyện thành công.');
        res.redirect('/admin/categorys/category-trash');

    },
        
}
module.exports = adminCategorys;