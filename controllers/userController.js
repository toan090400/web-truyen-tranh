var User = require('../models/user');
var { validationResult } = require('express-validator');
var passport = require('passport');
var bcrypt = require('bcryptjs');

var user = {

    GetRegister: async (req, res) => {
        res.render('register', {
            title: 'Đăng ký',
        })
    },
    PostRegister: function (req, res) {
        var password = req.body.password;
        var password_confirm = req.body.password_confirm;

        if (!(password == password_confirm)) {
            req.flash('error', 'Mật khẩu không chính xác!');
            res.render('register', {
                title: 'Đăng ký',
                user: null,
            });
        }
        else {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                // return res.status(422).jsonp(errors.array())
                const alert = errors.array()
                res.render('register', {
                    alert,
                    user: null,
                    title: 'Đăng ký',
                })
            }
            else {
                User.findOne({ username: req.body.username }, function (err, user) {
                    if (user) {
                        req.flash('error', `Tài khoản "${req.body.username}" đã tồn tại!`);
                        res.redirect('/user/register');
                    }
                    else {

                        var user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            username: req.body.username,
                            password: req.body.password,
                            admin: 0,
                        });

                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(user.password, salt, function (err, hash) {
                                if (err) {
                                    console.log(err);
                                }
                                user.password = hash;

                                user.save();
                                req.flash('success', `Chào mừng đến với "Website Story".`);
                                res.redirect('/user/register')

                            });
                        });
                    }
                })
            }
        }
    },

    GetLogin: async (req, res) => {
        res.render('login', {
            title: 'Đăng nhập',
        })
    },

    PostLogin: function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        if (username == "" || password == "") {
            req.flash('error', `Thiếu thông tin đăng nhập!`);
            res.redirect('/user/login');
        }
        else {
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/user/login',
                failureFlash: true
            })
                (req, res, next);
        }


    },

    GetLogout: function (req, res) {

        req.logout();

        req.flash('success', 'Đăng xuất thành công.');
        res.redirect('/user/login');

    },

    GetInformation: function (req, res) {
        User.findOne({ username: req.params.username }, function (err, account) {
            if (err) {
                return console.log(err);
            }

            res.render('information', {
                title: `Tài khoản "${account.username}"`,
                name: account.name,
                email: account.email,
                username: account.username,
                id: account._id,
            });
        });

    },

    PutInformationUpdate:function (req, res) {
        User.findOne({username: req.body.username}, function (err, user) {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                // return res.status(422).jsonp(errors.array())
                const alert = errors.array()
                res.render('information', {
                    alert,
                    user: user,
                    title:`Tài khoản "${req.body.username}"`,
                })
            }
            else{
                user.name = req.body.name;
                user.email = req.body.email;
        
                user.save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        req.flash('success', 'Cập nhật thông tin thành công.');
                        res.redirect(`/user/information/${req.body.username}`)
                    }
                });
            }
        }) 
        
    },

    GetChangePassword: function (req, res) {
        User.findOne({ _id: req.params.id }, function (err, account) {
            if (err) {
                return console.log(err);
            }

            res.render('change_password', {
                title: `Đổi mật khẩu tài khoản ${account.username}`,
                username: account.username,
                id: account._id,
            });
        });

    },

    PutInformationUpdatePassword:function (req, res) {
        var password = req.body.password;
        var password_confirm = req.body.password_confirm;
        User.findOne({_id: req.params.id}, function (err, user) {

            if (!(password == password_confirm)) {
                req.flash('error', 'Mật khẩu không chính xác!');
                res.render('change_password', {
                    title: `Đổi mật khẩu tài khoản ${user.username}`,
                    user: user,
                });
            }
            else{
                const errors = validationResult(req)
                if(!errors.isEmpty()) {
                    // return res.status(422).jsonp(errors.array())
                    const alert = errors.array()
                    res.render('change_password', {
                        alert,
                        user: user,
                        title:`Đổi mật khẩu tài khoản ${user.username}`,
                    })
                }
                else{
                    user.password = req.body.password;

                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(user.password, salt, function (err, hash) {
                            if (err) {
                                console.log(err);
                            }
                            user.password = hash;

                            user.save();
                            req.flash('success', `Cập nhật mật khẩu thành công.`);
                            res.render('change_password', {
                                user: user,
                                title:`Đổi mật khẩu tài khoản ${user.username}`,
                            })

                        });
                    });
                }
            }
        }) 
    },



}
module.exports = user;