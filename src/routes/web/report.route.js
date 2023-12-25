const express = require("express");
const route = express.Router();
const AuthWeb = require('../../middlewares/authencation.middleware.web');
const ReportController = require('../../controllers/cpanel/report');
const autWeb = require("../../middlewares/authencation.middleware.web");

route.get('/',[autWeb],ReportController.index);
route.get('/detail',[autWeb],ReportController.detail);


module.exports = route;