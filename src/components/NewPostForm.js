import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";

const NewPostForm = ({ createPost, setPostForm }) => {
  const { user } = useContext(UserContext);
  console.log(user.id);
  const [newPost, setNewPost] = useState({
    title: "",
    video_url: "",
  });

  const handleChange = (event) => {
    setNewPost((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <form onSubmit={(e) => createPost(e, newPost, setNewPost, setPostForm)}>
        <label className="Post-form">Title</label>
        <input type="text" name="title" onChange={handleChange} />
        <label className="Post-form">Video URL</label>
        <input type="text" name="video_url" onChange={handleChange} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default NewPostForm;
