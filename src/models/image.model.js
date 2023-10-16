const mongoose = require('mongoose');
const createSchema = require('./schema');
const image = createSchema({
    id_report: {type: mongoose.Schema.Types.ObjectId, ref: 'report'},
    image : {type: Array}
})
module.exports = mongoose.model('image',image);