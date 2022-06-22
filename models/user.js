var mongoose = require('mongoose');
var mongooseDelete = require('mongoose-delete');

// User Schema
var UserSchema = mongoose.Schema({
    name:{
        type: String,
    },
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    admin: {
        type: Number,
    },
    // Thêm tài khoản bằng Google

    googleId: {
        type: String,
    },
    displayName: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    image: {
        type: String,
    },
    
},{
    timestamps: true,
});

UserSchema.plugin(mongooseDelete, { deletedAt : true, overrideMethods: 'all' });

var User = module.exports = mongoose.model('User',UserSchema);