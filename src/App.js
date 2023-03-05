import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context/userContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import PostFeed from "./components/PostFeed";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [videos, setVideos] = useState([])

  useEffect(() => {
    if (user) {
      fetch("/api/v1/videos")
      .then(resp => resp.json())
      .then(data => setVideos(data))
    }
  }, [user]);

  useEffect(() => {
    fetch("/api/v1/authorized_user").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
        });
      } else {
        setUser(null)
      }
    });
  }, [setUser]);

  if (!user) return (
    <>
     {showLogin ? 
      <Login setShowLogin={setShowLogin} />
     : 
      <Signup setShowLogin={setShowLogin} />
     }
      </>
  )

  return (
    <div className="App">
        <NavBar setUser={setUser}/>
      <Routes>
        <Route path="/home" element={<PostFeed videos={videos}/>}/>
        <Route/>
        <Route/>
        <Route/>
      </Routes>
    </div>
  );
}

export default App;
