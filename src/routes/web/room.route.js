const express = require('express');
const route = express.Router();
const AuthWeb = require('../../middlewares/authencation.middleware.web');
const RoomController = require('../../controllers/cpanel/room');


route.get('/',[AuthWeb],RoomController.index);
route.get('/create',[AuthWeb],RoomController.store)
route.post('/create',[AuthWeb],RoomController.create)
route.get('/update',[AuthWeb],RoomController.edit)
route.post('/update',[AuthWeb],RoomController.update)
module.exports = route;