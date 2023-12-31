const ApiRoute = require("./apis/index");
const WebLoginRoute = require("./web/aut.route");
const AuthWeb = require('../middlewares/authencation.middleware.web')
const UserRoute = require('./web/users.route')
const ReportRoute = require('./web/report.route')

const RoleRoute = require('./web/roles.route')
const RoomRoute = require('./web/room.route')
const TypeRoute = require('./web/typereport.route')
const DashBoard = require('../controllers/cpanel/dashboard');
const autWeb = require("../middlewares/authencation.middleware.web");
const route = (app) => {
  
  //Route API
  app.use("/api", ApiRoute);
  //Default web
  app.get("/", (req, res) => {
    res.redirect("login");
  });
  //Route Web
  app.use("/login", WebLoginRoute);
  app.use("/users",UserRoute);
  app.use('/report',ReportRoute);
  app.use("/roles",RoleRoute);
  app.use("/rooms",RoomRoute);
  app.use("/typereports",TypeRoute);
  app.use("/dashboard",[autWeb],DashBoard.index)


  app.get('/error',[AuthWeb],(req,res) => {
    res.render('error/404')
  })
  
};

module.exports = route;
