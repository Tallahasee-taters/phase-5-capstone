import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";

const UpdatePost = ({ video, setEditPostForm, setVideos }) => {
  const { user } = useContext(UserContext);
  const [updateUserPost, setUpdateUserPost] = useState({
    title: video.title,
    video_url: video.video_url,
  });

  const editPost = (e) => {
    e.preventDefault();
    fetch(`/api/v1/videos/${video.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUserPost),
    }).then((res) => {
      if (res.status === 202) {
        res.json().then((updatedObj) => {
          setVideos((current) => {
            const index = current.findIndex((v) => v.id === updatedObj.id);
            return [
              ...current.slice(0, index),
              updatedObj,
              ...current.slice(index + 1),
            ];
          });
          setEditPostForm(false);
        });
      }
    });
  };

  const handleChange = (event) => {
    setUpdateUserPost((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <form onSubmit={editPost}>
        <label className="Post-form">Title</label>
        <input
          type="text"
          name="title"
          value={updateUserPost.title}
          onChange={handleChange}
        />
        <label className="Post-form">Video URL</label>
        <input
          type="text"
          name="video_url"
          value={updateUserPost.video_url}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default UpdatePost;
