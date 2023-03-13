import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    name: user?.username || '',
    email: user?.email || '',
    password: user?.password || '',
    avatar: user?.avatar || null
  })

  const handleAccountDeletion = (e, user, navigate) => {
    fetch(`api/v1/users/${user.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.status === 204) {
        setUser(null);
        navigate("/home");
      } else {
        r.json().then((err) => alert(err));
      }
    });
  };

  const handleUpdateUser = (editedUserData) => {
    const formData = new FormData()
    formData.append('avatar', editedUserData.avatar)
    // debugger
    formData.append('id', user.id) 
    fetch(`/users/${user.id}`, {
      method: 'PATCH',
      body: formData,
    })
    .then(r => {
      if (r.status === 202) {
        r.json().then(userObj => setUser(userObj))
      } else {
      r.json().then(errorObj => alert(errorObj.error || errorObj.errors))
      }
    })
  };
  // const editUser = (e, editedUserData, setEditedUserData, navigate) => {
  //   e.preventDefault();
  //   console.log(editedUserData);
  //   fetch(`api/v1/users/${user.id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(editedUserData),
  //   }).then((res) => {
  //     if (res.status !== 200) {
  //       res.json().then((messageObj) => alert(messageObj.errors));
  //     } else {
  //       res
  //         .json()
  //         .then((updatedUser) => setUser(updatedUser))
  //         .then(() => navigate(-1));
  //       setEditedUserData({
  //         username: "",
  //         email: "",
  //       });
  //     }
  //   });
  // };

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
            navigate("/home");
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
    })
      .then((res) => {
        if (res.status === 201) {
          res.json().then((userObj) => {
            setUser(userObj);
            navigate("/home");
          });
        } else {
          res.json().then((errorObj) => alert(errorObj.error));
        }
      })
      .catch((err) => alert(err));
  };

  const createPost = (e, newPost, setNewPost) => {
    e.preventDefault();
    console.log(newPost)
    fetch('/api/v1/videos', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    }).then((resp) => {
      if (resp.status === 201) {
        resp.json().then((newPost) => {
          setNewPost(videos => [...videos, newPost]);
        });
      } else {
        resp.json().then((data) => console.log(data));
      }
    });
  };

  return (
    <UserContext.Provider
      value={{
        handleLogin,
        user,
        setUser,
        handleSubmit,
        handleUpdateUser,
        handleAccountDeletion,
        editedUserData,
        setEditedUserData,
        createPost
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider};
