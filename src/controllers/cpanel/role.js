const User = require("../../models/user.model");
const { skipPage } = require("../../common/helper");
const Role = require("../../models/role.model");

class RoleController {
    #layout = "layout/index";

    index = async (req, res) => {
        try {
            const { page } = req.query;
            const perPage = 1;
            const _page = page || 1;
            const skip = skipPage({ perPage: perPage, page: _page });
            const data = await Role.find({})
                .skip(skip)
                .limit(perPage);
            const count = await Role.find({}).count();
            if (data) {
                res.render("roles/index", {
                    layout: this.#layout,
                    data: {
                        data: data,
                        currentPage: parseInt(_page),
                        totalPage: Math.ceil(count / perPage),
                    },
                });
            } else {
                res.render("roles/index", {
                    layout: this.#layout,
                    data: [],
                });
            }
        } catch (error) {
            console.log(error);

        }
    };
    store = async (req, res) => {
        const data = await Role.find({});
        res.render("roles/create", {
          layout: this.#layout,
          data: data,
        });
      };
      create = async (req, res) => {
        const { name } = req.body;
        if(Role.name != name){
          try {
            const NewRole = await new Role({
              name: name,
            }).save();
            if (NewRole) {
              res.redirect("/roles");
            } else {
              res.redirect(req.get("referer"));
            }
          } catch (error) {
            console.log(error);
          }
        }
       
      };
      edit = async (req, res) => {
        const { id } = req.query;
        console.log(id);
        const role = await Role.findById(id);
        res.render("roles/update", {
          layout: this.#layout,
          data: {
            role: role,
          },
        });
      };
      update = async (req, res) => {
        const { id } = req.query;
        const {name} = req.body;
        try {
          const NewRole = await Role.findByIdAndUpdate(id, {
            name: name,
          });
          console.log(name);
          if (NewRole) {
            res.redirect("/roles");
          } else {
            res.redirect(req.get("referer"));
          }
        } catch (error) {
          console.log(error);
        }
      };
}
module.exports = new RoleController();
