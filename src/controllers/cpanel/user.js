const User = require("../../models/user.model");
const { skipPage } = require("../../common/helper");
const Role = require("../../models/role.model");

class UserController {
  #layout = "layout/index";

  index = async (req, res) => {
    try {
      const { page } = req.query;
      const perPage = 10;
      const _page = page || 1;
      const skip = skipPage({ perPage: perPage, page: _page });
      const data = await User.find({})
        .populate("role", "name")
        .skip(skip)
        .limit(perPage);
      const count = await User.find({}).count();
      if (data) {
        res.render("users/index", {
          layout: this.#layout,
          data: {
            data: data,
            currentPage: parseInt(_page),
            totalPage: Math.ceil(count / perPage),
          },
        });
      } else {
        res.render("users/index", {
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
    res.render("users/create", {
      layout: this.#layout,
      data: data,
    });
  };
  create = async (req, res) => {
    const { email, name, id_role, phone, available } = req.body;
    try {
      const newUser = await new User({
        email: email,
        name: name,
        role: id_role,
        phone: phone,
        available: available,
      }).save();
      if (newUser) {
        res.redirect("/users");
      } else {
        res.redirect(req.get("referer"));
      }
    } catch (error) {
      console.log(error);
    }
  };
  edit = async (req, res) => {
    const { id } = req.query;
    console.log(id);
    const user = await User.findById(id).populate("role");
    const role = await Role.find({});
    res.render("users/update", {
      layout: this.#layout,
      data: {
        user: user,
        role: role,
      },
    });
  };
  update = async (req, res) => {
    const { id } = req.query;
    const { email, name, id_role, phone, available } = req.body;
    try {
      const newUser = await User.findByIdAndUpdate(id, {
        email: email,
        name: name,
        role: id_role,
        phone: phone,
        available: available,
      });
      if (newUser) {
        res.redirect("/users");
      } else {
        res.redirect(req.get("referer"));
      }
    } catch (error) {
      console.log(error);
    }
  };
  disable = async (req,res) =>{
    const { id, value } = req.query;
    let disable = false;
    if(value != 'true')
    {
      disable = true
    }
    try {
      const newUser = await User.findByIdAndUpdate(id, {
        available: disable,
      });
      if (newUser) {
        res.redirect(req.get("referer"));
      } else {
        res.redirect(req.get("referer"));
      }
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new UserController();
