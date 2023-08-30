import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Write.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Write() {
  const navigate = useNavigate();
  // Get the current student and teacher ids and assign to variables
  const { currentUser } = useContext(AuthContext);
  const teacherId = currentUser?.user_id;
  const { studentId } = useParams();

  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (date === "") {
      setError("Date is required");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/add`, {
        value,
        date,
        teacherId,
        studentId: Number(studentId),
      });
      navigate("/feed/" + studentId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="write">
      <h1>New Lesson</h1>
      <div className="write-section">
        <label htmlFor="date" className="date-label">
          Lesson Date:
        </label>
        <input
          className="date"
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="editor-container">
          <label htmlFor="editor" className="editor-label">
            Lesson Notes
          </label>
          <ReactQuill
            id="editor"
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleSubmit}>Submit Lesson</button>
    </div>
  );
}

export default Write;
