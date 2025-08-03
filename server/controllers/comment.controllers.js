import { Post } from "../models/postSchema.js";
import { Comment } from "../models/comment.js";
export const createComment = async (req, res) => {
  const { postId, text } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comment = await Comment.create({
      postId,
      userId: req.userId,
      text,
    });

    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
  }
};

export const getPostComment = async (req, res) => {
  try {
    const comment = await Comment.find({ postId: req.params.id })
      .populate("userId", "name userName profilePic")
      .sort({ createdAt: -1 });
    console.log(comment);

    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Comment.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = async (req, res) => {
  const { id: commentId } = req.params;
  const { text } = req.body;
  //   const comment = await Comment.find(commentId, (comment.text = text));
  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
  }
};
