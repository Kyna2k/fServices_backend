const User = require("../../models/user.model");
const GenToken = require("../../common/gentoken");
const { Response, FailResponse } = require("../../models/response");
class AuthController {
  login = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne(
        { email: email },
        "email name phone role"
      ).populate("role", 'name');
      if (user) {
        const { token, refreshToken } = GenToken({id: user._id,role:user.role.name });
        return res.json(
          new Response({
            data: {
              user,
              token,
              refreshToken,
            },
          }
          )
        );
      } else {
        return res.json(new FailResponse({status: 404, message: "Email không tồn tại"}));
      }
    } catch (error) {
      console.log(error);
    }
  };
  
}
module.exports = new AuthController();
