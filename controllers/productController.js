var Chapter = require('../models/chapter');
var Product = require('../models/product');

var product = {
    GetLinkPdoductDetail: function (req, res) {
        Product.findOne({name: req.params.product}, function (err, product) {
            Chapter.find({product: req.params.product}, function (err, chapters) {
                res.render('product_detail', {
                    title: product.name,
                    product: product,
                    chapters: chapters,
                    quantity: chapters.length,
                });
            });
            
        });
        
    },

        
}
module.exports = product;