import React, {useState, useEffect } from "react"
function Bench({ team, setToggle, count }){

    const [player, setPlayer] = useState([])

    useEffect(() => {
        fetch(`http://localhost:9292/teams/player_name/${team.player_id}`)
        .then(resp => resp.json())
        .then(setPlayer)
    }, [])

    function handleClick(e) {
        fetch(`http://localhost:9292/teams/${team.id}`, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                starter: e.target.value,
            }),
        })
        .then(resp => resp.json())
        .then(data => setToggle(data))
    }


    return(
        <li>
            <div className="player-row">
                <span className="player-name">{player.name}</span>
                <span className="player-position">{player.position}</span>
                <span className="status">{player.status}</span>
                <span className="team">{player.team_name}</span>
                <button onClick={handleClick} value="true" disabled={count >= 9}>Start</button>
 
            </div>
        </li>
    )
}

export default Bench