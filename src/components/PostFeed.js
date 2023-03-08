import React from "react";
import Post from "./Post";

const PostFeed = ({ videos }) => {
  const mappedVideos = videos.map((video) => (
    <Post key={video.id} {...video} />
  ));
  
  return (
    <div>
      <video controls width="100%">
        <source src={"http://cdn.akamai.steamstatic.com/steam/apps/256930976/movie_max_vp9.webm?t=1676598403"} type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>
      {mappedVideos}
    </div>
  );
};

export default PostFeed;
