import express from "express";
import {
  createComment,
  deleteComment,
  getPostComment,
  updateComment,
} from "../controllers/comment.controllers.js";
import { verifiedUser } from "../middlewares/auth.js";

const routerComments = express();

routerComments.post("/create", verifiedUser, createComment);
routerComments.get("/get/comment/:id", verifiedUser, getPostComment);
routerComments.delete("/delete/comment/:id", verifiedUser, deleteComment);
routerComments.put("/update/comment/:id", verifiedUser, updateComment);

export default routerComments;
