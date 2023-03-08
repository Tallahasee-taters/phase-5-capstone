import { createContext, useState} from "react";
import { useNavigate, Navigate } from "react-router-dom";
const UserContext = createContext()

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [editedUserData, setEditedUserData] = useState({
      username: "",
      email: "",
      password: "",
    })

    const handleAccountDelete = () => {
      fetch(`/api/v1/users/${user.id}`, {
        method: "DELETE",
      })
      .then((r) => {
        if (r.status === 204) {
          setUser(null)
          Navigate('/home')
        } else {
          r.json()
          .then(err => alert(err))
        }
      })
    }

    const editUser = (e, editedUserData, setEditedUserData) => {
      e.preventDefault()
      fetch(`/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedUserData)
      })
      .then(res => {
        if (res.status !== 200) {
          res.json()
          .then(message => alert(message.errors))
        }
      })
    }



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
        <UserContext.Provider value={{handleLogin, user, setUser, handleSubmit, editUser, handleAccountDelete}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}