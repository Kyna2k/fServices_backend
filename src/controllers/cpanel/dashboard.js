const Report = require("../../models/report.model");
const TypeReport = require("../../models/typereport.model");
const moment = require("moment");
class DashBoard {
  #layout = "layout/index";

  index = async (req, res) => {
    const today = moment().set("D", "2023-10-27T12:11:24.818Z").startOf("day");
    try {
      // const type = await TypeReport.aggregate([
      //   {
      //     $lookup: {
      //       from: "reports",
      //       localField: "_id",
      //       foreignField: "type",
      //       as: "report",
      //     },
      //   },
      //   {
      //       $group: {
      //           _id: "$report.type",
      //           count: { $sum: 1 }
      //       }
      //   }
      // ]);
      //   var start = new Date(2010, 11, 1);
      //   var end = new Date(2010, 11, 30);
      const type = await Report.aggregate([
        {
          $lookup: {
            from: "typereports",
            localField: "type",
            foreignField: "_id",
            as: "mytype",
          },
        },
        {
          $unwind: {
            path: "$mytype",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$type",
            count: { $sum: 1 },
            name: { $push: "$mytype.name" },
          },
        },
        {
            $unwind: {
              path: "$mytype.name",
              preserveNullAndEmptyArrays: true,
            },
          },
      ]);
      //$dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
      const data = await Report.aggregate([
        {
          $group: {
            _id: {
              $month: "$createdAt",
            },
            count: { $sum: 1 },
          },
        },
      ]);
      const data3 = await Report.aggregate([
        {
          $group: {
            _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
            },
            count: { $sum: 1 },
          },
        },
      ]);
      const data4 = await Report.aggregate([
        {
          $group: {
            _id: {
                $week: '$createdAt'
            },
            count: { $sum: 1 },
          },
         
        }
      ]);
      //return res.json(data3);
      return res.render("dashboard/index", {
        layout: this.#layout,
        data: {
          value1: JSON.stringify(data),
          value2: JSON.stringify(type),
          value3: JSON.stringify(data3),
          value4: JSON.stringify(data4),
        },
      });
    } catch (error) {}
  };
}

module.exports = new DashBoard();
