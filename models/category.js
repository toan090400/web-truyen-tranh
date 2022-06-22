var mongoose = require('mongoose');
var URLSlug = require("mongoose-slug-generator");
var mongooseDelete = require('mongoose-delete');

// Category Schema
var CategorySchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    slug:{
        type: String,
        slug: "name",
        unique: true
    },
    
},{
    timestamps: true,
});

mongoose.plugin(URLSlug);
CategorySchema.plugin(mongooseDelete, { deletedAt : true, overrideMethods: 'all' });

var Category = module.exports = mongoose.model('Category',CategorySchema);
