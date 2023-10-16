const User = require("../../models/user.model");
const GenToken = require("../../common/gentoken");
const { Response, FailResponse } = require("../../models/response");
const JWT = require('jsonwebtoken');
class AuthController {
  login = async (req, res) => {
    const { email, device_token } = req.body;
    try {
      const user = await User.findOneAndUpdate(
        { email: email },
        { device_token: device_token },
        { new: true, fields: "email name phone role" }
      ).populate("role", "name");
      if (user) {
        const { token, refreshToken } = GenToken({
          id: user._id,
          role: user.role.name,
        });
        return res.json(
          new Response({
            data: {
              user,
              token,
              refreshToken,
            },
          })
        );
      } else {
        return res.json(
          new FailResponse({ status: 400, message: "Email không tồn tại" })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  refreshToken = async (req,res) => {
    const {refreshToken} = req.body;
    console.log(refreshToken)
    if(refreshToken)
    {
      JWT.verify(refreshToken,process.env.SECRETKEY,(error,payload)=>{
        if(error instanceof JWT.TokenExpiredError) return res.json(new FailResponse({status: 403, message: "TokenExpiredError"}));
        if(error) return res.json(new FailResponse({status: 401, message: "Unauthorized"}));
        console.log(payload)
        const { token, refreshToken } = GenToken({
          id: payload.id,
          role: payload.role
        });
        return res.json(
          new Response({
            data: {
              token,
              refreshToken,
            },
          })
        );
     });
    }else {
      new FailResponse({ status: 400, message: "don't have refreshToken param" }) 
    }
  
  }
}
module.exports = new AuthController();


