import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";

const UpdateUser = ({ setShowEditForm }) => {
  const { user, setUser } = useContext(UserContext);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    username: user?.username || "",
    email: user?.email || "",
    avatar_url: user?.avatar || null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("featured_image", updatedUser.featured_image);
    fetch(`api/v1/users/${user.id}`, {
      method: "PATCH",
      body: formData,
    })
      .then((resp) => {
        if (resp.status === 202) {
          resp
            .json()
            .then((updatedUserObj) => setUser(updatedUserObj))
            .then(() => setShowEditForm(false));
        } else {
          resp.json().then((errorObj) => alert(errorObj.errors));
        }
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    const file = event.target.files[0];
    setUpdatedUser((prevState) => ({
      ...prevState,
      avatar: file,
    }));
    setAvatarPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="Post-form"></label>
        <input
          type="file"
          accept="image/*"
          multiple={false}
          onChange={onImageChange}
        />
        <label className="edit-user"></label>
        <input
          type="text"
          onChange={handleChange}
          value={updatedUser.username}
          name="username"
        />
        <label className="edit-user"></label>
        <input
          type="text"
          onChange={handleChange}
          value={updatedUser.email}
          name="email"
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default UpdateUser;
