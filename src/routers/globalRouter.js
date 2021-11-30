import express from "express"
import { home } from '../controller/videoController';

const globalRouter = express.Router();

globalRouter.get("/", home);



export default globalRouter;