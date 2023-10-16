const mongoose = require('mongoose');
const Schema = mongoose.Schema 
const createSchema = (object) => {
    return new Schema(object,{timestamps: true})
}
module.exports = createSchema;