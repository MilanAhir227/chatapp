const USER = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.userCreate = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
      throw new Error("Please fill all fields");
    }

    const userCheck = await USER.findOne({ email });
    console.log(userCheck);

    if (userCheck) {
      throw new Error("user is already exsist..!");
    }
    req.body.password = await bcrypt.hash(password, 10);
    const data = await USER.create(req.body);
    const token = await jwt.sign({ id: data._id }, "SURAT");

    res.status(201).json({
      status: "success",
      message: "user created suceesfully",
      data,
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      throw new Error("Please fill all fields");
    }

    console.log(email, password);
    const userCheck = await USER.findOne({ email });

    if (!userCheck) {
      throw new Error("user not exsist..!");
    }

    const passwordCheck = await bcrypt.compare(password, userCheck.password);

    if (!passwordCheck) {
      throw new Error("worng password..!");
    }

    const token = await jwt.sign({ id: userCheck._id }, "SURAT");

    console.log(token);
    res.status(201).json({
      status: "success",
      message: "user login suceesfully",
      data: userCheck,
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.userSearch = async (req, res) => {
  try {
    const Search = req.query.search;
    const userId = req.user._id;
    let query = {
      $or: [
        { name: { $regex: Search, $options: "i" } },
        { email: { $regex: Search, $options: "i" } },
      ],
    };
    let data;
    if (Search) {
      data = await USER.find(query);
    } else {
      data = await USER.find(query);
    }
    data = data.filter((el) => el._id.toString() !== userId.toString());

    res.status(200).json({
      status: "success",
      message: "user find suceesfully",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
