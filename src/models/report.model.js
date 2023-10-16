const mongoose = require('mongoose');
const createSchema = require('./schema');
const report = createSchema({
   room: {type: mongoose.Schema.Types.ObjectId, ref: 'room'},
   type: {type: mongoose.Schema.Types.ObjectId, ref: 'typeReport'},
   content: {type: String},
   user_create: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
   user_handle: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
   mistake: {type: mongoose.Schema.Types.ObjectId, ref: 'mistake'},
   description: {type: String},
   status: {type: Number},
   rating : {type: Number},
   accept_report : {type: Date},
   done_report : {type: Date},
});

module.exports = mongoose.model('report',report);