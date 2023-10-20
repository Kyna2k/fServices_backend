const express = require("express");
const route = express.Router();
const AutWebController = require('../../controllers/cpanel/aut')

route.get('/',AutWebController.index)
route.post('/',AutWebController.login)


module.exports = route;