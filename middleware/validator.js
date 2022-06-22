var { check } = require('express-validator');


var Validator = {

    register: [
        check('name')
            .isLength({min:6})
            .withMessage('Tên hiển thị chứa ít nhất 6 ký tự!')
            .isLength({max:200})
            .withMessage('Tên hiển thị chứa tối đa 200 ký tự!')
            .matches(/^[a-zA-Z0-9]/)
            .withMessage('Tên hiển thị không nhận các ký tự đặc biệt!'),
        check('email')
            .isEmail()
            .withMessage('Vui lòng nhập địa chỉ email!'),
        check('username')
            .isLength({min:6})
            .withMessage('Tài khoản chứa ít nhất 6 ký tự!')
            .isLength({max:100})
            .withMessage('Tài khoản chứa tối đa 100 ký tự!')
            .matches(/^[a-zA-Z0-9]/)
            .withMessage('Tài khoản không nhận các ký tự đặc biệt!'),
        check('password')
            .isLength({min:6})
            .withMessage('Mật khẩu chứa ít nhất 6 ký tự!')
            .isLength({max:100})
            .withMessage('Mật khẩu chứa tối đa 100 ký tự!')
            .matches(/^[a-zA-Z0-9]/)
            .withMessage('Mật khẩu không nhận các ký tự đặc biệt!'),
    
    ],
    password: [
        check('password')
            .isLength({min:6})
            .withMessage('Mật khẩu chứa ít nhất 6 ký tự!')
            .isLength({max:100})
            .withMessage('Mật khẩu chứa tối đa 100 ký tự!')
            .matches(/^[a-zA-Z0-9]/)
            .withMessage('Mật khẩu không nhận các ký tự đặc biệt!'),
    ],
    adminCategorys: [

        check('name')
            .isLength({min:5})
            .withMessage('Thể loại truyện chứa ít nhất 5 ký tự!')
            .isLength({max:255})
            .withMessage('Thể loại truyện chứa tối đa 255 ký tự!')
            .matches(/^[a-zA-Z0-9]/)
            .withMessage('Thể loại truyện không nhận các ký tự đặc biệt!'),
        check('description')
            .isLength({min:6})
            .withMessage('Mô tả chứa ít nhất 6 ký tự!')
            .matches(/^[A-Za-z0-9]/)
            .withMessage('Mô tả không nhận các ký tự đặc biệt!'),
    
    ],
    adminUser: [
        check('name')
            .isLength({min:6})
            .withMessage('Tên hiển thị chứa ít nhất 6 ký tự!')
            .isLength({max:200})
            .withMessage('Tên hiển thị chứa tối đa 200 ký tự!')
            .matches(/^[a-zA-Z0-9]/)
            .withMessage('Tên hiển thị không nhận các ký tự đặc biệt!'),
        check('email')
            .isEmail()
            .withMessage('Vui lòng nhập địa chỉ email!'),
        check('username')
            .isLength({min:6})
            .withMessage('Tài khoản chứa ít nhất 6 ký tự!')
            .isLength({max:100})
            .withMessage('Tài khoản chứa tối đa 100 ký tự!')
            .matches(/^[a-zA-Z0-9]/)
            .withMessage('Tài khoản không nhận các ký tự đặc biệt!'),
        check('password')
            .isLength({min:6})
            .withMessage('Mật khẩu chứa ít nhất 6 ký tự!')
            .isLength({max:100})
            .withMessage('Mật khẩu chứa tối đa 100 ký tự!')
            .matches(/^[a-zA-Z0-9]/)
            .withMessage('Mật khẩu không nhận các ký tự đặc biệt!'),
        check('admin')
            .notEmpty()
            .withMessage('Chọn loại tài khoản!'),
    
    ],
    adminUserUpdate: [
        check('name')
            .isLength({min:6})
            .withMessage('Tên hiển thị chứa ít nhất 6 ký tự!')
            .isLength({max:200})
            .withMessage('Tên hiển thị chứa tối đa 200 ký tự!')
            .matches(/^[a-zA-Z0-9]/)
            .withMessage('Tên hiển thị không nhận các ký tự đặc biệt!'),
        check('email')
            .isEmail()
            .withMessage('Vui lòng nhập địa chỉ email!'),
    
    ],
    adminProducts: [
        check('name')
            .isLength({min:6})
            .withMessage('Tên truyện chứa ít nhất 6 ký tự!')
            .isLength({max:200})
            .withMessage('Tên truyện chứa tối đa 200 ký tự!'),
        check('description')
            .isLength({min:6})
            .withMessage('Tóm tắt truyện chứa ít nhất 6 ký tự!')
            .matches(/^[A-Za-z0-9]/)
            .withMessage('Tóm tắt truyện không nhận các ký tự đặc biệt!'),
        check('category')
            .isLength({min:1})
            .withMessage('Vui lòng chọn truyện thuộc thể loại!'),
    
    ],
    adminChapters: [
        check('name')
            .isNumeric()
            .withMessage('Số chương chỉ cho phép nhập số!')
            .isLength({min:1})
            .withMessage('Số chương không thể để trống!'),
        check('description')
            .isLength({min:6})
            .withMessage('Tóm tắt chương chứa ít nhất 6 ký tự!')
            .matches(/^[a-zA-Z0-9]/)
            .withMessage('Tóm tắt chương không nhận các ký tự đặc biệt!'),
        check('product')
            .isLength({min:1})
            .withMessage('Vui lòng chọn số chương thuộc truyện!'),
    
    ],
    
}
module.exports = Validator;