const mongoose = require('mongoose');
const createSchema = require('./schema');
const typeReport = createSchema({
    name : {type: String, unique: true},
    time_handle : {type: String}
})
module.exports = mongoose.model('typeReport',typeReport);