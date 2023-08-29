import "./Find.scss";
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { User } from "../types";

const Find = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [code, setCode] = useState("");
  const [teacher, setTeacher] = useState<User | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:3001/lookup/find",
      { code },
      {
        withCredentials: true,
      }
    );
    setTeacher(res.data);
  };

  const addTeacher = async () => {
    const res = await axios.post(
      "http://localhost:3001/lookup/add",
      { teacher, currentUser },
      {
        withCredentials: true,
      }
    );
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
