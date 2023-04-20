const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../model/model")

async function validateToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  console.log(authorizationHeader)
  let result;

  if (!auhorizationHeader) {
    return res.status(401).json({
      error: true,
      message: "Access token is missing",
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  console.log('token is->',token)
  try {
    let user = await User.findOne({
      accessToken: token,
    });

    if (!user) {
      result = {
        error: true,
        message: "Authorization error",
      };

      return res.status(403).json(result);
    }

    result = jwt.verify(token, process.env.JWT_SECRET);

    if (!user.name === result.name) {
      result = {
        error: true,
        message: "Invalid token",
      };

      return res.status(401).json(result);
    }

    req.decoded = result;

    next();
  } catch (error) {
    return res.status(403).json({
      error: true,
      message: "Authentication error",
    });
  }
}

module.exports=  validateToken