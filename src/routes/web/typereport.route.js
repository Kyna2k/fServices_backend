const express = require('express');
const route = express.Router();
const AuthWeb = require('../../middlewares/authencation.middleware.web');
const TypeController = require('../../controllers/cpanel/type');

route.get('/',[AuthWeb],TypeController.index);
route.get('/create',[AuthWeb],TypeController.store)
route.post('/create',[AuthWeb],TypeController.create)
route.get('/update',[AuthWeb],TypeController.edit)
route.post('/update',[AuthWeb],TypeController.update)

module.exports = route;



