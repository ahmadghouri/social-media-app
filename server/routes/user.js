import express from "express";
import {
  followUnfollowUser,
  getFollowersAndFollowing,
  getprofile,
  login,
  logout,
  signup,
  updateUserProfile,
} from "../controllers/auth.controllers.js";
import { verifiedUser } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", verifiedUser, getprofile);
router.get("/logout", logout);
router.put(
  "/update",
  verifiedUser,
  upload.single("profilePic"),
  updateUserProfile
);
router.put("/follow/:targetUserId", verifiedUser, followUnfollowUser);
router.get("/followers-following", verifiedUser, getFollowersAndFollowing);

export default router;
