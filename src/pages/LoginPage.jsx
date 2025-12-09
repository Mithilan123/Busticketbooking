import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    const res = await API.post("/auth/login", data);
    login(res.data);
    navigate("/");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card animated-auth">

        <h2>Welcome Back</h2>
        <p className="auth-sub">Login to continue booking your journey</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button onClick={handleLogin}>Login</button>

        <p className="auth-switch">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
