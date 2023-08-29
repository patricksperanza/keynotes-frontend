import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext, useState } from "react";
import "./DropdownMenu.scss";

const DropdownMenu = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="welcome" onClick={() => setToggleDropdown(true)}>
      <p>Welcome {currentUser?.first_name}!</p>
      {toggleDropdown && (
        <div
          className="wrapper"
          onClick={(e) => {
            e.stopPropagation();
            setToggleDropdown(false);
          }}
        >
          <div className="inner-wrapper">
            <div className="dropdown">
              <Link to="/profile">
                <button className="dropdown-select">My Profile</button>
              </Link>
              <Link to="/dashboard">
                <button className="dropdown-select">Dashboard</button>
              </Link>
              <button className="dropdown-select" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
