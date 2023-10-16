const { Response } = require("../../models/response")
const cloudinary = require('../../common/cloudinary')
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
    }
}

module.exports = new TeachAPIController();