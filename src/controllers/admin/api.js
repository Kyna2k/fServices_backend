const { Response, Page, FailResponse } = require("../../models/response");
const { skipPage } = require("../../common/helper");
const Report = require("../../models/report.model");
const Mistake = require("../../models/mistake.model");


class AdminAPIController {
  getListReport = async (req, res) => {
    const { page, myHandle,pageSize } = req.query;
    const perPage = pageSize ?? 10;
    const _page = page || 1;
    const skip = skipPage({ perPage: perPage, page: _page });
    let id = null;
    let status = 0;
    const _myHandle = myHandle ?? 0;
    if (_myHandle == 1) {
      id = req["id"];
      status = 1;
    }
    const data = await Report.find({ user_handle: id, status: status })
      .populate("room", "name")
      .populate("type")
      .populate("user_create", "name phone")
      .populate("user_handle", "name phone")
      .populate("mistake", "from description")
      .sort({ createdAt: -1 }) // 1 -1
      .skip(skip)
      .limit(perPage);
    let count =  0;

    if (_myHandle == 1) {
       count = await Report.find({user_handle: id}).count();
    }else {
      count = await Report.find().count();
    }
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
      const { page, pageSize } = req.query;
      const perPage = pageSize ?? 10;
      const _page = page || 1;
      const skip = skipPage({ perPage: perPage, page: _page });
      const newReport = await Report.find({ user_handle: id })
        .populate("room", "name")
        .populate("type", "name time_handle")
        .populate("user_handle")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage);
      const count = await Report.find({user_handle: id}).count();
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
  getDetailReport = async (req, res) => {
    const { id } = req.params;
    try {
      const detailReport = await Report.findById(id)
        .populate("room", "name")
        .populate("type", "name time_handle")
        .populate("user_create")
        .populate("user_handle");
      return res.json(
        new Response({
          data: detailReport,
        })
      );
    } catch (error) {
      console.log(error);
      return res.json(
        new FailResponse({ status: 400, message: "Không thể lấy dữ liệu " })
      );
    }
  };
  acceptReport = async (req, res) => {
    const user_handle = req["id"];
    const { id } = req.params;
    try {
      const detailReport = await Report.findByIdAndUpdate(
        id,
        { user_handle: user_handle, status: 1, accept_report: Date.now() },
        { new: true }
      )
        .populate("room", "name")
        .populate("type", "name time_handle")
        .populate("user_create")
        .populate("user_handle");
      return res.json(
        new Response({
          data: detailReport,
        })
      );
    } catch (error) {
      console.log(error);
      return res.json(
        new FailResponse({ status: 400, message: "Không thể lấy dữ liệu" })
      );
    }
  };
  doneReport = async (req, res) => {
    const { id } = req.params;
    const {from,description} = req.body;
    try {
      if(!from){
        throw new Error('Thiếu trường');
      }
      const mistake = await (new Mistake({from : from, description: description ?? ''}));
      const detailReport = await Report.findByIdAndUpdate(
        id,
        { status: 2, done_report: Date.now(), mistake: mistake._id },
        { new: true }
      )
        .populate("room", "name")
        .populate("type", "name time_handle")
        .populate("user_create")
        .populate("user_handle");
      return res.json(
        new Response({
          data: detailReport,
        })
      );
    } catch (error) {
      console.log(error);
      return res.json(
        new FailResponse({ status: 400, message: error })
      );
    }
  };
  cancelReport = async (req, res) => {
    const { id } = req.params;
    const {from,description} = req.body;
    try {
      if(!from || !description ){
        throw 'Khi hủy report vui lòng điền đủ thông tin lỗi từ ai, và mô tả';
      }
      
      const mistake = await (new Mistake({from : from, description: description ?? ''}));
      const detailReport = await Report.findByIdAndUpdate(
        id,
        { status: -1, done_report: Date.now(), mistake: mistake._id },
        { new: true }
      )
        .populate("room", "name")
        .populate("type", "name time_handle")
        .populate("user_create")
        .populate("user_handle");
      return res.json(
        new Response({
          data: detailReport,
        })
      );
    } catch (error) {
      console.log(error);
      return res.json(
        new FailResponse({ status: 400, message: error })
      );
    }
  };
}
module.exports = new AdminAPIController();
