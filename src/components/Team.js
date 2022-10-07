import React, { useState, useEffect } from "react";
import Starters from "./Starters";
import Bench from "./Bench";
import TeamInfo from "./TeamInfo";
function Team() { 
    const [teams, setTeams] = useState([])
    const [starters, setStarters] = useState([])
    useEffect(() => {
        fetch("http://localhost:9293/teams")
        .then(resp => resp.json())
        .then(setTeams)
        fetch('http://localhost:9293/teams/starting_lineup')
        .then(resp => resp.json())
        .then((data) => setStarters(data))
    },[])
    
    // function starter(){
    //     fetch('http://localhost:9293/teams/starting_lineup')
    //     .then(resp => resp.json())
    //     .then(setStarters)
    // }
    return(
        <div>
            <p>Team page</p>
            <h1>Starters</h1>
            <ul>
                {starters.map(team => <Starters team={team} key={team.id}/>)}

            </ul>
            <h1>Bench</h1>
            <ul>
                {teams.map(team => <Bench team={team} key={team.id}/>)}

            </ul>
            <h2>Your Team</h2>
            <ul>
                {teams.map(team => <TeamInfo team={team} key={team.id}/>)}

            </ul>
        </div>
    )
}

export default Team;