var Category = require('../models/category');
var Product = require('../models/product');


var category = {
    GetCategorys: function (req, res, next) {
        let perPage = 6; // số lượng sản phẩm xuất hiện trên 1 page
        let page = req.params.page || 1; 
    
        Product
        .find() // find tất cả các data
        .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage)
        .exec((err, products) => {
            Product.countDocuments((err, count) => { // đếm để tính xem có bao nhiêu trang
                if (err) return next(err);
                res.render('product_all', {
                    products : products, // sản phẩm trên một page
                    current: page, // page hiện tại
                    pages: Math.ceil(count / perPage), // tổng số các page
                    title: "All product",
                });
            });
        });
    },
    GetCategorysPage: function (req, res, next){
        let perPage = 6; // số lượng sản phẩm xuất hiện trên 1 page
        let page = req.params.page || 1; 
      
        Product
            .find() // find tất cả các data
            .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage)
            .exec((err, products) => {
                Product.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
                    if (err) return next(err);
                    res.render('product_all', {
                        products, // sản phẩm trên một page
                        current: page, // page hiện tại
                        pages: Math.ceil(count / perPage), // tổng số các page
                        title: "All product",
                    });
                });
            });
    },
    GetLinkProductCategorys: function (req, res, next) {
        Category.findOne({name: req.params.name}, function (err, category) {
            if (category) {
                let perPage = 6; // số lượng sản phẩm xuất hiện trên 1 page
                let page = req.params.page || 1; 
                Product
                    .find({category: req.params.name}) // find tất cả các data
                    .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                    .limit(perPage)
                    .exec((err, products) => {
                        Product
                        .find({category: req.params.name})
                        .countDocuments((err, count) => { // đếm để tính xem có bao nhiêu trang
                            if (err) return next(err);
                            res.render('product_category', {
                                products : products, // sản phẩm trên một page
                                current: page, // page hiện tại
                                pages : Math.ceil(count / perPage), // tổng số các page
                                title: category.name,
                                description: category.description,
                                name: category.name,
                                
                            });
                        });
                    });
            }
            
        });
        
    },
    GetProductCategorysPage: function (req, res, next){
        Category.findOne({name: req.params.name}, function (err, category) {
            let perPage = 6; // số lượng sản phẩm xuất hiện trên 1 page
            let page = req.params.page || 1; 
        
            Product
            .find({category: req.params.name}) // find tất cả các data
            .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage)
            .exec((err, products) => {
                Product
                .find({category: req.params.name})
                .countDocuments((err, count) => { // đếm để tính xem có bao nhiêu trang
                    if (err) return next(err);
                    res.render('product_category', {
                        products : products, // sản phẩm trên một page
                        current: page, // page hiện tại
                        pages: Math.ceil(count / perPage), // tổng số các page
                        title: category.name,
                        description: category.description,
                        name: category.name,
                    });
                });
            });
        });
    },
}
module.exports = category;