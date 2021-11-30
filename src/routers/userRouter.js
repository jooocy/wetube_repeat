import express from "express";
import {
  search,
  setting,
  utubeApp,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  startGithubLogin,
  finishGithubLogin,
  logout,
} from "../controller/userController";

const userRouter = express.Router();

userRouter.route("/login").get(getLogin).post(postLogin);
userRouter.route("/join").get(getJoin).post(postJoin);
userRouter.get("/logout", logout);
userRouter.get("/setting", setting);
userRouter.get("/utubeApp", utubeApp);
userRouter.post("/search", search);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

export default userRouter;
