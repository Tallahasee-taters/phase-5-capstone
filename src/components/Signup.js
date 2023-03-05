import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import React from "react";
import { useNavigate } from "react-router-dom";


const Signup = ({setShowLogin}) => {
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        // passwordConfirmation: ''
    });

  const {handleSubmit} = useContext(UserContext) 
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    setNewUser({...newUser, [e.target.name]:e.target.value})
}

  return (
    <div className="form" >

      <form onSubmit={(e) => handleSubmit(e, newUser, navigate)}>
        <h1 className="signupHeader">Signup Today!</h1>
        <label className="userSignup">Email</label>
        <input
          onChange={handleChange}
          name="email"
          className="input"
          value={newUser.email}
          type="text"
        />
        <br/>

        <label className="userSignup">Username</label>
        <input
          onChange={handleChange}
          name="username"
          className="input"
          value={newUser.username}
          type="text"
        />
        <br/>
        <label className="userSignup">Password</label>
        <input
          onChange={handleChange}
          name="password"
          className="input"
          value={newUser.password}
          type="password"
        />
        <br/>
        {/* <label className="user-password-confirmation">Confirm Password</label>
        <input
          onChange={handleChange}
          name="passwordConfirmation"
          className="input"
          value={newUser.passwordConfirmation}
          type="password"
        /> */}

        <input className="btn" type="submit" value='signup'/>
        <br/>
        <button onClick={() => setShowLogin(current => !current)}>login</button>
      </form>
    </div>
  );
};

export default Signup;
