const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String
    },

    source:{
        type:String
    },

    link:{
        type:String,
        unique:true
    },

    category:{
        type:String
    },

    severity:{
        type:String,
        default:"Unknown"
    },

    

    publishedAt:{
        type:Date
    }

});

module.exports = mongoose.model("News",newsSchema);