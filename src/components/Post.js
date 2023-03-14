import { useState, useContext } from "react";
import UpdatePost from "./UpdatePost";
import Card from "@mui/material/Card";
import { UserContext } from "../context/userContext";

const Post = ({ video, videos, setVideos }) => {
  const [editPostForm, setEditPostForm] = useState(false);
  const [userPost, setUserPost] = useState([]);
  const { user } = useContext(UserContext);

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
      <Card className="Post-Card">
        <h3>{video.title}</h3>
        <iframe
          width="100%"
          src={video.video_url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay=0; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <label className="Post-form">👍</label>
        <button />
        <label className="Post-form">👎</label>
        <button />
        {user.id === video.user.id ? (
          <button onClick={() => setEditPostForm((current) => !current)}>
            Edit Post
          </button>
        ) : null}
        {editPostForm ? (
          <UpdatePost
            setEditPostForm={setEditPostForm}
            video={video}
            setUserPost={setUserPost}
            setVideos={setVideos}
          />
        ) : null}
        {user.id === video.user.id ? (
          <button onClick={() => handleDelete()}>Remove Post</button>
        ) : null}
        <h3>posted by {video?.user?.username}</h3>
      </Card>
    </div>
  );
};

export default Post;
