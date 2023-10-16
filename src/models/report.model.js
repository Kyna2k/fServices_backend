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
   status: {type: Number}, // 0 - mới tạo, 1 - là có người xử lý, 2 là xử lý thành công, -1 là hủy
   rating : {type: Number},
   images : {type: Array},
   accept_report : {type: Date},
   done_report : {type: Date},
});

module.exports = mongoose.model('report',report);