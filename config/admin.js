exports.isAdmin = function(req, res, next) {
    if (req.isAuthenticated() && res.locals.user.admin == 1) {
        next();
    } else {
        req.flash('error', 'Hãy đăng nhập tài khoản "Quản lý".');
        res.redirect('/');
    }
}

exports.isUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', 'Hãy đăng nhập tài khoản.');
        res.redirect('/');
    }
}