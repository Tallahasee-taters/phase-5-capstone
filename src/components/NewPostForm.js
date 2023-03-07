import { useState } from "react";

const NewPostForm = ({ videos }) => {
  const [newPost, setNewPost] = useState({
    name: "",
    video_url: "",
    upvote: 0,
    downvote: 0,
    featured_image: null,
  });

  const createPost = (e) => {
    e.preventDefault();
    fetch("/api/v1/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    }).then((resp) => {
      if (resp.status === 201) {
        resp.json().then((newPost) => {
          setNewPost([...videos, newPost]);
        });
      } else {
        resp.json().then((data) => console.log(data));
      }
    });
  };

  const handleChange = (event) => {
    setNewPost({ [event.target.name]: event.target.value });
  };

  const onImageChange = (event) => {
    setNewPost({ featured_image: event.target.files[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("featured_image", newPost.featured_image);

    fetch("api/v1/videos", {
      method: "POST",
      body: formData,
    }).catch((error) => console.log(error));
  };

  return (
    <div onSubmit={handleSubmit}>
      <form onSubmit={createPost}>
        <label className="Post-form">Title</label>
        <input type="text" name="title" onChange={handleChange} />
        <label className="Post-form"></label>
        <input
          type="file"
          accept="image/*"
          multiple={false}
          onChange={onImageChange}
        />
        <label className="Post-form">👍</label>
        <button />
        <label className="Post-form">👎</label>
        <button />
      </form>
    </div>
  );
};

export default NewPostForm;
