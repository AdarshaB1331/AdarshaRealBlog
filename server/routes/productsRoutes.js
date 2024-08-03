import express from "express";

import {
  contactUs,
  getPosts,
  postPosts,
} from "../controller/productsController.js";
import { verifyToken } from "../controller/userController.js";

const routers = express.Router();

routers.get("/posts/getPosts", verifyToken, getPosts);
routers.post("/posts/post", verifyToken, postPosts);
routers.post("/posts/message", verifyToken, contactUs);
export default routers;
