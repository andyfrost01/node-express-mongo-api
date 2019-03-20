const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user: String,
    email: String
});

module.exports = user = mongoose.model('user', UserSchema);