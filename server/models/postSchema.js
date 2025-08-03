// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caption: {
      type: String,
    },
    // image: {
    //   type: String,
    // },
    mediaUrl: { type: String, required: true },
    mediaType: { type: String },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true, // for createdAt and updatedAt
  }
);

export const Post = mongoose.model("Post", postSchema);
