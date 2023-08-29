import Card from "../components/Card";
import { Link } from "react-router-dom";
import "./Dashboard.scss";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { User } from "../types";
import axios from "axios";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);

  // list of connected students or teachers
  const [list, setList] = useState<User[]>([]);

  // retrieve list of connected students or teachers
  useEffect(() => {
    const getList = async () => {
      const res = await axios.post(
        "http://localhost:3001/user/list",
        currentUser,
        { withCredentials: true }
      );

      setList(res.data);
    };

    getList();
  }, []);

  const userType = currentUser?.type === 0 ? "Student" : "Teacher";
  const oppositeType = currentUser?.type === 0 ? "Teacher" : "Student";

  return (
    <div className="dashboard">
      <h1>Your {oppositeType}s</h1>
      {userType === "Student" && (
        <Link to="/find">
          <button>Find Your Teacher</button>
        </Link>
      )}
      <div className="cards">
        {list.length > 0 ? (
          <>
            {list.map((user: User) => (
              <Link to={`/feed/${user.user_id}`} key={user.user_id}>
                <Card user={user} />
              </Link>
            ))}
          </>
        ) : (
          <h4>
            You currently have no {oppositeType.toLowerCase()}s to display
          </h4>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
