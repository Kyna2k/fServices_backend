const express = require("express");
const route = express.Router();
const AuthController = require('../../controllers/authen/index');
const TeacherController = require('../../controllers/teacher/api');
const auth = require("../../middlewares/authencation.middleware");
const {roleTeacher,roleManager} = require("../../middlewares/role.middleware")
const Role = require('../../models/role.model');
const upload = require("../../common/uploadfile");
const Room = require("../../models/room.model");

//AUT API 
route.post('/login',AuthController.login);
route.post('/refresh-token',AuthController.refreshToken);


//API TEACHER
route.post('/getlichsu',upload.array('image'),TeacherController.getListSu);
route.post('/add-room',[auth,roleTeacher],TeacherController.addRoom);
route.post('/add-mistake',[auth,roleTeacher],TeacherController.addMistake);


//API MANAGER

route.post('/getlichsu',TeacherController.getListSu)



//APITESTING
route.post('/addRole',async (req,res) =>{
    const{name} = req.body;
    const role = await (new Role({name: name})).save();
    return res.json(role);
});







module.exports = route