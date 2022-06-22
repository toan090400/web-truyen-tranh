var mongoose = require('mongoose');
var URLSlug = require("mongoose-slug-generator");
var mongooseDelete = require('mongoose-delete');

// History Schema
var HistorySchema = mongoose.Schema({
    chapter:{
        type: String,
        require: true
    },
    product:{
        type: String,
        require: true
    },
    image:{
        type: String,
        require: true
    },
    userId:{
        type: String,
        require: true
    },

    
},{
    timestamps: true,
});

mongoose.plugin(URLSlug);
HistorySchema.plugin(mongooseDelete, { deletedAt : true, overrideMethods: 'all' });

var History = module.exports = mongoose.model('History',HistorySchema);
