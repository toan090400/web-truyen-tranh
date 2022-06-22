var mongoose = require('mongoose');
var URLSlug = require("mongoose-slug-generator");
var mongooseDelete = require('mongoose-delete');

// Category Schema
var ChapterSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    image:{
        type: String,
    },
    content: [
        {
            type: Object,
        }
    ],
    product:{
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
ChapterSchema.plugin(mongooseDelete, { deletedAt : true, overrideMethods: 'all' });

var Chapter = module.exports = mongoose.model('Chapter',ChapterSchema);
