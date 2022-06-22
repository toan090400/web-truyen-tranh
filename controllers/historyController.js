var History = require('../models/histoty');


var history = {
    GetHistory: async (req, res) =>{
        var historys = await History.find({userId:req.params.id}).sort({product:1});
        if(historys){
            res.render('history',{
                historys: historys,
                title: 'Truyện đã theo dõi'
            })
        }
    },
    PostHistory:function(req,res){
        History.findOne({
            product: req.body.product,
            userId: req.body.userId,
        }, function (err, history) {
            if(history){
                history.chapter = req.body.chapter;
                history.save(function(err) {
                    if(err){
                        return console.log(err);
                    }
                    req.flash('success', 'Theo dõi thành công.');
                    res.redirect('back');
                });
            }
            else{
                var newHistory = new History({
                    chapter: req.body.chapter,
                    product: req.body.product,
                    image: req.body.image,
                    userId: req.body.userId,
                });
                newHistory.save(function(err) {
                    if(err){
                        return console.log(err);
                    }
                    req.flash('success', `Theo dõi thành công.`);
                    res.redirect('back');
                });
            }
        });
    },
    DeleteHistory:function (req, res) {
        History.findByIdAndDelete({_id:req.params.id}, function (err) {
            if (err){
                return console.log(err);
            }
            req.flash('success', 'Hủy theo dõi thành công.');
            res.redirect('back');
        });
    },
}
module.exports = history;