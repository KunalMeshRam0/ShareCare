import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo  from "../assets/ShareCare-Logo.png";
import "../styles/Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (token) {
      setUser({ role });
    }
  }, []);

  /* CLOSE DROPDOWN */
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="nav-wrapper">
      <nav className="navbar">

        {/* LOGO */}
        <div className="logo-section">
          <img src={logo} alt="ShareCare-Logo" className="logo-icon" />
          <span>ShareCare</span>
        </div>

        {/* LINKS */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>

        {/* PROFILE */}
        <div className="profile-section">
          {user ? (
            <div className="profile-dropdown" ref={dropdownRef}>

              <div
                className="avatar"
                onClick={() => setOpen(!open)}
              >
                {user.role.charAt(0).toUpperCase()}
              </div>

              {open && (
                <div className="dropdown-menu">

                  <p onClick={() => navigate("/profile")}>
                    My Profile
                  </p>

                  <p onClick={() => navigate(`/${user.role}-dashboard`)}>
                    Dashboard
                  </p>

                  <p className="logout" onClick={handleLogout}>
                    Logout
                  </p>

                </div>
              )}

            </div>
          ) : (
            <button onClick={() => navigate("/login")} className="login-btn">
              Login
            </button>
          )}
        </div>

      </nav>
    </div>
  );
};

export default Navbar;