import React from "react";

function UserDropDown({ user }) {
    return(
        <option id={user.id} value={user.id}>{user.name}</option>
    )
}

export default UserDropDown;