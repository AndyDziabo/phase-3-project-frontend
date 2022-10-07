import React, { useEffect, useState } from "react";

function HomeCard({ user, setCurrentUser }) {
    function handleUser() {
        setCurrentUser(user)
    }

    return(
        <li>
            <div className="player-row">
                <span className="player-name">{user.name} </span>
                <span className="team">{user.team_name}</span>
                <button onClick={handleUser}>Set User</button>
            </div>
        </li>
    )
}

export default HomeCard;