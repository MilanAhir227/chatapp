const jwt = require("jsonwebtoken");
const USER = require("../model/user");

/**
 * adminAuth fuction  is used to authenticate the user.
 * pass token in headers then check  if it's valid or not.
 */
exports.userAuth = async function (req, res, next) {
  try {
    const Token = req.headers.token;

    if (!Token) {
      throw new Error("first send token..!");
    }

    const checktoken = jwt.verify(Token, "SURAT");

      const checkuser = await USER.findById(checktoken.id);

    if (!checkuser) {
      throw new Error("user not found");
    }

    req.user = checkuser;
    next();
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
