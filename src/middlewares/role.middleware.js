const {Response, FailResponse} = require('../models/response');
const roleTeacher = async (req,res, next) => {
     if(req['role'] != "TEACHER") return res.json(new FailResponse({status: 401, message: "you don't have role for this"}));
     next();

}
const roleAdmin= async (req,res, next) => {
    if(req['role'] != "ADMIN") return res.json(new FailResponse({status: 401, message: "you don't have role for this"}));
    next();
}
const roleManager = async (req,res, next) => {
    if(req['role'] != "MANAGER") return res.json(new FailResponse({status: 401, message: "you don't have role for this"}));
    next();
}
module.exports = {roleTeacher,roleAdmin,roleManager};
