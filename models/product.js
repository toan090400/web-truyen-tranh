var mongoose = require('mongoose');
var URLSlug = require("mongoose-slug-generator");
var mongooseDelete = require('mongoose-delete');

// Category Schema
var ProductSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    image:{
        type: String,
    },
    
},{
    timestamps: true,
});

mongoose.plugin(URLSlug);
ProductSchema.plugin(mongooseDelete, { deletedAt : true, overrideMethods: 'all' });

var Product = module.exports = mongoose.model('Product',ProductSchema);
