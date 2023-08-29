import "./Profile.scss";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  const userType = currentUser?.type === 0 ? "Student" : "Teacher";

  return (
    <div className="profile">
      {currentUser !== null && (
        <>
          <div className="card">
            <div className="image">
              {currentUser.first_name[0].toUpperCase() +
                currentUser.last_name[0].toUpperCase()}
            </div>
            <div className="info">
              <div className="name">
                {currentUser.first_name + " " + currentUser.last_name}
              </div>
              <div className="email">{currentUser?.email}</div>
              <div className="instrument">
                {currentUser.instrument[0].toUpperCase() +
                  currentUser.instrument.slice(1)}
              </div>
              {userType === "Teacher" && (
                <div className="code">
                  <h3>My Code:</h3>
                  <p>{currentUser.code}</p>
                </div>
              )}
            </div>
          </div>
          {userType === "Teacher" && (
            <p className="instructions">
              *To connect students to your account, provide them with your
              unique lookup code. They will need to enter it from their account.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
