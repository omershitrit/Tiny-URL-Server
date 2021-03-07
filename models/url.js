const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;
const UrlSchema = new Schema({
    key: String,
    value: String
});

// Model
const Url = mongoose.model('Url', UrlSchema);
module.exports = Url;