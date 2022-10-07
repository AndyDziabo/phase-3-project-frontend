import React, { useEffect, useState} from "react";
import AvailablePlayers from "./AvailablePlayers";
import TeamsDropDown from "./TeamsDropDown";
import PositionDropDown from "./PositionDropDown";
import Favorites from "./Favorites";

function Draft({ currentUser }) {
    const [players, setPlayers] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [teams, setTeams] = useState([]);
    const [positions, setPositions] = useState([]);
    const [teamSelect, setTeamSelect] = useState('all');
    const [positionSelect, setPositionSelect] = useState('all');
    const [count, setCount] = useState(0);
    const [full, setFull] = useState('');
    const [toggle, setToggle] = useState(false);
    const [team, setTeam] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9292/players")
        .then(res => res.json())
        .then(data => setPlayers(data))
        fetch("http://localhost:9292/team_name")
        .then(res => res.json())
        .then(data => setTeams(data))
        fetch("http://localhost:9292/positions")
        .then(res => res.json())
        .then(data => setPositions(data))
    }, []);

    useEffect(() => {
        fetch(`http://localhost:9292/draft_team_select/${teamSelect}/${positionSelect}`)
        .then(res => res.json())
        .then(data => setPlayers(data))
    }, [teamSelect, positionSelect])

    useEffect(() =>{
        fetch(`http://localhost:9292/favorites/${currentUser.id}`)
        .then(res => res.json())
        .then(data => setFavorites(data))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:9292/team_count/${currentUser.id}`)
        .then(res => res.json())
        .then(data => setCount(data))
    }, [handleDraft])

    useEffect(() => {
        fetch(`http://localhost:9292/team/${currentUser.id}`)
        .then(res => res.json())
        .then(data => setTeam(data))
    }, [])

    function handleTeamSelect(e) {
        setTeamSelect(e.target.value)
    }

    function handlePositionSelect(e) {
        setPositionSelect(e.target.value)
    }

    function handleAdd(newFav) {
        setFavorites([...favorites, newFav]);
    }

    function handleDelete(deleted) {
        const updatedFavs = favorites.filter((fav) => fav.player_id !== deleted.player_id);
        setFavorites(updatedFavs);
    }

    function handleDraft(drafted) {
        const updatedPlayers = players.map((player) => {
            if(player.id === drafted.id) {
                return drafted;
            }else{
                return player;
            }
        })
        const updatedFavs = favorites.map((player) => {
            if(player.id === drafted.id) {
                return drafted;
            }else{
                return player;
            }
        })
        fetch(`http://localhost:9292/team/${currentUser.id}`)
        .then(res => res.json())
        .then(data => setTeam(data))
        setPlayers(updatedPlayers);
        setFavorites(updatedFavs)
    }

    function handleFull(position) {
        setFull(position)
        setToggle(true)
        const timer = setTimeout(() => {
            setToggle(false)
          }, 2500);
          return () => clearTimeout(timer);
    }


    return(
        <div>
            <h1 className="draft-title">{`${currentUser.name}'s Draft page`}</h1>
            <div className="draft-main">
                <div className="draft-fav">
                    <div className="fav-title">Favorites</div>
                    <div className="fav-sub">
                        <div className="draft-count">{`${count} of 14 Drafted`}</div>
                        <div className={toggle ? "message" : "message-hide"}>{`Please draft for the other positions before choosing another ${full}`}</div>
                    </div>
                    <div>
                        <div className="position-list">
                            Quarterbacks
                            {favorites.map((fav) => fav.position === "Quarterback" ? 
                                <Favorites 
                                    key={fav.id} 
                                    pos={"Quarterback"} 
                                    fav={fav} user={currentUser} 
                                    onDelete={handleDelete} 
                                    onDraft={handleDraft} 
                                    count={count} 
                                    setFull={handleFull} 
                                    team={team} 
                                /> : null)
                            }
                        </div>
                        <div className="position-list">
                            Running Backs
                            {favorites.map((fav) => fav.position === "Running Back" && fav.flex === false ? 
                                <Favorites 
                                    key={fav.id} 
                                    pos={"Running Back"} 
                                    fav={fav} 
                                    user={currentUser} 
                                    onDelete={handleDelete} 
                                    onDraft={handleDraft} 
                                    count={count} 
                                    setFull={handleFull} 
                                    team={team} 
                                /> : null)}
                        </div>
                        <div className="position-list">
                            Wide Receivers
                            {favorites.map((fav) => fav.position === "Wide Receiver" && fav.flex === false ? 
                                <Favorites 
                                    key={fav.id} 
                                    pos={"Wide Receiver"} 
                                    fav={fav} 
                                    user={currentUser} 
                                    onDelete={handleDelete} 
                                    onDraft={handleDraft} 
                                    count={count} 
                                    setFull={handleFull} 
                                    team={team} 
                                /> : null)}
                        </div>
                        <div className="position-list">
                            Tightends
                            {favorites.map((fav) => fav.position === "Tight End" && fav.defense === false && fav.flex === false ? 
                                <Favorites 
                                    key={fav.id} 
                                    pos={"Tight End"} 
                                    fav={fav} 
                                    user={currentUser} 
                                    onDelete={handleDelete} 
                                    onDraft={handleDraft} 
                                    count={count} 
                                    setFull={handleFull} 
                                    team={team} 
                                /> : null)}
                        </div>
                        <div className="position-list">
                            Kicker
                            {favorites.map((fav) => fav.position === "Place kicker" ? 
                                <Favorites 
                                    key={fav.id} 
                                    pos={"Place kicker"} 
                                    fav={fav} 
                                    user={currentUser} 
                                    onDelete={handleDelete} 
                                    onDraft={handleDraft} 
                                    count={count} 
                                    setFull={handleFull} 
                                    team={team} 
                                /> : null)}
                        </div>
                        <div className="position-list">
                            Defense
                            {favorites.map((fav) => fav.defense === true ? 
                                <Favorites 
                                    key={fav.id} 
                                    pos={"Defense"} 
                                    fav={fav} 
                                    user={currentUser} 
                                    onDelete={handleDelete} 
                                    onDraft={handleDraft} 
                                    count={count} 
                                    setFull={handleFull} 
                                    team={team} 
                                /> : null)}
                        </div>
                        <div className="position-list">
                            Flex
                            {favorites.map((fav) => fav.flex === true ? 
                                <Favorites 
                                    key={fav.id} 
                                    pos={"Flex"} 
                                    fav={fav} 
                                    user={currentUser} 
                                    onDelete={handleDelete} 
                                    onDraft={handleDraft} 
                                    count={count} 
                                    setFull={handleFull} 
                                    team={team} 
                                /> : null)}
                        </div>
                    </div>
                </div>
                <div className="draft-avail">
                    <div className="avail-title">Available Players</div>
                    <div className="avail-drop">
                        <select onChange={handleTeamSelect}>
                            <option value="all">All Teams</option>
                            {teams.map((team) => (<TeamsDropDown team={team} />))}
                        </select>
                    </div>
                    <div className="avail-drop">
                    <select onChange={handlePositionSelect}>
                            <option value="all">All Positions</option>
                            {positions.map((position) => (<PositionDropDown position={position} />))}
                        </select>
                    </div>
                    <ul className="list">
                        {players.map((player) => (<AvailablePlayers key={player.id} player={player} user={currentUser} onAdd={handleAdd} />))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Draft;