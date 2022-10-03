import { NavLink } from "react-router-dom";

function NavBar() {
    return (
      <div className="nav">
        <span>
        <NavLink to="/" exact>
          Home
        </NavLink>
        </span>
        <span>
        <NavLink to="/team" exact>
          Team
        </NavLink>
        </span>
        <span>
        <NavLink to="/draft" exact>
          Draft
        </NavLink>
        </span>
        <span>
        <NavLink to="/about" exact>
          About
        </NavLink>
        </span>
      </div>
    );
  }
  
  export default NavBar;