import "./Find.scss";
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { User } from "../types";
import { BASE_URL } from "../utils/baseUrl";

const Find = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [code, setCode] = useState("");
  const [teacher, setTeacher] = useState<User | null>(null);

  // Lookup Teacher using Unique Code
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post(`${BASE_URL}/lookup/find`, { code });
    setTeacher(res.data);
  };

  // Add Teacher
  const addTeacher = async () => {
    await axios.post(`${BASE_URL}/lookup/add`, { teacher, currentUser });
    navigate("/dashboard");
  };

  return (
    <div className="find">
      <h1>Find Your Teacher</h1>
      <form onSubmit={handleSubmit}>
        <p>
          Enter the lookup code exactly to find your Teacher (include dashes):{" "}
        </p>
        <input
          required
          type="text"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
        <button>Submit</button>
      </form>

      {teacher && (
        <>
          <h4 className="question">Is this your teacher?</h4>
          <p>Double click on the card below to confirm</p>
          <div onDoubleClick={addTeacher}>
            <Card user={teacher} />
          </div>
        </>
      )}
    </div>
  );
};

export default Find;
