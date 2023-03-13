import { useState, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const NavBar = ({ setUser }) => {
  const { user } = useContext(UserContext);
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
      <MenuIcon onClick={toggleDrawer} className='NavIcon'/>
      <Drawer anchor="top" open={open} onClose={toggleDrawer}>
        <ul className="Links">
          <button className="NavButtons">
            <Link to="/home">Community Feed</Link>
          </button>
          <button className="NavButtons">
            <Link to="/friendreq">Friend Requests</Link>
          </button>
          <button className="NavButtons">
            <Link to="/users">Active Accounts</Link>
          </button>
          <button className="NavButtons">
            <Link to="/useraccount">Account</Link>
          </button>
          {user ? (
            <span className="logoutBtn">
              <button onClick={() => logout()} className="nav">
                logout
              </button>
            </span>
          ) : null}
        </ul>
      </Drawer>
    </div>
  );
};

export default NavBar;
