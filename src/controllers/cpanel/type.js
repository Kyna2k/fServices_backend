const { skipPage } = require("../../common/helper");
const Type = require("../../models/typereport.model");
class TypeController {
    #layout = "layout/index";

    index = async (req, res) => {
        try {
            const { page } = req.query;
            const perPage = 1;
            const _page = page || 1;
            const skip = skipPage({ perPage: perPage, page: _page });
            const data = await Type.find({})
                .skip(skip)
                .limit(perPage);
            const count = await Type.find({}).count();
            if (data) {
                res.render("typereports/index", {
                    layout: this.#layout,
                    data: {
                        data: data,
                        currentPage: parseInt(_page),
                        totalPage: Math.ceil(count / perPage),
                    },
                });
            } else {
                res.render("typereports/index", {
                    layout: this.#layout,
                    data: [],
                });
            }
        } catch (error) {
            console.log(error);

        }
    };
    store = async (req, res) => {
        const data = await Type.find({});
        res.render("typereports/create", {
          layout: this.#layout,
          data: data,
        });
      };
      create = async (req, res) => {
        const { name , time_handle } = req.body;
        console.log(time_handle);
          try {
            const NewType = await new Type({
              name: name,
              time_handle: time_handle,
            }).save();
            console.log(NewType);
            if (NewType) {
              res.redirect("/typereports");
            } else {
              res.redirect(req.get("referer"));
            }
          } catch (error) {
            console.log(error);
          }
      };
      edit = async (req, res) => {
        const { id } = req.query;
        const type = await Type.findById(id);
        res.render("typereports/update", {
          layout: this.#layout,
          data: {
            type: type,
          },
        });
      };
      update = async (req, res) => {
        const { id } = req.query;
        const {name , time_handle} = req.body;
        try {
          const NewType = await Type.findByIdAndUpdate(id, {
            name: name,
            time_handle : time_handle,
          });
          if (NewType) {
            res.redirect("/typereports");
          } else {
            res.redirect(req.get("referer"));
          }
        } catch (error) {
          console.log(error);
        }
      };
};
module.exports = new TypeController();
