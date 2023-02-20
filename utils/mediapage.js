import mongoose from "mongoose";
import MediaPages from "../models/mediapages.js";

export const createmediapage = async (info, req, res) => {
  mongoose.model("MediaPage", MediaPages).find(
    {
      Slug: info.Slug,
    },
    async (err, data) => {
      if (Object.keys(data).length === 0) {
        mongoose.model("MediaPage", MediaPages).find(
          {
            MediaId: info.MediaId,
          },
          async (err, data) => {
            if (Object.keys(data).length === 0) {
              mongoose
                .model("MediaPage", MediaPages)
                .create(info, async (err, data) => {
                  if (err) {
                    console.log(err);
                    res.send({
                      Created: "False12",
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
              mongoose.model("MediaPage", MediaPages).updateOne(
                { MediaId: info.MediaId },
                {
                  $set: {
                    UserId: info.UserId,
                    Slug: info.Slug,
                    Data: info.Data,
                    UserProfile: info.UserProfile,
                  },
                },
                async (err, data) => {
                  if (err) {
                    res.send({
                      Created: "False1",
                      Status: 500,
                    });
                  } else {
                    res.send({
                      Created: "Done",
                      Status: 200,
                    });
                  }
                }
              );
            }
          }
        );
      } else {
        res.send({
          Status: 201,
          Result: "Slug name already exits",
        });
      }
    }
  );
};

export const getmediapage = async (info, req, res) => {
  if (info.getP === "true") {
    mongoose
      .model("MediaPage", MediaPages)
      .find({ Slug: info.Slug }, async (err, data) => {
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
      });
  } else if (info.getId === "true") {
    mongoose
      .model("MediaPage", MediaPages)
      .find({ UserId: info.UserId }, async (err, data) => {
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
      });
  } else {
    mongoose.model("MediaPage", MediaPages).find({}, async (err, data) => {
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
    });
  }
};

export const DeletePage = async (info, req, res) => {
  mongoose
    .model("MediaPage", MediaPages)
    .deleteOne({ Slug: info.Slug }, async (err, data) => {
      if (err) {
        res.send({
          Result: [],
          Status: 500,
        });
      } else {
        res.send({
          Result: "Deleted",
          Status: 200,
        });
      }
    });
};
