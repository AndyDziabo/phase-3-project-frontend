import React, {useState, useEffect } from "react"
function Starters({ team, starters}){

    const [player, setPlayer] = useState([])
    const [starting, setStarting] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:9293/teams/player_name/${team.player_id}`)
        .then(resp => resp.json())
        .then(setPlayer)
    }, [])

    function handleClick() {
        setStarting((starting) => !starting)
        starters()
    }


    return(
        <div>
            <li>{team.name}</li>
            <li>{player.name}</li>
            <li>{player.position}</li>
            <li>{player.status}</li>
            <li>{player.team_name}</li>
            <button onClick={handleClick}>Start</button>
            <button onClick={handleClick}>Bench</button>
        </div>
    )
}

export default Starters