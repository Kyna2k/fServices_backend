
const express = require("express");
const route = express.Router();
const AuthWeb = require('../../middlewares/authencation.middleware.web');
const UserController = require('../../controllers/cpanel/user')
route.get('/',[AuthWeb],UserController.index)
route.get('/create',[AuthWeb],UserController.store)
route.post('/create',[AuthWeb],UserController.create)
route.get('/update',[AuthWeb],UserController.edit)
route.post('/update',[AuthWeb],UserController.update)
module.exports = route;