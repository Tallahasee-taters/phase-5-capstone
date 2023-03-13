import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";


const NewPostForm = ({ videos }) => {
    const {user, createPost} = useContext(UserContext)
    console.log(user.id)
  const [newPost, setNewPost] = useState({
    title: "",
    video_url: "",
    user_id: user.id,
  });
  

  const handleChange = (event) => {
    setNewPost({ [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form onSubmit={(e) => createPost(e, newPost, setNewPost)}>
        <label className="Post-form">Title</label>
        <input type="text" name="title" onChange={handleChange} />
        <label className="Post-form">Video URL</label>
        <input type="text" name="video_url" onChange={handleChange} />
        <input type="submit"/>
      </form>
    </div>
  );
};

export default NewPostForm;
