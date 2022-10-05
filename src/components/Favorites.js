import { useEffect, useState } from "react"

function Favorites({ fav, pos, user, onDelete, onDraft, count, setFull }) {
    const [player, setPlayer] = useState([]);
    const [drafted, setDrafted] = useState(false);
    const [team, setTeam] = useState([]);
    const [draftInfo, setDraftInfo] = useState([]);
    const [compare, setCompare] = useState([]);
    let result = false;

    useEffect(() => {
        fetch(`http://localhost:9292/player/${fav.player_id}`)
        .then(res => res.json())
        .then(data => setPlayer(data))
        fetch(`http://localhost:9292/team/${user.id}`)
        .then(res => res.json())
        .then(data => setTeam(data))
        fetch(`http://localhost:9292/draft_pos_info/${user.id}`)
        .then(res => res.json())
        .then(data => setDraftInfo(data))
    }, [])
    
    function handleDelete() {
        console.log(player.id, player.name)
        fetch(`http://localhost:9292/fav_delete/${user.id}/${player.id}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(data => onDelete(data))
    }

    function handleDraft() {
        let draftList = [];

        draftInfo.forEach((d) =>{
            draftList = team.map((p) => {
                if(p.id === d.player_id){
                    if(d.flex === true){
                        p.position = "Flex"
                        console.log(p)
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
console.log(draftList)
        if(draftList.length < 7){
            if(pos === "Quarterback"){
                draftList.find(({position}) => position === "Quarterback") ? result = true : result = false
            }else if(pos === "Running Back"){
                draftList.find(({position}) => position === "Running Back") ? result = true : result = false
            }else if(pos === "Wide Receiver"){
                draftList.find(({position}) => position === "Wide Receiver") ? result = true : result = false
            }else if(pos === "Tight End"){
                draftList.find(({position}) => position === "Tight End") ? result = true : result = false
            }else if(pos === "Place kicker"){
                draftList.find(({position}) => position === "Place Kicker") ? result = true : result = false
            }else if(pos === "Defense"){
                draftList.find(({position}) => position === "Defense") ? result = true : result = false
            }else if(pos === "Flex"){
                draftList.find(({position}) => position === "Flex") ? result = true : result = false
            }
        }else{
            result = false
        }
        
        if(result === false){
            setDrafted(true);
            console.log("draft: ",player.id, player.name)
            fetch("http://localhost:9292/draft_player", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: 1,
                    player_id: player.id,
                }),
            })
            .then(res => res.json())
            .then(drafted => onDraft(drafted))
        }else{
            setFull(pos)
            console.log("try again")
        }
    }

    return(
        <li className="list-item">
            <button onClick={handleDraft} disabled={player.is_drafted || count >=14 || drafted}>{player.is_drafted ? "Drafted" : "Draft"}</button>
            <span>{player.name} </span>
            <span> {player.position}</span>
            <span>{player.status}</span>
            <span>{player.team_name}</span>
            <button onClick={handleDelete} disabled={player.is_drafted || drafted}>{player.is_drafted ? "Drafted" : "Remove"}</button>
        </li>
    )
}

export default Favorites;