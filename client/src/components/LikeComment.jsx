import { Heart, MessageCircle } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { Auth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import AddComment from "./AddComment";

const LikeComment = ({ post, getPostData }) => {
  const [comments, setComments] = useState([]);
  const [commentToggle, setCommentToggle] = useState(false);
  let { user } = Auth();

  const handleLike = async (postId) => {
    await axiosInstance.put(`v2/like/${postId}`);
    getPostData();
  };
  const hanleComment = async () => {
    const res = await axiosInstance.get(`v3/get/comment/${post._id}`);
    setComments(res.data);
  };
  useEffect(() => {
    hanleComment();
  }, []);
  return (
    <>
      <div className="flex gap-5 mt-5 mb-5">
        <button
          className="flex items-center space-x-2 group"
          onClick={() => handleLike(post._id)}
        >
          <Heart
            className={`w-5 h-5 text-gray-500 group-hover:text-red-600 group-hover:scale-110 transition-transform ${
              post.likes?.includes(user._id)
                ? "fill-red-500 text-red-500"
                : "text-gray-500"
            }`}
          />
          <span
            className={`text-sm font-medium group-hover:text-red-500 ${
              post.likes?.includes(user._id) ? "text-red-500" : "text-gray-500"
            }`}
          >
            {post.likes?.length || 0}
          </span>
        </button>
        <button
          className="flex items-center space-x-2 group"
          onClick={() => setCommentToggle(!commentToggle)}
        >
          <MessageCircle className="w-5 h-5 text-gray-500 group-hover:text-blue-500 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium group-hover:text-blue-500">
            {comments?.length}
            {/* {comments} */}
          </span>
        </button>
      </div>
      {commentToggle ? (
        <AddComment
          comments={comments}
          post={post}
          hanleComment={hanleComment}
        />
      ) : null}
    </>
  );
};

export default LikeComment;
