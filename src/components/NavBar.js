import { useState, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const NavBar = ({ setUser }) => {
    const {user} = useContext(UserContext)
  const [open, setOpen] = useState(false);



  function toggleDrawer() {
    setOpen(!open);
  }

  const logout = () => {
    fetch("api/v1/logout", {
      method: "DELETE",
    }).then((resp) => {
      if (resp.status === 204) {
        setUser(null);
      }
    });
  };

  return (
    <div className="NavBar">
      <MenuIcon onClick={toggleDrawer} />
      <Drawer anchor="top" open={open} onClose={toggleDrawer}>
        <Link to="/home">Community Feed</Link>
        <Link to="/friendreq">Friend Requests</Link>
        <Link to="/users">Active Accounts</Link>
        { user ? (
        <span className="logoutBtn">
          <button onClick={() => logout()} className="nav">
            🚪
          </button>
        </span>
        ) : null }
      </Drawer>
    </div>
  );
};

export default NavBar;