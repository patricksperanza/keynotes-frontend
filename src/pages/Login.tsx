import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "./Register.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Login User
  const handleSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
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

        <button onClick={handleSubmit}>Login</button>
        {error && <p>{error}</p>}

        <span>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
