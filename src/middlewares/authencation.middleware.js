
const {Response, FailResponse} = require('../models/response');
const JWT = require('jsonwebtoken');
const auth = async (req,res, next) => {
     const authHeader = req.headers['authorization'];
     //Get token Bearer 
     const token = authHeader && authHeader.split(' ')[1];
     if(!token) return res.json(new FailResponse({status: 401, message: "don't have authorization"}));
     JWT.verify(token,process.env.SECRETKEY,(error,payload)=>{
        if(error instanceof JWT.TokenExpiredError) return res.json(new FailResponse({status: 403, message: "TokenExpiredError"}));
        if(error) return res.json(new FailResponse({status: 401, message: "Unauthorized"}));
        console.log(payload);
        req['role'] = payload.role;
        req['id'] = payload.id;
     });
     next();
}

module.exports = auth;

