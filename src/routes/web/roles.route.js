const express = require('express');
const route = express.Router();
const AuthWeb = require('../../middlewares/authencation.middleware.web');
const RoleController = require('../../controllers/cpanel/role');

route.get('/',[AuthWeb],RoleController.index);
route.get('/create',[AuthWeb],RoleController.store)
route.post('/create',[AuthWeb],RoleController.create)
route.get('/update',[AuthWeb],RoleController.edit)
route.post('/update',[AuthWeb],RoleController.update)
module.exports = route;