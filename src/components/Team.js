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
            <div className="team-name">
                <h1>{currentUser.team_name}</h1>
                <div className="team-starters">
                    <h1>Starters</h1>
                    <div className="team-count">{`${count} of 9`}</div>
                    <div>
                        <div className="position-list">
                            Quarterbacks
                            {starters.map((team) => team.position === "Quarterback" ? 
                                <Starters 
                                    key={team.id} 
                                    pos={"Quarterback"} 
                                    team={team} 
                                    user={currentUser} 
                                    count={count} 
                                    setToggle={setToggle} 
                                /> : null)
                            }
                        </div>
                        <div className="position-list">
                            Running Backs
                            {starters.map((team) => team.position === "Running Back" && team.flex === false ? 
                                <Starters 
                                    key={team.id}
                                    pos={"Running Back"} 
                                    team={team} 
                                    user={currentUser} 
                                    count={count} 
                                    setToggle={setToggle} 
                                /> : null)}
                        </div>
                        <div className="position-list">
                            Wide Receivers
                            {starters.map((team) => team.position === "Wide Receiver" && team.flex === false ? 
                                <Starters 
                                    key={team.id}
                                    pos={"Wide Receiver"} 
                                    team={team} 
                                    user={currentUser} 
                                    count={count} 
                                    setToggle={setToggle} 
                                /> : null)}
                        </div>
                        <div className="position-list">
                            Tightends
                            {starters.map((team) => team.position === "Tight End" && team.flex === false ? 
                                <Starters 
                                    key={team.id}
                                    pos={"Tight End"} 
                                    team={team} 
                                    user={currentUser} 
                                    count={count} 
                                    setToggle={setToggle} 
                                /> : null)}
                        </div>
                        <div className="position-list">
                            Kicker
                            {starters.map((team) => team.position === "Place kicker" ? 
                                <Starters 
                                    key={team.id}
                                    pos={"Place kicker"} 
                                    team={team} 
                                    user={currentUser} 
                                    count={count} 
                                    setToggle={setToggle} 
                                /> : null)}
                        </div>
                        <div className="position-list">
                            Defense
                            {starters.map((team) => team.defense === true ? 
                                <Starters 
                                    key={team.id} 
                                    pos={"Defense"} 
                                    team={team} 
                                    user={currentUser} 
                                    count={count} 
                                    setToggle={setToggle} 
                                /> : null)}
                        </div>
                        <div className="position-list">
                            Flex
                            {starters.map((team) => team.flex === true ? 
                                <Starters 
                                    key={team.id}
                                    pos={"Flex"} 
                                    team={team} 
                                    user={currentUser} 
                                    count={count} 
                                    setToggle={setToggle} 
                                /> : null)}
                        </div>
                    </div>

                </div>
                <div className="team-benched">
                    <h1>Bench</h1>
                    <ul className="list-team">
                        {benched.map(team => <Bench team={team} key={team.id} setToggle={setToggle} count={count} />)}

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Team;