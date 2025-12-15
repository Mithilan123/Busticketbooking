import { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);

      login(res.data); // store token + user

      alert("Login Successful!");
      window.location.href = "/"; // redirect home
    } catch (err) {
      alert("Login Failed. Check email/password.");
      console.log("LOGIN ERROR:", err.response?.data || err);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Login</h1>

      <div className="login-box">
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
