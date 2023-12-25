

const autWeb = async (req,res,next) =>{
    console.log(req.session.admin);
    if(!req.session.admin){
        res.redirect("/login");
        return
    }
    next();
}

module.exports = autWeb 