const mongoose = require('mongoose');
const Schema = mongoose.Schema 
const role = new Schema({
    name: {type: String, unique : true}
},{
    timestamps: true
})

module.exports = mongoose.model('role',role);