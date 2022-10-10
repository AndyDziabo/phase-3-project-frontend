import React, {useState, useEffect } from "react"
function Bench({ team, setToggle, count }){
    const [isTrue, setIsTrue] = useState(false);
    const [player, setPlayer] = useState([])

    useEffect(() => {
        fetch(`http://localhost:9292/teams/player_name/${team.player_id}`)
        .then(resp => resp.json())
        .then(setPlayer)
    }, [])

    function handleClick() {
        if(player.position === "Wide Receiver"){
            setIsTrue(true);            
        }else if(player.position === "Running Back"){
            setIsTrue(true);
        }else if(player.position === "Tight End"){
            setIsTrue(true);
        }else{
            handleSelect('position')
        }
    }

    function handleSelect(e) {
        let flex = false;

        setIsTrue(false)
        if(e === 'flex'){
            flex = true;
        }

        fetch(`http://localhost:9292/teams/${team.id}`, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                starter: true,
                flex: flex,
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
             <div className={isTrue ? "choice-show" : "choice-hide"}>
                <button value="position" onClick={(e) => handleSelect(e.target.value)}>{`Add to ${player.position}`}</button>
                <button value="flex" onClick={(e) => handleSelect(e.target.value)}>Add to Flex</button>
            </div>
        </li>
    )
}

export default Bench