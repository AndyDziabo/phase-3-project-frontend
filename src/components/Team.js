import React, { useState, useEffect } from "react";
import Starters from "./Starters";
import Bench from "./Bench";

function Team({ currentUser }) { 
    const [teams, setTeams] = useState([])
    const [starters, setStarters] = useState([])
    const [benched, setBenched] = useState([])
    const [toggle, setToggle] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:9292/teams/${currentUser.id}`)
        .then(resp => resp.json())
        .then(data => rerenderTeams(data))
        fetch(`http://localhost:9292/teams/starting_lineup/${currentUser.id}`)
        .then(resp => resp.json())
        .then((data) => setStarters(data))
        fetch(`http://localhost:9292/teams/benched/${currentUser.id}`)
        .then(resp => resp.json())
        .then((data) => setBenched(data))
        fetch(`http://localhost:9292/starter_count/${currentUser.id}`)
        .then(resp => resp.json())
        .then((data) => setCount(data))
    },[toggle])

    function rerenderTeams(data) {
        const rerender = data.map((t) => t)
        setTeams(rerender)
    }
    

    return(
        <div className="team-main">
            <div className="team-name"><h1>{currentUser.team_name}</h1></div>
            <h1>Starters</h1>
            <div className="draft-count">{`${count} of 9`}</div>

            <ul className="list-team">
                {starters.map(team => <Starters team={team} key={team.id} setToggle={setToggle} />)}

            </ul>
            <h1>Bench</h1>
            <ul className="list-team">
                {benched.map(team => <Bench team={team} key={team.id} setToggle={setToggle} count={count} />)}

            </ul>
        </div>
    )
}

export default Team;