import React, { useEffect, useState } from 'react';
import HomeCard from './HomeCard';

function Home({ setCurrentUser, setUsers, users }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:9292/users`)
        .then(res => res.json())
        .then(data => setUsers(data))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:9292/user_count`)
        .then(res => res.json())
        .then(data => setCount(data))
    }, [handleUser])

    function handleUser(e) {
        e.preventDefault();
        fetch("http://localhost:9292/add_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: e.target.user.value,
                team_name: e.target.team.value,
            }),
        })
        .then(res => res.json())
        .then(newUser => setUsers([...users, newUser]))
    }

    return(
        <div>
            <div className='home-form'>
                <form onSubmit={handleUser}>
                    <input
                        type="text"
                        placeholder="Enter user Name"
                        name="user"
                    />
                    <input
                        type="text"
                        placeholder="Enter team Name"
                        name="team"
                    />
                    <button type="submit" disabled={count >= 10}>{count < 10 ? "Create User" : "Users Full"}</button>
                </form>
            </div>
            <div>
                <div className="draft-count">{`${count} of 10 Users`}</div>
                <div>
                    <ul className="user-list">
                        {users.map((user) => (<HomeCard key={user.id} user={user} setCurrentUser={setCurrentUser} />))}
                    </ul>
                </div>
            </div>
         </div>
    )
}

export default Home;