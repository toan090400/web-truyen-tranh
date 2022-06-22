var Chapter = require('../models/chapter');
var Product = require('../models/product');


var chapter = {
    GetLinkChapter:function(req,res){
    
        Product.findOne({name: req.params.product}, function (err, product) {
            Chapter.find({product: req.params.product}, function (err, chapters) {
                var chapterLength = Number(chapters.length);
                Chapter.findOne({
                    name: req.params.name,
                    product: req.params.product,
                }, function (err, chapter) {
                    if(err) {
                        return console.log(err);
                    }
                    var name =Number(chapter.name);
                    res.render('chapter',{
                        name: name,
                        chapterLength,
                        next: name+1,
                        previous: name-1,
                        id: product._id,
                        image: product.image,
                        product:chapter.product,
                        content: chapter.content,
                        title: `${chapter.product}:${chapter.name}`,
                    });
                });
            });
        });
    }
}
module.exports = chapter;