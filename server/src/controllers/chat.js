const USER = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CONVERSTION = require("../model/Converstion");
const MESSAGE = require("../model/Message");
const { io } = require("../bin/www");
exports.converstionCreate = async (req, res) => {
  try {
    const otherUserId = req.params.id;
    const currentUserId = req.user._id;

    const members = [currentUserId.toString(), otherUserId];

    const findConverstion = await CONVERSTION.findOne({
      members: { $in: [members[0] && members[1]] },
    });
    let data;
    if (findConverstion) {
      data = await CONVERSTION.findById(findConverstion._id);
      let converstionId = data._id;
      let persionId = data.members.find((i) => i !== currentUserId);
      const { _id, name, email } = await USER.findById(persionId);
      data = {
        converstionId,
        perstionData: { id: _id, name, email },
      };
      res.status(403).json({
        converstionId: findConverstion._id,
        data,
        error: "converstion is already exist..!",
      });
    } else {
      data = await CONVERSTION.create({ members });
      let converstionId = data._id;
      let persionId = data.members.find((i) => i !== currentUserId.toString());
      console.log(persionId,currentUserId);
      const { _id, name, email } = await USER.findById(persionId);
      data = {
        converstionId,
        perstionData: { id: _id, name, email },
      };
      res.status(201).json({
        status: "success",
        message: "converstion created suceesfully",
        data,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.messageSend = async function (req, res, next) {
  try {
    const io = req.app.get("io");
    const { message } = req.body;
    const converstionId = req.params.id;
    const senderid = req.user._id;

    if (!message) {
      throw new Error("send a message first..!");
    }
    let socketSendData = await MESSAGE.find({ converstionId });
    const newMessage = await MESSAGE.create({
      converstionId,
      senderid,
      message,
    });
    res.status(200).json({
      status: "success",
      message: "chat access successfully..!",
      newMessage,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.converstionGet = async function (req, res, next) {
  try {
    const conid = req.params.id;
    const userId = req.user._id.toString();
    if (!userId) {
      throw new Error("userId send first..!");
    }
    let data;
    if (!conid) {
      data = await CONVERSTION.find({
        members: { $in: [userId] },
      });

      const getUserconverstion = await Promise.all(
        data.map(async (el) => {
          const members = el.members;
          return members;
        })
      );
      const members = await Promise.all(
        getUserconverstion.map((el, index) => {
          const UserId = el.filter((memberId) => memberId !== userId);

          return UserId;
        })
      );
      data = await Promise.all(
        members.map(async (el, index) => {
          const User = await USER.findById(el);
          return {
            converstionId: data[index]._id,
            perstionData: { id: User._id, name: User.name, email: User.email },
          };
        })
      );
      // data = await Promise.all(
      //   data.map(async (el) => {
      //     let converstionId = el._id;
      //     let persionId = el.members.find((i) => i !== userId);
      //     const { _id, name, email } = await USER.findById(persionId);
      //     return { converstionId, perstionData: { id: _id, name, email } };
      //   })
      // );
    } else {
      data = await CONVERSTION.findById(conid);
      let converstionId = data._id;
      let persionId = data.members.find((i) => i !== userId);
      const { _id, name, email } = await USER.findById(persionId);
      data = {
        converstionId,
        perstionData: { id: _id, name, email },
      };
    }
    res.status(200).json({
      status: "success",
      message: "chat access successfully..!",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.messageGet = async function (req, res, next) {
  try {
    const converstionId = req.params.id;
    const io = req.app.get("io");
    if (!converstionId) {
      throw new Error("converstionId send first..!");
    }

    const data = await MESSAGE.find({ converstionId });

    res.status(200).json({
      status: "success",
      message: "chat access successfully..!",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
