import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Card from "@mui/material/Card";
import UpdateUser from "./UpdateUser";



const AccountDetails = ({ newPost, setNewPost }) => {
  const navigate = useNavigate();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { handleAccountDeletion } = useContext(UserContext);
  const { editUser } = useContext(UserContext);
  
  

  const accountDelete = () => {
    setShowDelete((current) => !current);
  };

 

  

  return (
      <div>
        <Card className='personal-card'>
            <img src={user.avatar_url} alt='avatar'/>
        <h1 className='username'>{user.username}</h1>
        
        </Card>
        <button onClick={() => setShowEditForm(current => !current)}>Edit Profile</button>
       { showEditForm ? <UpdateUser setShowEditForm={setShowEditForm}/> : null }
      

      <button onClick={(e) => handleAccountDeletion(e, user, navigate)}>
        Delete Account
      </button>
    </div>
  );
};

export default AccountDetails;
