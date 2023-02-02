import UserDropDown from "./UserDropDown";

function User({ setCurrentUser, currentUser, users }) {

    function handleUserSelect(e) {
        if(e.target.value !== ""){
            fetch(`http://localhost:9292/user_info/${e.target.value}`)
            .then(res => res.json())
            .then(data => setCurrentUser(data))
        }
    }

    return(
        <div className="user">
            <div className="user-name">{`Current User - ${currentUser.name ? currentUser.name : "None Selected"}`}</div>
            <div className="drop-down">
                <select className="input-form" name="choose" onChange={handleUserSelect} >
                    <option className="input-button" value="">Choose User</option>
                    {users.map((user) => <UserDropDown key={user.id} user={user} />)}
                </select>
            </div>
        </div>
        
    )
}

export default User;