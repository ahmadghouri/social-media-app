import express from "express";
import { verifiedUser } from "../middlewares/auth.js";
import {
  createPost,
  deletePostById,
  getAllPost,
  getMyPost,
  getPostById,
  toggleLike,
} from "../controllers/post.controllers.js";
import upload from "../middlewares/multer.js";

const routerpost = express.Router();

routerpost.post("/create", verifiedUser, upload.single("mediaUrl"), createPost);
routerpost.get("/", verifiedUser, getAllPost);
routerpost.get("/my", verifiedUser, getMyPost);
routerpost.get("/post/:id", verifiedUser, getPostById);
routerpost.delete("/post/delete/:id", verifiedUser, deletePostById);
routerpost.put("/like/:id", verifiedUser, toggleLike);

export default routerpost;
