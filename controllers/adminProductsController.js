var Product = require('../models/product');
var Category = require('../models/category');
var Chapter = require('../models/chapter');
var { validationResult } = require('express-validator');


var adminProducts = {

    GetAdminProducts: async (req, res) => {
        var products = await Product.find({});
        if(products){
            res.render('admin/product/products',{
                products: products,
            })
        }
    },

    GetAdminProductsAdd: async (req, res) => {
        var categorys = await Category.find({});
        if(categorys){
            res.render('admin/product/product_add',{
                categorys: categorys,
            })
        }
    },

    PostAdminProductsAdd:function(req,res) {
        var name = req.body.name.toUpperCase();
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            // return res.status(422).jsonp(errors.array())
            const alert = errors.array()
            res.render('admin/product/product_add', {
                alert,
            })
        }
        else{
            Product.findOne({name: name}, function (err, product) {
                if(product){
                    req.flash('error', `Truyện "${name}" đã tồn tại!`);
                    res.redirect('/admin/products/product-add');
                }
                else{
                    var newProduct = new Product({
                        name: name,
                        description: req.body.description,
                        category: req.body.category,
                    });
                    newProduct.save(function(err) {
                        if(err){
                            return console.log(err);
                        }
                        req.flash('success', `Thêm truyện "${name}" thành công.`);
                        res.redirect('/admin/products');
                    });
                }
            });
        }
        
    },

    GetAdminProductsEdit: async (req, res) => {
        Category.find({},function (err, categorys) {
            Product.findById({_id:req.params.id}, function (err, product) {
                if (err) {
                    console.log(err);
                    res.redirect('/admin/product_update');
                } else {
                    res.render('admin/product/product_update', {
                        categorys: categorys,

                        product:product,
                    });
                }
            });
        });
    },

    PutAdminProductsEdit: function (req, res) {
        var category_new = req.body.category_new;
        var category = req.body.category;
        if(category_new){
            category_new = category_new;
        }else{
            category_new = category;
        }
        Product.findOne({_id:req.params.id}, function (err, product) {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                // return res.status(422).jsonp(errors.array())
                const alert = errors.array()
                res.render('admin/product/product_update', {
                    alert,
                    product,
                })
            }
            else{
                Product.findOne({name:req.body.name}, function (err, product) {
                    if (err){
                        console.log(err);
                    }
                    if(product){
                        product.description = req.body.description;
                        product.category = category_new;
        
                        product.save(function (err) {
                            if (err){
                                console.log(err);
                            }
        
                            req.flash('success', 'Cập nhật thông tin thành công.');
                            res.redirect('/admin/products');
                        });
                    }
                });
            }
        });
    },

    DeleteAdminProductsDelete: function (req, res) {
        Product.delete({name:req.params.name}, function (err) {
            if (err){
                return console.log(err);
            }
            req.flash('success', `Xóa truyện thành công.`);
            res.redirect('/admin/products');
        });
    },
    
    GetAdminProductsTrash: async (req, res) => {
        var products = await Product.findDeleted({});
        if(products){
            res.render('admin/product/product_trash',{
                products: products,
            })
        }
    },

    PatchAdminProductsRestor:function (req, res) {
        Product.restore({_id:req.params.id}, function (err) {
            if (err){
                return console.log(err);
            }
            req.flash('success', 'Khôi phục truyện thành công.');
            res.redirect('/admin/products/product-trash');
        });
    },

    DeleteAdminProductsDestroy: async (req, res) => {
        const product = await Product.findByIdAndDelete({_id:req.params.id})
        const chapter = await Chapter.deleteMany({product:product.name})
        req.flash('success', 'Xóa vĩnh viễn truyện thành công.');
        res.redirect('/admin/products/product-trash');

    },

    GetAdminChaptersImage: async (req, res) => {
        Product.findById({_id:req.params.id}, function (err, product) {
            if (err) {
                console.log(err);
                res.redirect('/admin/product_image');
            } else {
                res.render('admin/product/product_image', {
                    name: product.name,
                    product: product.product,
                    content: product.content,
                    slug: product.slug,
                    description: product.description,
                    id: product._id,
                });
            }
        });
    },
    
    PutAdminChaptersImage:function (req, res) {
        Product.findOne({_id:req.params.id}, function (err, product) {
            var image = req.file;
            if(image){
                product.image = req.file.filename;
                product.save(function (err) {
                    if (err){
                        console.log(err);
                    }

                    req.flash('success', 'Cập nhật hình ảnh thành công.');
                    res.redirect('/admin/products');
                });
            }
            else{
                req.flash('error', 'Bạn chưa chọn ảnh!');
                res.render('admin/product/product_image',{
                    id: product._id,
                    name: product.name,
                });
            }
            
        });
    },
        
}
module.exports = adminProducts;