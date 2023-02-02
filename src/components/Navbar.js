import { NavLink } from "react-router-dom";

function NavBar() {
  
    return (
      <div className="nav">
        <span>
        <NavLink className="nav-link" to="/" exact>
          Home
        </NavLink>
        </span>
        <span>
        <NavLink className="nav-link" to="/draft" exact>
          Draft
        </NavLink>
        </span>
        <span>
        <NavLink className="nav-link" to="/team" exact>
          Team
        </NavLink>
        </span>
        <span>
        <NavLink className="nav-link" to="/about" exact>
          About
        </NavLink>
        </span>
      </div>
    );
  }
  
  export default NavBar;