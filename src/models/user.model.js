const createSchema = require('./schema');
const mongoose = require('mongoose');
const user = createSchema({
    email : {type: String,unique: true},
    role: {type: mongoose.Schema.Types.ObjectId, ref: 'role'},
    name: {type: String},
    phone: {type: String, unique: true},
    device_token: {type: String},
    available : {type: Boolean, default: true},
    deleteAt: {type: Date, default: null}
});

module.exports = mongoose.model('user', user);