import { useContext } from "react";
import { UserContext } from "../context/userContext";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Account = ({ id, username, avatar, friends }) => {
  const { user, setUser } = useContext(UserContext);

  const checkFriendship = () =>
    friends.find((friend) => {
      return friend.id === user.id;
    });

  const addFriend = () => {
    fetch("/api/v1/friendships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reciever_id: id, sender_id: user.id }),
    })
      .then((resp) => resp.json())
      .then((userData) => setUser(userData));
  };
  const removeFriend = () => {
    fetch("/api/v1/friendships", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reciever_id: id, sender_id: user.id }),
    })
      .then((resp) => resp.json())
      .then((friendData) => setUser({ ...user, friends: friendData }));
  };

  return (
    <div className='Account-Card'>
      {/* <h2 className='user-cards'>{username}</h2>
      {user.id !== id ? (
        <button onClick={checkFriendship() ? removeFriend : addFriend}>
          {checkFriendship() ? "Remove Friend" : "Add Friend"}
        </button>
      ) : null} */}
      <li >
        <Card sx={{ maxWidth: 250 }} >
          <CardMedia image={avatar}  className='card-avatar' />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {username}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={checkFriendship() ? removeFriend : addFriend}
            >
              {checkFriendship() ? "Remove Friend" : "Add Friend"}
            </Button>
          </CardActions>
        </Card>
      </li>
    </div>
  );
};

export default Account;
