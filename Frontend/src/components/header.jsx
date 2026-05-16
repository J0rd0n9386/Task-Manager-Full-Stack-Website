import { NavLink } from "react-router-dom"; 
import "../App.css"; 
const Header = () => {
  const auth = localStorage.getItem("accessToken") 
  return (
    <header className="task-header">
      <div className="header-container">
        <div className="header-logo">
          <span>TaskMaster</span>
        </div>

        <nav className="header-nav">
          {auth ? (
            <>
            <NavLink to="/">Home</NavLink>
              <NavLink to="/createTask">Create Task</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/logout">Logout</NavLink>
              
            </>
          ) : (
            <>
              <NavLink to="/Login">Login</NavLink>
              <NavLink to="/registerUser">Register</NavLink>
              <NavLink to="/AdminLogin">Admin Login</NavLink>

            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
