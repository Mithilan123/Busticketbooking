import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSignup = async () => {
    const res = await API.post("/auth/signup", data);
    login(res.data);
    navigate("/");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card animated-auth">

        <h2>Create Account</h2>
        <p className="auth-sub">Join Bus Booking and start your journey!</p>

        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

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

        <button onClick={handleSignup}>Sign Up</button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
