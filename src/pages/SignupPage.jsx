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
    phone: "",
    gender: "",
    dob: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async () => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await API.post("/auth/signup", data);
      login(res.data);    // store token + user
      navigate("/");      // redirect home
    } catch (err) {
      console.error(err);
      alert("Signup failed — Check backend OR email already exists.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card animated-auth">
        <h2>Create Account</h2>

        <input type="text" placeholder="Full Name"
          onChange={(e) => setData({ ...data, name: e.target.value })} />

        <input type="email" placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })} />

        <input type="tel" placeholder="Phone Number"
          onChange={(e) => setData({ ...data, phone: e.target.value })} />

        <select onChange={(e) => setData({ ...data, gender: e.target.value })}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input type="date"
          onChange={(e) => setData({ ...data, dob: e.target.value })} />

        <input type="text" placeholder="City"
          onChange={(e) => setData({ ...data, city: e.target.value })} />

        <input type="password" placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })} />

        <input type="password" placeholder="Confirm Password"
          onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />

        <button onClick={handleSignup}>Sign Up</button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
