const {
  Response,
  Page,
  FailResponse,
  ErrorServerResponse,
} = require("../../models/response");
const cloudinary = require("../../common/cloudinary");
const { skipPage } = require("../../common/helper");
const Report = require("../../models/report.model");
const Room = require("../../models/room.model");
const TypeReport = require("../../models/typereport.model");
class TeachAPIController {

    getCreateReport = async (req, res) => {
        try {
          const listRoom = await Room.find();
          const listTypeReport = await TypeReport.find();
          return res.json(
            new Response({
              data: {
                listRoom,
                listTypeReport,
              },
            })
          );
        } catch (error) {
          console.log(error);
          return res.json(new ErrorServerResponse());
        }
      };
  createReport = async (req, res) => {
    try {
      const { files } = req;
      const images = [];
      console.log(files);
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const image = await cloudinary.uploader.upload(files[i].path);
          console.log(image);

          images.push(image.url);
        }
      }
      const { room, type, description, user_create } = req.body;
      if (room && user_create) {
        const makeReport = await new Report({
          room: room,
          type: type,
          description: description,
          user_create: user_create,
          images: images,
          status : 0
        }).save();
        return res.json(new Response({ data: makeReport }));
      } else {
        return res.json(
          new new FailResponse({
            status: 400,
            message: "Chưa nhập đủ trường",
          })()
        );
      }
    } catch (error) {
      console.log(error);
      return res.json(new ErrorServerResponse());
    }
  };
  
  getHistoryReports = async (req, res) => {
    const id = req["id"];
    try {
      const { page } = req.query;
      const perPage = 3;
      const _page = page || 1;
      const skip = skipPage({ perPage: perPage, page:_page });
      const newReport = await Report.find({ user_create: id })
        .populate("room", "name")
        .populate("type", "name time_handle")
        .populate("user_handle")
        .sort({createdAt: -1})
        .skip(skip)
        .limit(perPage)

      const count = await Report.find({}).count();
      return res.json(
        new Response({
          data: new Page({
            data: newReport,
            currentPage: parseInt(_page),
            totalPage: Math.ceil(count / perPage),
          }),
        })
      );
    } catch (e) {
      return res.json(
        new FailResponse({ status: 400, message: "Không thể lấy dữ liệu " })
      );
    }
  };
}

module.exports = new TeachAPIController();
