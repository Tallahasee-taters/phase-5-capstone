import {useContext} from 'react';
import { UserContext } from '../context/userContext';
const Account = ({id, username, email, friends}) => {

    const { user, setUser } = useContext(UserContext);

    const checkFriendship = () => friends.find(friend => {
        return friend.id === user.id 
    })

    const addFriend = () => {
        fetch("/api/v1/friendships", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({reciever_id: id, sender_id: user.id})
        })
        .then(resp => resp.json())
        .then(userData => setUser(userData))
    
    }
    const removeFriend = () => {
        fetch("/api/v1/friendships", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({reciever_id: id, sender_id: user.id})
        })
        .then(resp => resp.json())
        .then(friendData => setUser({...user, friends: friendData}))
    
    }

    return (
        <div>
            <h1>
                {username}
            </h1>
            { user.id !== id ? <button onClick={checkFriendship() ? removeFriend : addFriend}>{checkFriendship() ? "Remove Friend" : "Add Friend"}</button> : null }
        </div>
    );
}

export default Account;
