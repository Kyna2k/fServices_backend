const ApiRoute = require("./apis/index");
const WebLoginRoute = require("./web/aut.route");
const AuthWeb = require('../middlewares/authencation.middleware.web')
const UserRoute = require('./web/users.route')
const route = (app) => {
  
  //Route API
  app.use("/api", ApiRoute);
  //Default web
  app.get("/", (req, res) => {
    res.redirect("login");
  });
  //Route Web
  app.use("/login", WebLoginRoute);
  app.use("/users",UserRoute)


  app.get('/error',[AuthWeb],(req,res) => {
    res.render('error/404')
  })
  
};

module.exports = route;
