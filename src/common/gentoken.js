
const JWT = require('jsonwebtoken');
const genToken = (payload,time) =>{
    const token = JWT.sign(payload,process.env.SECRETKEY,{expiresIn: '7d'});
    const refreshToken = JWT.sign(payload,process.env.SECRETKEY,{expiresIn: '30d'});
    return {token, refreshToken};
}

module.exports = genToken