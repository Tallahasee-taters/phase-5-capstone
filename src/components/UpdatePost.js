import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";

const UpdatePost = ({ video, setUserPost }) => {
  const { user } = useContext(UserContext);
  const [updateUserPost, setUpdateUserPost] = useState({
    title: video.title,
    video_url: video.video_url,
    user_id: user.id,
  });

  const editPost = (e, video) => {
    e.preventDefault();
    fetch(`/ap1/v1/videos/${video.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    }).then((res) => {
      if (res.status === 202) {
        res.json().then((updatedObj) =>
          setUserPost((current) => {
            const index = current.findIndex((v) => v.id === updatedObj.id);
            return [
              ...current.slice(0, index),
              video,
              ...current.slice(index + 1),
            ];
          })
        );
      }
    });
  };
  return (
    <div>
      <form>
        <label className="Post-form">Title</label>
        <input type="text" name="title" />
        <label className="Post-form">Video URL</label>
        <input type="text" name="video_url" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default UpdatePost;
