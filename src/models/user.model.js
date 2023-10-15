const mongoose = require('mongoose');
const Schema = mongoose.Schema 

const user = new Schema({
    email : {type: String,unique: true},
    role: {type: Schema.Types.ObjectId, ref: 'role'},
    name: {type: String},
    phone: {type: String, unique: true},
    available : {type: Boolean, default: true},
    deleteAt: {type: Date, default: null}
},{timestamps: true})

module.exports = mongoose.model('user', user);