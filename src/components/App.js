import { Route, Switch } from "react-router-dom";
import React, { useState } from "react";
import NavBar from "./Navbar";
import About from "./About";
import Team from "./Team";
import Draft from "./Draft";
import Home from "./Home";
import User from "./User";

function App() {
  const [currentUser, setCurrentUser] = useState([]);
  const [users, setUsers] = useState([]);

  return (
    <div className="main">
      <NavBar />
      <User setCurrentUser={setCurrentUser} currentUser={currentUser} users={users} />
      <Switch>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/team">
          <Team currentUser={currentUser} />
        </Route>
        <Route exact path="/draft">
          <Draft currentUser={currentUser} />
        </Route>
        <Route exact path="/">
          <Home setCurrentUser={setCurrentUser} setUsers={setUsers} users={users} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
