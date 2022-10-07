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
  return (
    <div>
      <NavBar />
      <User currentUser={currentUser} />
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
          <Home setCurrentUser={setCurrentUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
