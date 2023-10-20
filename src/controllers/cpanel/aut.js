

const Admin = require('../../models/admin.model')


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
                res.redirect('users');
            }else{
                res.redirect(req.get('referer'));
            }
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = new AutWebController();