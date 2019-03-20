const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../config');

const StreamSchema = new Schema({
    user: String,
    session: String,
    stream: String,
    start: {
        type: Date,
        default: Date.now,
        expires: config.expireTime
    }
});

module.exports = Stream = mongoose.model('stream', StreamSchema);