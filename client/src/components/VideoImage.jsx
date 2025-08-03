import React from "react";

const VideoImage = ({ mediaUrl, mediaType }) => {
  return (
    <>
      <div className="flex justify-center mt-3">
        {mediaType?.includes("video") ? (
          <video
            preload="none"
            controls
            className="max-h-96 w-full text-center rounded-2xl"
          >
            <source src={mediaUrl} />
          </video>
        ) : (
          <img
            src={mediaUrl}
            loading="lazy"
            alt=""
            className="max-h-96 text-center object-cover rounded-2xl"
          />
        )}
      </div>
    </>
  );
};

export default VideoImage;
