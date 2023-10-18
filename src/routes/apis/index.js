const express = require("express");
const route = express.Router();
const AuthController = require('../../controllers/authen/index');
const TeacherController = require('../../controllers/teacher/api');
const AdminController = require('../../controllers/admin/api')
const auth = require("../../middlewares/authencation.middleware");
const {roleTeacher,roleManager,roleAdmin} = require("../../middlewares/role.middleware")
const Role = require('../../models/role.model');
const upload = require("../../common/uploadfile");
const Room = require("../../models/room.model");

//AUT API 
route.post('/login',AuthController.login);
route.post('/refresh-token',AuthController.refreshToken);


//API TEACHER
// route.post('/getlichsu',upload.array('image'),TeacherController.addImage);
route.post('/add-room',[auth,roleTeacher],TeacherController.addRoom);
route.post('/add-mistake',[auth,roleTeacher],TeacherController.addMistake);
route.post('/create-report',upload.array('images'),[auth,roleTeacher],TeacherController.createReport);
route.get('/get-list-report',[auth,roleTeacher],TeacherController.getListReport);

//API MANAGER
route.get('/get-view-list-report',[auth,roleAdmin],AdminController.viewListReport);



//APITESTING
route.post('/addRole',async (req,res) =>{
    const{name} = req.body;
    const role = await (new Role({name: name})).save();
    return res.json(role);
});
route.post('/type',TeacherController.suLy);






module.exports = route