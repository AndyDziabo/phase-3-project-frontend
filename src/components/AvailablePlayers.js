import React, { useState } from "react";

function AvailablePlayers({ player, onAdd }) {
    const [isTrue, setIsTrue] = useState(false);
    const [btnTrue, setBtnTrue] = useState(false);

    function handleClick() {
        if(player.position === "Wide Receiver"){
            setIsTrue(true);            
        }else if(player.position === "Running Back"){
            setIsTrue(true);
        }else if(player.position === "Tight End"){
            setIsTrue(true);
            setBtnTrue(true);
        }else{
            handleSelect('position')
        }
    }

    function handleSelect(e) {
        let flex = false;
        let defense = false;

        setIsTrue(false)
        if(e === 'flex'){
            flex = true;
        }else if(e === 'defense'){
            defense = true;
        }else if(player.catagory === 'defense'){
            defense = true;
        }

        fetch("http://localhost:9292/add_favorite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: 1,
                player_id: player.id,
                flex: flex,
                defense: defense,
                position: player.position,
            }),
        })
        .then(res => res.json())
        .then(newFav => onAdd(newFav))
    }
  

    return(
        <li>
            <div className="player-row">
                <button onClick={handleClick} disabled={player.is_drafted}>{player.is_drafted ? "Drafted" : "Add"}</button>
                <span className="player-name">{player.name} </span>
                <span className="player-position"> {player.position}</span>
                <span className="status">{player.status}</span>
                <span className="team">{`${player.team_location}  ${player.team_name}`}</span>
            </div>
            <div className={isTrue ? "choice-show" : "choice-hide"}>
                <button value="position" onClick={(e) => handleSelect(e.target.value)}>{`Add to ${player.position}`}</button>
                <button value="flex" onClick={(e) => handleSelect(e.target.value)}>Add to Flex</button>
                <button value="defense" onClick={(e) => handleSelect(e.target.value)} className={btnTrue ? "button-show" : "choice-hide"}>Add to Defense</button>
            </div>
        </li>
    )
}

export default AvailablePlayers;