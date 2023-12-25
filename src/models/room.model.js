const mongoose = require('mongoose');
const createSchema = require('./schema');
const room = createSchema({
    name: {type: String},
});

module.exports = mongoose.model('room',room);