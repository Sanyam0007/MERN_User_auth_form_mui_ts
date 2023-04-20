const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function generateJWT(username) {
  try {
    const payload = { username };
    const token = await jwt.sign(payload, process.env.JWT_SECRET);
    return { error: false, token };
  } catch (error) {
    return { error: true };
  }
}

module.exports = generateJWT;