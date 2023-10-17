const { Response,Page, FailResponse } = require("../../models/response")
const cloudinary = require('../../common/cloudinary')
const {skipPage} = require('../../common/helper')
const Report = require('../../models/report.model')
const GenToken = require("../../common/gentoken");
const Room = require('../../models/room.model');
const Mistake = require('../../models/mistake.model');
const JWT = require('jsonwebtoken');
class TeachAPIController {
    getListSu = async (req,res) => {
        // const {page, user_create} = req.query;
        // const perPage = 10;
        // const _page = page || 1
        // const skip = skipPage({perPage,_page})
        // const data = await Report.find({user_create})
        //                             .populate('room','name')
        //                             .populate('type')
        //                             .populate('user_create','name phone')
        //                             .populate('user_handle','name phone')
        //                             .populate('mistake','from description')
        //                             .sort({createAT: 1}) // 1 -1
        //                             .skip(skip)
        //                             .limit(perPage)
        // const count = await Report.find({}).count();
        // return res.json(new Response({
        //     data: new Page({
        //         data: data,
        //         currentPage: _page,
        //         totalPage: Math.ceil(count/perPage)
        //     })
        // }))
        const {page,user_handle,status } = req.query;
        const perPage = 10;
        const _page = page || 1
        const skip = skipPage({perPage,_page})
        const _userHandle = {"$regex" : user_handle ?? "", "$option": "i"}
        const data = await Report.find({user_handle: _userHandle, status: status})
                                    .populate('room','name')
                                    .populate('type')
                                    .populate('user_create','name phone')
                                    .populate('user_handle','name phone')
                                    .populate('mistake','from description')
                                    .sort({createAT: 1}) // 1 -1
                                    .skip(skip)
                                    .limit(perPage)
        const count = await Report.find({}).count();
        return res.json(new Response({
            data: new Page({
                data: data,
                currentPage: _page,
                totalPage: Math.ceil(count/perPage)
            })
        }))
    }
}
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