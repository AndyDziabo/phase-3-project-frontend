function User({ currentUser }) {

    return(
        <div className="user">
            {`Current User - ${currentUser.name ? currentUser.name : "None Selected"}`}
        </div>
    )
}

export default User;