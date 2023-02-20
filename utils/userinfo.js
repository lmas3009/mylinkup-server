import mongoose from "mongoose";
import User_info from "../models/Userinfo.js";

export const createuserinfo = async (info, req, res) => {
  mongoose.model("Userinfo", User_info).find(
    {
      Email: info.Email,
    },
    async (err, data) => {
      if (Object.keys(data).length === 0) {
        mongoose
          .model("Userinfo", User_info)
          .create(info, async (err, data) => {
            if (err) {
              res.send({
                Created: "False",
                Status: 500,
              });
            } else {
              res.send({
                Created: "Done",
                Status: 200,
              });
            }
          });
      } else {
        res.send({
          data: data,
          Status: 200,
        });
      }
    }
  );
};

export const getuserinfo = async (info, req, res) => {
  if (info.getUser === "true") {
    mongoose.model("Userinfo", User_info).find(
      {
        _id: info.UserId,
      },
      async (err, data) => {
        if (err) {
          res.send({
            Result: [],
            Status: 500,
          });
        } else {
          res.send({
            Result: data,
            Status: 200,
          });
        }
      }
    );
  } else {
    mongoose.model("Userinfo", User_info).find(
      {
        Email: info.Email,
      },
      async (err, data) => {
        if (err) {
          res.send({
            Result: [],
            Status: 500,
          });
        } else {
          res.send({
            Result: data,
            Status: 200,
          });
        }
      }
    );
  }
};
