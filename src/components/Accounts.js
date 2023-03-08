import { useEffect, useState } from 'react';
import Account from './Account';

const Accounts = () => {
    const [getUsers, setGetUsers] = useState([])
    useEffect(() => {
        fetch("/api/v1/users")
        .then(res => res.json())
        .then(setGetUsers)
    }, []);

    const mappedUsers = getUsers.map(user => <Account key={user.id} {...user}/>)
    return (
        <div>
            <h1>Active Users</h1>
            {mappedUsers}
        </div>
    );
}

export default Accounts;
