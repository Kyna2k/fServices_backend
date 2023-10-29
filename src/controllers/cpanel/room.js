const { skipPage } = require("../../common/helper");
const Room = require("../../models/room.model");
class RoomController {
    #layout = "layout/index";

    index = async (req, res) => {
        try {
            const { page } = req.query;
            const perPage = 10;
            const _page = page || 1;
            const skip = skipPage({ perPage: perPage, page: _page });
            const data = await Room.find({})
                .skip(skip)
                .limit(perPage);
            const count = await Room.find({}).count();
            if (data) {
                res.render("rooms/index", {
                    layout: this.#layout,
                    data: {
                        data: data,
                        currentPage: parseInt(_page),
                        totalPage: Math.ceil(count / perPage),
                    },
                });
            } else {
                res.render("rooms/index", {
                    layout: this.#layout,
                    data: [],
                });
            }
        } catch (error) {
            console.log(error);

        }
    };
    store = async (req, res) => {
        const data = await Room.find({});
        res.render("rooms/create", {
          layout: this.#layout,
          data: data,
        });
      };
      create = async (req, res) => {
        const { name } = req.body;
          try {
            const NewRoom = await new Room({
              name: name,
            }).save();
            if (NewRoom) {
              res.redirect("/rooms");
            } else {
              res.redirect(req.get("referer"));
            }
          } catch (error) {
            console.log(error);
          }
      };
      edit = async (req, res) => {
        const { id } = req.query;
        const room = await Room.findById(id);
        res.render("rooms/update", {
          layout: this.#layout,
          data: {
            room: room,
          },
        });
      };
      update = async (req, res) => {
        const { id } = req.query;
        const {name} = req.body;
        try {
          const NewRole = await Room.findByIdAndUpdate(id, {
            name: name,
          });
          console.log(name);
          if (NewRole) {
            res.redirect("/rooms");
          } else {
            res.redirect(req.get("referer"));
          }
        } catch (error) {
          console.log(error);
        }
      };
};
module.exports = new RoomController();