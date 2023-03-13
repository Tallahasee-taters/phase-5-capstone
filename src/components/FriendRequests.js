import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Friends = () => {
  const { user, setUser } = useContext(UserContext);

  const handleAccept = (friendshipId) => {
    fetch(`/api/v1/friendships/${friendshipId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 202) {
        res.json().then((userObj) => setUser(userObj));
      } else {
        res.json().then((errObj) => alert(errObj.error || errObj.errors));
      }
    });
  };
  const handleReject = (friendshipId) => {
    fetch(`/api/v1/friendships/${friendshipId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 202) {
        res.json().then((userObj) => setUser(userObj));
      } else {
        res.json().then((errObj) => alert(errObj.error || errObj.errors));
      }
    });
  };

  const handleRemove = (friendId) => {
    fetch(`/api/v1/friendships/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friendId }),
    }).then((res) => {
      if (res.status === 202) {
        res.json().then((userObj) => setUser(userObj));
      } else {
        res.json().then((errObj) => alert(errObj.error || errObj.errors));
      }
    });
  };

  return (
    <div>
      <h2 className='Req-Header'>Pending Friend Requests</h2>
      {user.pending_friend_requests.map((req) => (
        <div key={req.id}>
          <NavLink>
            <h3>{req.sender.username}</h3>
          </NavLink>

          <button onClick={() => handleAccept(req.id)}>Accept</button>
          <button onClick={() => handleReject(req.id)}>Reject</button>
        </div>
      ))}
      <h2 className='FriendsList-Header'>Friends List</h2>
      {user.friends.map((friend) => (
        <div key={friend.id}>
          <NavLink>
            <h3>{friend.username}</h3>
          </NavLink>
          <button onClick={() => handleRemove(friend.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Friends;
