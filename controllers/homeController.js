var Category = require('../models/category');
var Product = require('../models/product');
var Chapter = require('../models/chapter');

var home = {

    GetHome: function (req, res, next){
        let perPage = 6; // số lượng sản phẩm xuất hiện trên 1 page
        let page = req.params.page || 1; 

        Chapter
        .find() // find tất cả các data
        .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage)
        .sort({createdAt: -1})
        .exec((err, products) => {
            Chapter.countDocuments((err, count) => { // đếm để tính xem có bao nhiêu trang
                if (err) return next(err);
                res.render('index', {
                    products : products, // sản phẩm trên một page
                    current: page, // page hiện tại
                    pages: Math.ceil(count / perPage), // tổng số các page
                    title: "Home",
                });
            });
        });
    },
    GetHomePage: function (req, res, next){
        let perPage = 6; // số lượng sản phẩm xuất hiện trên 1 page
        let page = req.params.page || 1; 
      
        Chapter
            .find() // find tất cả các data
            .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage)
            .sort({createdAt: -1})
            .exec((err, products) => {
                Chapter.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
                    if (err) return next(err);
                    res.render('index', {
                        products, // sản phẩm trên một page
                        current: page, // page hiện tại
                        pages: Math.ceil(count / perPage), // tổng số các page
                        title: "Home",
                    });
                });
            });
    },
    

        
}
module.exports = home;