import { Post } from "../models/postSchema.js";

export const createPost = async (req, res) => {
  const { caption, image } = req.body;
  try {
    const post = await Post.create({
      userId: req.userId,
      caption,
      // image,
      mediaUrl: req.file?.path, // 📸 Cloudinary media URL
      mediaType: req.file?.mimetype,
    });
    // console.log(post);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = async (req, res) => {
  try {
    const post = await Post.find()
      .populate("userId", "name userName profilePic")
      .sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};
export const getMyPost = async (req, res) => {
  try {
    let post = await Post.find({ userId: req.userId })
      .populate("userId", "name userName profilePic")
      .sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "userId",
      "name userName profilePic"
    );
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

export const deletePostById = async (req, res) => {
  try {
    const post = await Post.deleteOne({ _id: req.params.id });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.includes(req.userId);

    if (alreadyLiked) {
      post.likes.pull(req.userId);
    } else {
      post.likes.push(req.userId);
    }

    await post.save();
    res.status(200).json({
      message: alreadyLiked ? "Unliked the post" : "Liked the post",
      likes: post.likes,
    });
  } catch (error) {
    res.status(500).json({ message: "Like/unlike failed" });
  }
};
