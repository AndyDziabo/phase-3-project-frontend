import { Route, Switch } from "react-router-dom";
import NavBar from "./Navbar";
import About from "./About";
import Team from "./Team";
import Draft from "./Draft";
import Home from "./Home";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/team">
          <Team />
        </Route>
        <Route exact path="/draft">
          <Draft />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
