import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../utils/baseUrl";
import axios from "axios";
import "./Register.scss";

const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [type, setType] = useState("");
  const [instrument, setInstrument] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };

  // Register User
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/auth/register`, {
        ...inputs,
        type,
        instrument,
      });
      navigate("/login");
    } catch (err: any) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
          value={inputs.firstName}
        />
        <input
          required
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          value={inputs.lastName}
        />
        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={inputs.email}
        />
        <input
          required
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={inputs.password}
        />
        <label htmlFor="type">Are you a teacher or student?</label>
        <select
          name="type"
          id="type"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setType(e.target.value)
          }
          value={type}
        >
          <option value=""></option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>

        <label htmlFor="instrument">Primary Instrument</label>
        <select
          name="instrument"
          id="instrument"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setInstrument(e.target.value)
          }
          value={instrument}
        >
          <option value=""></option>
          <option value="baritone">Baritone</option>
          <option value="bass">Bass</option>
          <option value="bassoon">Bassoon</option>
          <option value="clarinet">Clarinet</option>
          <option value="cello">Cello</option>
          <option value="flute">Flute</option>
          <option value="french horn">French Horn</option>
          <option value="guitar">Guitar</option>
          <option value="Oboe">Oboe</option>
          <option value="percussion">Percussion</option>
          <option value="piano">Piano</option>
          <option value="saxophone">Saxophone</option>
          <option value="trombone">Trombone</option>
          <option value="trumpet">Trumpet</option>
          <option value="tuba">Tuba</option>
          <option value="viola">Viola</option>
          <option value="violin">Violin</option>
          <option value="voice">Voice</option>
        </select>
        <button onClick={handleSubmit}>Register</button>
        {error && <p>{error}</p>}

        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
