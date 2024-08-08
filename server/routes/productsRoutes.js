import express from "express";

import {
  contactUs,
  deletePost,
  getPosts,
  postPosts,
  updatePost,
} from "../controller/productsController.js";
import { verifyToken } from "../controller/userController.js";

const routers = express.Router();

routers.get("/posts/getPosts", verifyToken, getPosts);
routers.post("/posts/post", verifyToken, postPosts);
routers.post("/posts/message", verifyToken, contactUs);
routers.delete("/post/delete", verifyToken, deletePost);
routers.patch("/post/update", verifyToken, updatePost);
export default routers;
