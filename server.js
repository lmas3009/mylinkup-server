import Express from "express";
import path from "path";
import cors from "cors";
import pkg from "consola";
import bp from "body-parser";
import connect from "mongoose";
import dotenv from "dotenv";
import { createuserinfo, getuserinfo } from "./utils/userinfo.js";
import {
  createmediapage,
  getmediapage,
  DeletePage,
} from "./utils/mediapage.js";

const { success, error } = pkg;

const __dirname = path.resolve();

const app = Express();
var port = process.env.PORT || 3001;
app.use(cors());
app.use(bp.json());

dotenv.config();

app.get("/", (req, res) => {
  res.send(
    "Welcome to mylinkup ( Single place to store all your social media links )"
  );
});

app.get("/hello", (req, res) => {
  res.send(
    "Welcome to mylinkup ( Single place to store all your social media links )"
  );
});

app.post("/create-user", async (req, res) => {
  await createuserinfo(req.body, req, res);
});

app.post("/get-user", async (req, res) => {
  await getuserinfo(req.body, req, res);
});

app.post("/create-mediapage", async (req, res) => {
  await createmediapage(req.body, req, res);
});

app.post("/get-mediapage", async (req, res) => {
  await getmediapage(req.body, req, res);
});

app.delete("/delete-mediapage", async (req, res) => {
  await DeletePage(req.query, req, res);
});

// Connecting to Database
var url = process.env.MONGODB_URL;

connect
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    success({ message: "Successfully Connected to the DB", badge: true });
  })
  .catch((err) => {
    error({
      message: `Unable to connected with DB\nerror: ${err}`,
      badge: true,
    });
  });

app.listen(port, () => {
  success({ message: `Listening on Port ${port}`, badge: true });
});
