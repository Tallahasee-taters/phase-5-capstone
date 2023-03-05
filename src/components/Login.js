import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";


const Login = ({setShowLogin, showLogin}) => {
    
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()
 

  const handleChange = (e) => {
    setUser({...user, [e.target.name]:e.target.value})
}
const {handleLogin} = useContext(UserContext)

  
  return (
    <div className='loginFormContainer'>
      <form onSubmit={(e) => handleLogin(e, user, navigate)}>
        <h1 className="loginHeader">Get In Here!</h1>
        <label className='loginLabel' htmlFor="email">Email</label>
        <input
          type="text"
          onChange={handleChange}
          value={user.email}
          className="form-email"
          name="email"
        />
        <br/>
        <label className="loginLabel" htmlFor="password">Password</label>
        <input
          type="password"
          onChange={handleChange}
          value={user.password}
          className="form-password"
          name="password"
        />
        <br/>
        <input type="submit" />
        <br/>
      <button onClick={() => setShowLogin(current => !current)}>signup</button>
      </form>
    </div>
  );
};

export default Login;
