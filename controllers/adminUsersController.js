var User = require('../models/user');
var { validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');

var adminUser = {

    GetAdminUsers: async (req, res) => {
        var users = await User.find({admin: [0,1]});
        if(users){
            res.render('admin/user/users',{
                users: users,
            })
        }
    },

    GetAdminUsersGoogle: async (req, res) => {
        var users = await User.find({admin: ""});
        if(users){
            res.render('admin/user/user_google',{
                users: users,
            })
        }
    },

    GetAdminUsersAdd: async (req, res) => {
        res.render('admin/user/user_add');
    },

    PostAdminUsersAdd:function (req, res) {
        var password = req.body.password;
        var password_confirm = req.body.password_confirm;
        var user = User.find({});

        if(!(password == password_confirm)){
            req.flash('error','Mật khẩu không chính xác!');
            res.render('admin/user/user_add',{
                user: user,
            });
        }
        else{
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                // return res.status(422).jsonp(errors.array())
                const alert = errors.array()
                res.render('admin/user/user_add', {
                    alert,
                    user: user,
                })
            }
            else{
                User.findOne({username: req.body.username}, function (err, user) {
                    if(user){
                        req.flash('error', `Tài khoản "${req.body.username}" đã tồn tại!`);
                        res.redirect('/admin/users/user-add');
                    }
                    else{
                        
                        var user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            username: req.body.username,
                            password: req.body.password,
                            admin: req.body.admin,
                        });
                
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(user.password, salt, function (err, hash) {
                                if (err){
                                    console.log(err);
                                }
                                user.password = hash;
                
                                user.save();
                                req.flash('success', `Thêm tài khoản "${req.body.username}" thành công.`);
                                res.redirect('/admin/users')
                            });
                        });
                    }
                })
            }
        }
    },

    GetAdminUsersEdit: async (req, res) => {
        var users = await User.findOne({username:req.params.username});
        if (users) {
            res.render('admin/user/user_update', {
                name: users.name,
                email: users.email,
                username: users.username,
                id: users._id
            });
        }
    },

    PutAdminUsersEdit: function (req, res) {

        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            // return res.status(422).jsonp(errors.array())
            const alert = errors.array()
            res.render('admin/user/user_update', {
                alert,
                name: req.body.name,
                email : req.body.email,
                username: req.body.username,
                id: req.body.id,
            })
        }
        else{

            User.findOne({username: req.body.username}, function (err, user) {
                user.name = req.body.name;
                user.email = req.body.email;
        
                user.save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        req.flash('success', 'Cập nhật thông tin thành công.');
                        res.redirect('/admin/users')
                    }
                });
            }) 
        }
    },

    DeleteAdminUsersDelete: function (req, res) {
        User.delete({username:req.params.username}, function (err) {
            if (err){
                return console.log(err);
            }
            req.flash('success', 'Xóa tài khoản thành công.');
            res.redirect('/admin/users');
        });
    },
    
    GetAdminUsersTrash: async (req, res) => {
        var users = await User.findDeleted({});
        if(users){
            res.render('admin/user/user_trash',{
                users: users,
            })
        }
    },

    PatchAdminUsersRestor:function (req, res) {
        User.restore({username:req.params.username}, function (err) {
            if (err){
                return console.log(err);
            }
            req.flash('success', 'Khôi phục tài khoản thành công.');
            res.redirect('/admin/users/user-trash');
        });
    },

    DeleteAdminUsersDestroy: async (req, res) => {
        var user = await User.findOneAndDelete({username:req.params.username});
        if(!user){
            return console.log(user);
        }
        req.flash('success', 'Xóa vĩnh viễn tài khoản thành công.');
        res.redirect('/admin/users/user-trash');

    },
        
}
module.exports = adminUser;