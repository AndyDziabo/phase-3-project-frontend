import React, { useEffect, useState } from 'react';
import HomeCard from './HomeCard';

function Home({ setCurrentUser}) {
    const [users, setUsers] = useState([]);
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

    // function createTeam(newUser) {
    //     fetch("http://localhost:9292/add_team", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             name: newUser.team_name,
    //             user_id: newUser.id,
    //         }),
    //     })
    //     .then(res => res.json())
    //     .then(newTeam => console.log(newTeam))
    //     setUsers([...users, newUser])
    // }
    return(
        <div>
            <p>Home page</p>
            <div>
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
                <div>{`${count} of 10 Users`}</div>
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