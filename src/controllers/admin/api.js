const { Response, Page, FailResponse } = require("../../models/response");
const { skipPage } = require("../../common/helper");
const Report = require("../../models/report.model");
const { ObjectId } = require("mongodb");

class AdminAPIController {
  getListReport = async (req, res) => {
    const { page, myHandle } = req.query;
    const perPage = 10;
    const _page = page || 1;
    const skip = skipPage({ perPage: perPage, page: _page });
    let id = null;
    let status = 0;
    const _myHandle = myHandle ?? 0
    if (_myHandle == 1) {
      id = req["id"];
      status = 1;
    }
    console.log(_myHandle == true,id, status);
    const data = await Report.find({ user_handle: id, status: status })
      .populate("room", "name")
      .populate("type")
      .populate("user_create", "name phone")
      .populate("user_handle", "name phone")
      .populate("mistake", "from description")
      .sort({ createAT: 1 }) // 1 -1
      .skip(skip)
      .limit(perPage);
    const count = await Report.find({}).count();
    return res.json(
      new Response({
        data: new Page({
          data: data,
          currentPage: _page,
          totalPage: Math.ceil(count / perPage),
        }),
      })
    );
  };
  getHistoryReports = async (req, res) => {
    const id = req["id"];
    try {
      const { page } = req.query;
      const perPage = 1;
      const _page = page || 1;
      const skip = skipPage({ perPage: perPage, page: _page });
      const newReport = await Report.find({ user_handle: id })
        .populate("room", "name")
        .populate("type", "name time_handle")
        .populate("user_handle")
        .sort({ createAT: 1 })
        .skip(skip)
        .limit(perPage);
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
        console.log(e);
      return res.json(
        new FailResponse({ status: 400, message: "Không thể lấy dữ liệu " })
      );
    }
  };
}
module.exports = new AdminAPIController();
