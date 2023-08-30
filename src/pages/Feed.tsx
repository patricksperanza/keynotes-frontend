import "./Feed.scss";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Lesson {
  post_id: number;
  post: string;
  date: string;
  display: boolean;
  isEditing: boolean;
}

const Feed = () => {
  const { currentUser } = useContext(AuthContext);
  const userType = currentUser?.type === 0 ? "Student" : "Teacher";

  // Get teacher and student ids
  const { id } = useParams();
  const connectedUserId = Number(id);
  const currentUserId = currentUser?.user_id;

  // Lessons Data
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [name, setName] = useState({ first_name: "", last_name: "" });

  // Edit text value
  const [value, setValue] = useState("");

  // Get lessons from the db
  const getLessons = async () => {
    const res = await axios.post(`${BASE_URL}/lesson`, {
      connectedUserId,
      currentUserId,
    });
    const lessonData = res.data.lessons.map((lesson: Lesson) => {
      return { ...lesson, display: false, isEditing: false };
    });
    setLessons(lessonData);
    setName(res.data.name);
  };

  useEffect(() => {
    getLessons();
  }, []);

  // Toggles a lesson display
  const handleToggle = (i: number) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson, index) => {
        return index === i ? { ...lesson, display: !lesson.display } : lesson;
      })
    );
  };

  // Start editting a lesson
  const handleEdit = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    i: number
  ) => {
    e.stopPropagation();
    if (!lessons[i].display) {
      handleToggle(i);
    }

    setLessons((prevLessons) =>
      prevLessons.map((lesson, index) => {
        return index === i
          ? { ...lesson, isEditing: !lesson.isEditing }
          : lesson;
      })
    );

    setValue(lessons[i].post);
  };

  // Submit an edited lesson
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>,
    i: number
  ) => {
    e.preventDefault();

    await axios.post(`${BASE_URL}/lesson/edit`, {
      id: lessons[i].post_id,
      post: value,
    });

    setLessons((prevLessons) =>
      prevLessons.map((lesson, index) => {
        return index === i ? { ...lesson, isEditing: false } : lesson;
      })
    );

    getLessons();
  };

  // Delete a lesson
  const handleDelete = async (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();

    await axios.post(`${BASE_URL}/lesson/delete`, { id });
    getLessons();
  };

  return (
    <div className="feed">
      <h1>Lessons</h1>
      {/*If current user is a techer, render the add lesson button*/}
      {userType === "Teacher" && (
        <Link to={`/new/${connectedUserId}`}>
          <button>Add Lesson</button>
        </Link>
      )}
      <div className="lessons">
        <h3>
          {name.first_name} {name.last_name}
        </h3>
        {lessons.map((lesson, index) => (
          <div key={lesson.post_id} className="lesson">
            <div className="lesson-header" onClick={() => handleToggle(index)}>
              <div className="lesson-header-left">
                <p>{lessons[index].display ? "v" : ">"}</p>
                <p className="date">{lesson.date.split("T")[0]}</p>
              </div>
              {userType === "Teacher" && (
                <div className="lesson-header-right">
                  <p
                    className="icon edit"
                    onClick={(e) => handleEdit(e, index)}
                  >
                    ✏️
                  </p>
                  <p
                    className="icon trash"
                    onClick={(e) => handleDelete(e, lesson.post_id)}
                  >
                    🗑️
                  </p>
                </div>
              )}
            </div>
            {lessons[index].display &&
              (lessons[index].isEditing ? (
                <div>
                  <ReactQuill theme="snow" value={value} onChange={setValue} />
                  <button
                    onClick={(e) => handleSubmit(e, index)}
                    className="submitBtn"
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <div className="post">{parse(lesson.post)}</div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
