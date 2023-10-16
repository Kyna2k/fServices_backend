const mongoose = require('mongoose');
const createSchema = require('./schema');
const mistake = createSchema({
    from: {type: String},
    description : {type: String}
});

module.exports = mongoose.model('mistake',mistake);