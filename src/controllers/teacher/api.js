const { Response,Page, FailResponse } = require("../../models/response")
const cloudinary = require('../../common/cloudinary')
const {skipPage} = require('../../common/helper')
const Report = require('../../models/report.model')
const GenToken = require("../../common/gentoken");
const Room = require('../../models/room.model');
const Mistake = require('../../models/mistake.model');
const CreReport = require('../../models/report.model');
const Type = require('../../models/typereport.model');
const JWT = require('jsonwebtoken');
const roomModel = require("../../models/room.model");
const mistakeModel = require("../../models/mistake.model");
class TeachAPIController {
    
    // addImage = async (req,res) => {
    //     const {files} = req
    //     const images = [];
    //     //tải hình lên nhiều hình
    //     for(let i = 0 ;  i < files.length ; i++){
    //        const image = await cloudinary.uploader.upload(files[i].path)
    //        images.push(image.url);
    //     }
    //     return res.json(new Response({message: "Thành công", data: images}));
    // };
    addRoom = async (req,res) =>{
        const{name} = req.body;
        if(name){
            const room = await (new Room({name: name})).save();
            return res.json(new Response({data: room}));
        }else{
            return res.json(new FailResponse({message: 'Vui lòng nhập tên phòng'}));
        }       
    };
    addMistake = async (req,res) =>{
        const{from, description} = req.body;
        if(from){
            const misTake = await (new Mistake({from: from, description: description})).save();
            return res.json(new Response({ data: misTake}));
        }else{
            return res.json(new FailResponse({message: 'Vui lòng nhập nguyên nhân '}));
        }
    };
    createReport = async (req,res) =>{
        const {files} = req
        const images = [];
        if(files){
            for(let i = 0 ;  i < files.length ; i++){
                const image = await cloudinary.uploader.upload(files[i].path)
                images.push(image.url);
             }
        }
        const {room,type,description,user_create} = req.body;
        if(room && user_create) {
            const makeReport = await (new CreReport({room:room 
                                                    ,type: type,
                                                    description: description,
                                                    user_create: user_create,
                                                    images: images})).save();
            return res.json(new Response ({data:makeReport}));
        }else{
            return res.json(new FailResponse({message:'Bạn chưa nhập đủ các trường'}));
        }
    };
    getListReport = async (req,res) => {
        const id = req['id']
       try {
        const {page} = req.query;
        const perPage = 1;
        const _page = page || 1;
        const skip = skipPage({perPage,_page})
        const newReport = await CreReport.find({user_create: id})  
                                            .populate('room','name')
                                            .populate('type','name time_handle')
                                            .populate('user_handle')
                                            .sort({createAT: 1})
                                            .skip(skip)
                                            .limit(perPage)
        const count = await Report.find({}).count();; 
        return res.json(new Response({
            data : new Page({
                data: newReport,
                currentPage: _page,
                totalPage: Math.ceil(count/perPage)
            })
        }))
       } catch(e) {
        return res.json(new FailResponse({message: 'Không thể lấy dữ liệu '}));
       }
    }; 
    suLy = async (req, res) =>{
        const {name,time_handle} = req.body;
        const result = await (new Type({name , time_handle})).save();
        return res.json(new Response ({data:result}));
    };
        

};

module.exports = new TeachAPIController();