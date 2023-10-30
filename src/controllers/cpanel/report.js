const Report = require("../../models/report.model");
const { skipPage } = require("../../common/helper");

class ReportController {
  #layout = "layout/index";

  index = async (req, res) => {
    try {
      const { page } = req.query;
      const perPage = 1;
      const _page = page || 1;
      const skip = skipPage({ perPage: perPage, page: _page });
      const result = await Report.find({})
        .populate("user_create")
        .populate("room", "name")
        .populate("type", "name time_handle")
        .populate("user_handle")
        .populate("mistake")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage);

      const count = await Report.find({}).count();
      if(result)
      {
        return res.render('report/index',{
            layout: this.#layout,
            data: {
                data: result,
                currentPage: parseInt(_page),
                totalPage: Math.ceil(count / perPage),
            }
          })
      }else{
        return res.render("report/index", {
            layout: this.#layout,
            data: [],
          });
      }
      
    } catch (e) {
        console.log(error);
    }
  };
  detail = async (req,res) => {
    try{
    const { id } = req.query;
      const result = await Report.findById(id)
        .populate("user_create")
        .populate("room", "name")
        .populate("type", "name time_handle")
        .populate("user_handle")
        .populate("mistake")
      console.log(result);
      if(result)
      {
        return res.render('report/detail',{
            layout: this.#layout,
            data: result
          })
      }else{
        return  res.redirect('/error')
      }
      
    } catch (e) {
        console.log(error);
    }
  }

}

module.exports = new ReportController();
