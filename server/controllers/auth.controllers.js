import JWT from "jsonwebtoken";
import { User } from "../models/UserSchema.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { name, userName, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already in use" });

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      userName,
      email,
      password: hashPassword,
    });

    res.status(200).json({
      message: "Signup successful",
      user: {
        _id: user._id,
        name: user.name,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Signup failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userLogin = await User.findOne({ email });
    if (!userLogin) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Wrong email or password" });

    const token = JWT.sign({ userId: userLogin._id }, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: userLogin._id,
        name: userLogin.name,
        userName: userLogin.userName,
        email: userLogin.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed" });
  }
};

export const getprofile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Profile fetch failed" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // middleware se milta hai

    const { name, bio } = req.body;

    const updateData = {
      ...(name && { name }),
      ...(bio && { bio }),
      ...(req.file && { profilePic: req.file.path }),
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Profile update failed" });
  }
};

export const followUnfollowUser = async (req, res) => {
  const userId = req.userId;
  const { targetUserId } = req.params;
  if (userId === targetUserId) {
    return res.status(400).json({ message: "Cannot follow yourself" });
  }
  try {
    const currentUser = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(200).json({ message: "Target user not found" });
    }

    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      // unfollow
      currentUser.following.pull(targetUserId);
      targetUser.followers.pull(userId);
      await currentUser.save();
      await targetUser.save();
      return res.status(200).json({ message: "User unfollowed" });
    } else {
      // follow
      currentUser.following.push(targetUserId);
      targetUser.followers.push(userId);
      await currentUser.save();
      await targetUser.save();
      return res.status(200).json({ message: "User followed" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Follow/Unfollow failed" });
  }
};

export const getFollowersAndFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("followers", "userId name userName profilePic")
      .populate("following", "userId name , userName, profilePic")
      .select("following , followers");
    res.status(200).json({
      followers: user.followers,
      following: user.following,
    });
  } catch (error) {
    console.log(error);
  }
};
