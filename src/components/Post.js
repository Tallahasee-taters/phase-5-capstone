import { useState } from "react";
import UpdatePost from "./UpdatePost";
import Card from "@mui/material/Card";

const Post = ({video, videos, setVideos}) => {
    const [editPostForm, setEditPostForm] = useState(false)
    const [userPost, setUserPost] = useState([])

    const handleDelete = () => {
        fetch(`/api/v1/videos/${video.id}`, {
          method: "DELETE",
        }).then((resp) =>
          setVideos((current) => {
            const updated_videos = current.filter((ele) => ele.id !== video.id);
            return updated_videos;
          })
        );
      };


  return (
    <div>
        <Card className='Post-Card'>
        <h3>{video.title}</h3>
        <video controls width="100%">
        <source src={video.video_url} type="video/mp4" />
      </video> 
      <label className="Post-form">👍</label>
      <button />
      <label className="Post-form">👎</label>
      <button />
      <button  onClick={() => setEditPostForm((current) => !current)}>
        Edit Post
      {editPostForm ? (
        <UpdatePost
          setEditPostForm={setEditPostForm}
          video={video}
          setUserPost={setUserPost}
        />
      ) : null}
      </button>
      <button onClick={() => handleDelete()}>Remove Post</button>
      </Card>
    </div>
  );
};

export default Post;
