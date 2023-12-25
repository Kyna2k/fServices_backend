const mongoose = require('mongoose');
const createSchema = require('./schema');
const admin = createSchema({
    username : {type: String, unique: true},
    password : {type: String}
})
module.exports = mongoose.model('admin',admin);