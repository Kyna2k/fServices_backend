const express = require("express");
const route = express.Router();
const AutWebController = require('../../controllers/cpanel/aut')
const passport = require('../../common/logingoogle');
route.get('/with-google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));

route.get('/with-google-callback',passport.authenticate('google'),AutWebController.loginWithGoogleCallBack);
route.get('/',AutWebController.index)
route.post('/',AutWebController.login)


module.exports = route;