import { useState } from "react";
import Post from "./Post";
import NewPostForm from "./NewPostForm";

const PostFeed = ({ videos, setVideos, createPost }) => {
  const [postForm, setPostForm] = useState(false);

  const mappedVideos = videos.map((video) => (
    <Post key={video.id} video={video} videos={videos} setVideos={setVideos}/>
  ));

  return (
    <div>
      {postForm ? <NewPostForm videos={videos} setVideos={setVideos} createPost={createPost} setPostForm={setPostForm}/> : null}
      <button className='button-64' onClick={() => setPostForm((current) => !current)}>
        Add New Content
      </button>
      <div className='postFeed'>
      {mappedVideos}
      </div>
    </div>
  );
};

export default PostFeed;
