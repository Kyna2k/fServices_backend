

const autWeb = async (req,res,next) =>{
    console.log(req.session.admin);
    if(!req.session.admin){
        res.redirect("/login");
    }
    next()
}

module.exports = autWeb 