var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');



// Set up connect to db
var config = require('./config/db.js');
mongoose.connect(config.database);
var db  = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function() {
    console.log('Connection to MongoDB');
});

// Set Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// View engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

// Set public folder
app.use(express.static(path.join(__dirname,'public')));

// Set express session middleware
app.use(session({
    secret: 'keyboard cat',
    // resave: false,
    resave: true,
    saveUninitialized: true,
    // cookie: {secure: true}
    cookie: {},
}));

// Set methodOverride
app.use(methodOverride('_method'));

// Passport Config
require('./config/passport')(passport);
require('./config/passport_google')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});


// Set express-messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Get Category Model
var Category = require('./models/category');
// Get all categories to pass to header.ejs
Category.find(function (err, categorys) {
    if (err) {
        console.log(err);
    } else {
        app.locals.categorys = categorys;
    }
});

app.get('*', function(req,res,next) {
    // res.locals.cart = req.session.cart;
    res.locals.user = req.user || null;
    next();
});

// Set routers
var adminChapters = require('./router/adminChapters');
var adminProducts = require('./router/adminProducts');
var adminUsers = require('./router/adminUsers.js');
var adminCategorys = require('./router/adminCategorys.js');
var search = require('./router/search.js');
var history = require('./router/history.js');
var chapter = require('./router/chapter.js');
var product = require('./router/product.js');
var category = require('./router/category.js');
var auth = require('./router/auth.js');
var user = require('./router/user.js');
var home = require('./router/home.js');

app.use('/',home);
app.use('/user',user);
app.use('/auth',auth);
app.use('/categorys',category);
app.use('/products',product);
app.use('/chapters',chapter);
app.use('/history',history);
app.use('/search',search);
app.use('/admin/categorys',adminCategorys);
app.use('/admin/users',adminUsers);
app.use('/admin/products',adminProducts);
app.use('/admin/chapters',adminChapters);

app.get('*',(req, res)=>{
    res.render('404',{ title:"Lỗi không xác định"});
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});