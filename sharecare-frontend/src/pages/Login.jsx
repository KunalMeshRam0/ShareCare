import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import logo from "../assets/ShareCare-Logo.png";
import "../styles/auth.css";

function Login() {

  const navigate = useNavigate();

  const [role, setRole] = useState("donor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
        role
      });

      if (res.data.role !== role) {
        alert("Wrong role selected");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      navigate(`/${res.data.role}-dashboard`);

    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        {/* LOGO */}
        <div className="logo-box">
          <img src={logo} alt="ShareCare" />
          <h2>ShareCare</h2>
        </div>

        <h3>Welcome Back</h3>
        <p className="subtitle">Login to continue</p>

        <form onSubmit={handleSubmit}>

          {/* ROLE */}
          <div className="role-buttons">
            <button type="button" className={role==="donor"?"active":""} onClick={()=>setRole("donor")}>Donor</button>
            <button type="button" className={role==="ngo"?"active":""} onClick={()=>setRole("ngo")}>NGO</button>
            <button type="button" className={role==="admin"?"active":""} onClick={()=>setRole("admin")}>Admin</button>
          </div>

          {/* EMAIL */}
          <label>Email</label>
          <input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <label>Password</label>
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              👁️
            </span>
          </div>

          {/* BUTTON */}
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Login"}
          </button>

        </form>

        <p className="signup-text">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;