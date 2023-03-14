import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context/userContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import PostFeed from "./components/PostFeed";
import Account from "./components/ActiveAccounts";
import Friends from "./components/FriendRequests";
import Accounts from "./components/Accounts";
import AccountDetails from "./components/AccountDetails";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (user && videos.length < 1) {
      fetch("/api/v1/videos")
        .then((resp) => resp.json())
        .then((data) => setVideos(data));
    }
  }, [user, videos]);

  useEffect(() => {
    fetch("/api/v1/authorized_user").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
        });
      } else {
        setUser(null);
      }
    });
  }, [setUser]);

  if (!user)
    return (
      <>
        {showLogin ? (
          <Login setShowLogin={setShowLogin} />
        ) : (
          <Signup setShowLogin={setShowLogin} />
        )}
      </>
    );

  const createPost = (e, newPost, setNewPost, setPostForm) => {
    e.preventDefault();
    console.log(newPost);
    fetch("/api/v1/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    }).then((resp) => {
      if (resp.status === 201) {
        resp.json().then((newPost) => {
          setVideos((videos) => [newPost, ...videos]);
          setNewPost({
            title: "",
            video_url: "",
          });
          setPostForm(false);
        });
      } else {
        resp.json().then((data) => console.log(data));
      }
    });
  };

  return (
    <div className="App">
      <NavBar setUser={setUser} />
      <Routes>
        <Route
          path="/home"
          element={
            <PostFeed
              videos={videos}
              setVideos={setVideos}
              createPost={createPost}
            />
          }
        />
        <Route path="/account" element={<Account />} />
        <Route path="/users" element={<Accounts />} />
        <Route path="/friendreq" element={<Friends />} />
        <Route path="/useraccount" element={<AccountDetails />} />
        {/* <Route path="/*" element={}/> */}
      </Routes>
    </div>
  );
}

export default App;
