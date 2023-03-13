import { useEffect, useState } from "react";
import Account from "./ActiveAccounts";

const Accounts = () => {
  const [getUsers, setGetUsers] = useState([]);
  useEffect(() => {
    fetch("/api/v1/users")
      .then((res) => res.json())
      .then(setGetUsers);
  }, []);

  const mappedUsers = getUsers.map((user) => (
    <Account key={user.id} {...user} />
  ));
  return (
    <div>
      <h1 className='Accounts-Header'>Active Gamers</h1>
      <div className='orientation'>
      {mappedUsers}
      </div>
    </div>
  );
};

export default Accounts;
