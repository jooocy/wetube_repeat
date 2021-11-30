import express from "express";
import {
  deleteVideo,
  editVideo,
  getEditVideo,
  getUpload,
  postEditVideo,
  postUpload,
  watchVideo,
} from "../controller/videoController";

const videoRouter = express.Router();

videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id([\\da-f]{24})", watchVideo);
videoRouter.get("/:id([\\da-f]{24})/delete", deleteVideo);
videoRouter
  .route("/:id([\\da-f]{24})/edit")
  .get(getEditVideo)
  .post(postEditVideo);

export default videoRouter;
