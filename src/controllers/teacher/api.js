const { Response,Page } = require("../../models/response")
const cloudinary = require('../../common/cloudinary')
const {skipPage} = require('../../common/helper')
const Report = require('../../models/report.model')
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

module.exports = new TeachAPIController();