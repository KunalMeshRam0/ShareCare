import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import "../styles/profile.css";

function Profile() {

  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");

  /* FETCH PROFILE */
  const fetchProfile = async () => {
    const res = await API.get("/user/me");
    setUser(res.data);
    setName(res.data.name);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /* UPDATE PROFILE */
  const handleUpdate = async () => {
    try {
      const res = await API.put("/user/me", { name });
  
      setUser(res.data); // 🔥 update UI immediately
      setEdit(false);
  
      alert("Profile updated");
  
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
};


  return (
    <>
      <Navbar variant="profile" />

      <div className="profile-container">

        <div className="profile-card">

          <h2>My Profile</h2>

          {/* NAME */}
          <div className="profile-field">
            <label>Name</label>

            {edit ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <p>{user.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="profile-field">
            <label>Email</label>
            <p>{user.email || "-"}</p>
          </div>

          {/* ROLE */}
          <div className="profile-field">
            <label>Role</label>
            <p className={`badge ${user.role}`}>
            {user.role || "-"}</p>
          </div>

          {/* DATE */}
          <div className="profile-field">
            <label>Joined</label>
            <p>
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>

          {/* BUTTONS */}
          <div className="profile-actions">

            {edit ? (
              <>
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEdit(false)}>Cancel</button>
              </>
            ) : (
              <button onClick={() => setEdit(true)}>Edit Profile</button>
            )}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Profile;