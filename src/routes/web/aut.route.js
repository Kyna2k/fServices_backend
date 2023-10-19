const express = require("express");
const route = express.Router();
const Admin = require('../../models/admin.model')



route.get('/',(req,res) => {
    res.render("auth/login")
})
route.post('/', async (req,res) => {
    const {username, password} = req.body
    try {
        const result = await Admin.findOne({username, password});
        if(result){
            req.session.admin = {
                website: 'kynalab.com',
                type: 'Huy đẹp trai',
            }
            res.redirect('error');
        }else{
            res.redirect(req.get('referer'));
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports = route;