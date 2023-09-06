import home from "../assets/home.jpg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import "./Home.scss";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="home">
      <div className="home-img-container">
        <img className="home-img" src={home} alt="cello-lesson" />
      </div>
      <div className="home-text">
        <h1>Connecting Teachers and Students One Lesson at a Time</h1>
        <p className="home-text-subtitle">
          Ensuring the success of students and teachers alike!
        </p>

        {currentUser ? (
          <Link to="/dashboard">
            <button className="home-btn">Dashboard</button>
          </Link>
        ) : (
          <Link to="/register">
            <button className="home-btn">Try It Now!</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
