const { Response } = require("../../models/response")

class TeachAPIController {
    getListSu = async (req,res) => {
        console.log(req.files)
        return res.json(new Response({message: "Thành công", data: null}));
    }
}

module.exports = new TeachAPIController();