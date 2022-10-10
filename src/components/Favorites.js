import { useEffect, useState } from "react"

function Favorites({ fav, pos, user, onDelete, onDraft, count, setFull, team }) {
    const [player, setPlayer] = useState([]);
    const [drafted, setDrafted] = useState(false);
    const [draftInfo, setDraftInfo] = useState([]);
    let result = false;

    useEffect(() => {
        fetch(`http://localhost:9292/player/${fav.player_id}`)
        .then(res => res.json())
        .then(data => setPlayer(data))
        fetch(`http://localhost:9292/draft_pos_info/${user.id}`)
        .then(res => res.json())
        .then(data => setDraftInfo(data))
    }, [])

    function handleDelete() {
        fetch(`http://localhost:9292/fav_delete/${user.id}/${player.id}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(data => onDelete(data))
    }

    function handleDraft() {
        let draftList = [];

        if(draftInfo.length !== 0){
            draftInfo.forEach((d) =>{
                draftList = team.map((p) => {
                    if(p.id === d.player_id){
                        if(d.flex === true){
                            p.position = "Flex"
                            return p
                        }else if(d.defense === true){
                            p.position = "Defense"
                            return p
                        }
                    }else{
                        return p
                    }
                })
            })
        }else{
            draftList = team;
        }

        if(draftList.length < 9){
            if(pos === "Quarterback"){
                draftList.find(({position}) => position === "Quarterback") ? result = true : result = false
            }else if(pos === "Running Back"){
                let numR = draftList.filter(p => p.position === "Running Back")
                numR.length >= 2 ? result = true : result = false
            }else if(pos === "Wide Receiver"){
                let numW = draftList.filter(p => p.position === "Wide Receiver")
                numW.length >= 2 ? result = true : result = false
            }else if(pos === "Tight End"){
                draftList.find(({position}) => position === "Tight End") ? result = true : result = false
            }else if(pos === "Place kicker"){
                draftList.find(({position}) => position === "Place kicker") ? result = true : result = false
            }else if(pos === "Defense"){
                draftList.find(({position}) => position === "Defense") ? result = true : result = false
            }else if(pos === "Flex"){
                draftList.find(({position}) => position === "Flex") ? result = true : result = false
            }
        }else{
            result = false
        }

        if(result === false){
            let setDefense;
            if(pos === "Defense"){
                setDefense = true;
            }else{
                setDefense = false;
            }

            fetch("http://localhost:9292/draft_player", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: user.team_name,
                    user_id: user.id,
                    player_id: player.id,
                    starter: false,
                    position: player.position,
                    flex: false,
                    defense: setDefense,
                }),
            })
            .then(res => res.json())
            .then(drafted => console.log(drafted))

            fetch(`http://localhost:9292/is_drafted/${player.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    is_drafted: true,
                }),
            })
            .then(res => res.json())
            .then(drafted => onDraft(drafted))
            setDrafted(true);
        }else{
            setFull(pos)
        }
    }

    return(
        <li className="list-item">
            <div className="player-row">
            <button onClick={handleDraft} disabled={player.is_drafted || count >=14 || drafted}>{player.is_drafted ? "Drafted" : "Draft"}</button>
            <span className="player-name">{player.name} </span>
            <span className="player-position"> {player.position}</span>
            <span className="status">{player.status}</span>
            <span className="team">{`${player.team_location}  ${player.team_name}`}</span>
            <button onClick={handleDelete} disabled={player.is_drafted || drafted}>{player.is_drafted ? "Drafted" : "Remove"}</button>
            </div>
        </li>
    )
}

export default Favorites;