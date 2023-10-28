const express = require("express");
const route = express.Router();
const AuthController = require('../../controllers/authen/index');
const TeacherController = require('../../controllers/teacher/api');
const AdminController = require('../../controllers/admin/api')
const auth = require("../../middlewares/authencation.middleware");
const {roleTeacher,roleManager,roleAdmin} = require("../../middlewares/role.middleware")
const Role = require('../../models/role.model');
const upload = require("../../common/uploadfile");
const Test = require ('../../controllers/test/api');



//AUT API 
route.post('/login',AuthController.login);
route.post('/refresh-token',AuthController.refreshToken);


//API TEACHER
route.get('/create-report',[auth,roleTeacher],TeacherController.getCreateReport);
route.post('/create-report',upload.array('images'),[auth,roleTeacher],TeacherController.createReport);

route.get('/get-teacher-history-reports',[auth,roleTeacher],TeacherController.getHistoryReports);
route.get('/teacher-get-detail-report/:id',[auth,roleTeacher],TeacherController.getDetailReport);

//API ADMIN
route.get('/get-list-report',[auth,roleAdmin],AdminController.getListReport);
route.get('/get-admin-history-reports',[auth,roleAdmin],AdminController.getHistoryReports);
route.get('/get-detail-report/:id',[auth,roleAdmin],AdminController.getDetailReport);
route.post('/accept-report/:id',[auth,roleAdmin],AdminController.acceptReport);
route.post('/done-report/:id',[auth,roleAdmin],AdminController.doneReport);
route.delete('/cancel-report/:id',[auth,roleAdmin],AdminController.cancelReport);

//API MANAGER






//APITESTING
route.post('/addRole',async (req,res) =>{
    const{name} = req.body;
    const role = await (new Role({name: name})).save();
    return res.json(role);
});
route.post('/type',Test.addTypeReport);
route.post('/add-room',Test.addRoom);
route.post('/add-mistake',Test.addMistake);






module.exports = route