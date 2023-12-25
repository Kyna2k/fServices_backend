const mongoose = require('mongoose');
const createSchema = require('./schema');
const role = createSchema({name: {type: String, unique : true}});

module.exports = mongoose.model('role',role);