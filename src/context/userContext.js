import { createContext, useState} from "react";
const UserContext = createContext()

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);


      const handleLogin = (e, userObj, navigate) => {
        e.preventDefault();
        fetch("/api/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObj),
        })
          .then((res) => {
            if (res.status === 200) {
              res.json().then((userObj) => {
                setUser(userObj);
                navigate("/home")
              });
            } else {
              res.json().then((errorObj) => alert(errorObj.error));
            }
          })
          .catch((err) => alert(err));
      };
    
      const handleSubmit = (e, userInfo, navigate) => {
        e.preventDefault();
        fetch("/api/v1/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }).then((res) => {
            if (res.status === 201) {
              res.json().then((userObj) => {
                setUser(userObj);
                navigate("/home")
              });
            } else {
              res.json().then((errorObj) => alert(errorObj.error));
            }
          })
          .catch((err) => alert(err));
      };

    return (
        <UserContext.Provider value={{handleLogin, user, setUser, handleSubmit}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}