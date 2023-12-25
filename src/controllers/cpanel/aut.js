
const Admin = require('../../models/admin.model')
const User = require("../../models/user.model");
const Role = require("../../models/role.model");
class AutWebController {
    index = async (req,res) => {
        res.render("auth/login",{
            layout: 'layout/login'
        })
    }
    login = async (req,res) => {
        const {username, password} = req.body
        try {
            const result = await Admin.findOne({username, password});
            if(result){
                req.session.admin = {
                    website: 'kynalab.com',
                    type: 'Huy đẹp trai',
                    
                }
                res.locals.session = {
                    avatar: '../assets/img/avatars/1.png'
                }
                res.redirect('/dashboard');
            }else{
                res.redirect(req.get('referer'));
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    loginWithGoogleCallBack = async (req,res) =>{
        const profile = req.user;
        if(profile.id)
        {   
            try {
            const admin = await Role.findOne({name: "MANAGER"});
            const user = await User.findOne({email: profile.emails[0].value, role : admin._id });
            if(user){
                req.session.admin = {
                    website: 'kynalab.com',
                    type: 'Huy đẹp trai',
                }
                res.redirect('/dashboard');
            }else{
                res.redirect('/login');
            }
            } catch (error) {
                console.log(error);
            }
            

        }else{
            res.redirect('/login');

        }
        
    }
    
}
module.exports = new AutWebController();