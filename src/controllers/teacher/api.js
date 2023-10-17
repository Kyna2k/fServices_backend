const { Response, FailResponse } = require("../../models/response")
const cloudinary = require('../../common/cloudinary')
const GenToken = require("../../common/gentoken");
const Room = require('../../models/room.model');
const Mistake = require('../../models/mistake.model');
const JWT = require('jsonwebtoken');
class TeachAPIController {
    getListSu = async (req,res) => {
        const {files} = req
        const images = [];
        //tải hình lên nhiều hình
        for(let i = 0 ;  i < files.length; i++){
           const image = await cloudinary.uploader.upload(files[i].path)
           images.push(image.url);
        }
        
        return res.json(new Response({message: "Thành công", data: images}));
    };
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
    }
};

module.exports = new TeachAPIController();