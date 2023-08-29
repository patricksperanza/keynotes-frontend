import "./Nav.scss";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import DropdownMenu from "./DropdownMenu";

const Nav = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="nav">
      <Link to="/" className="nav-logo">
        <img src={logo} alt="hero image" />
      </Link>
      <div>
        {currentUser !== null ? (
          <DropdownMenu />
        ) : (
          <>
            <Link to="/login">
              <button className="nav-btn login">Login</button>
            </Link>
            <Link to="/register">
              <button className="nav-btn register">Sign Up</button>
            </Link>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
