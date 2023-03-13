import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Login = ({ setShowLogin, showLogin }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const { handleLogin } = useContext(UserContext);

  return (
    <div className="form">
      <form onSubmit={(e) => handleLogin(e, user, navigate)}>
        <h1 className="loginHeader">Game On!</h1>
        <label className="loginLabel" htmlFor="email">
          Username
        </label>
        <input
          type="text"
          onChange={handleChange}
          value={user.username}
          className="form-username"
          name="email"
        />
        <br />
        <label className="loginLabel" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          onChange={handleChange}
          value={user.password}
          className="form-password"
          name="password"
        />
        <br />
        <input type="submit" className='loginSbmt'/>
        <br />
        <button onClick={() => setShowLogin((current) => !current)}>
          Go Back
        </button>
      </form>
    </div>
  );
};

export default Login;
