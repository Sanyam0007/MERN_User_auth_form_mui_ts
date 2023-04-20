const User = require("../model/model");
const jwt = require("jsonwebtoken");
const bycrpt = require("bcrypt");
const secretKey = "abc";

const userController = {
  //signup api
  signup: async (req, res) => {
    try {
      console.log("reqndjcdc", req.body);
      const { name, email, phoneNumber, password } = User(req.body);

      // console.log("newUser", newUser);
      const oldUser = await User.findOne({
        email: email,
      });
      // console.log("gdvahsdvhdhsavdsad" + oldUser);
      if (oldUser) {
        return res.status(200).json({ message: "exists" });
      }
      const hashedPassword = await bycrpt.hash(password, 10);
      const result = await new User({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { email: result.email, id: result._id },
        secretKey
      );
      await result.save();
      return res
        .status(201)
        .json({ user: result, token: token, message: "success" });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: "fail" });
    }
  },

  //login api
  login: async (req, res) => {
    const { email, password } = User(req.body);
    console.log(email, password);
    try {
      const oldUser = await User.findOne({
        email: email,
      });
      console.log("olduser->>", oldUser);
      if (!oldUser) {
        console.log("not exists");
        return res.status(202).json({ message: "Not Exists" });
      }

      const matchPassword = await bycrpt.compare(password, oldUser.password);
      console.log(matchPassword);
      console.log(password);
      console.log(oldUser.password);
      if (!matchPassword) {
        return res.status(200).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign(
        { email: oldUser.email, id: oldUser._id },
        secretKey
      );
      console.log(matchPassword);
      if (matchPassword) {
        return res.json({ message: "exists", user: oldUser, token: token });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "something went wrong!" });
    }
  },

  //getData from db
  getData: async (req, res) => {
    try {
      const data = await User.find();
      return res.status(200).json({ msg: "user data", data: data });
    } catch (error) {
      return res.status(404).json({ message: "Not found user data" });
    }
  },

  // delete data from db
  deleteData: async (req, res) => {
    try {
      const lastDocument = await User.findOneAndDelete(
        {},
        { sort: { _id: -1 } }
      );
      res.status(200).json(lastDocument);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = userController;
