import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Card from "@mui/material/Card";


const AccountDetails = ({ newPost, setNewPost }) => {
  const navigate = useNavigate();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { handleAccountDeletion } = useContext(UserContext);
  const { editUser } = useContext(UserContext);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: user?.password || "",
    avatar_url: user?.avatar || null,
  });

  const accountDelete = () => {
    setShowDelete((current) => !current);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.username]: e.target.value });
  };

  const onImageChange = (event) => {
    const file = event.target.files[0];
    setUpdatedUser((prevState) => ({
      ...prevState,
      avatar: file,
    }));
    setAvatarPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("title", updatedUser.title);
    formData.append("featured_image", updatedUser.featured_image);
    fetch("api/v1/users", {
      method: "POST",
      body: formData,
    }).catch((error) => console.log(error));
  };

  return (
      <div onSubmit={handleSubmit}>
        <Card className='personal-card'>
        <h1 className='username'>{user.username}</h1>
        </Card>


      <form onSubmit={editUser}>
        <label className="Post-form"></label>
        <input
          type="file"
          accept="image/*"
          multiple={false}
          onChange={onImageChange}
        />
        <label className="edit-user"></label>
        <input type="text" onChange={handleChange} value={user.username} name='username'/>
        <label className="edit-user"></label>
        <input type="text" onChange={handleChange} value={user.email} name='email'/>
        <input type="submit" />
      </form>

      <button onClick={(e) => handleAccountDeletion(e, user, navigate)}>
        Delete Account
      </button>
    </div>
  );
};

export default AccountDetails;
