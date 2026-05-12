import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../../App.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  // Fetch Profile
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.get(
        "https://task-manager-full-stack-website.onrender.com/api/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = res.data.data.user;

      setUser(userData);
      setPreview(userData.avatar);
    } catch (error) {
      setMessage("Please login first");
    }
  };

  // Upload Avatar
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // instant preview
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");

      const res = await axios.post(
        "https://task-manager-full-stack-website.onrender.com/api/update-avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = res.data.data.user;

      setUser(updatedUser);
      setPreview(updatedUser.avatar);

    } catch (error) {
      alert("Upload failed");
      fetchProfile();
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="profile-wrapper">
        <div className="profile-card">
          <h2>{message || "Login Required"}</h2>

          <NavLink to="/login" className="upload-btn">
            Go to Login
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-card">

        {/* Avatar */}
        <img
          src={preview || "https://via.placeholder.com/120"}
          alt="avatar"
          className="profile-image"
        />

        <h2>My Profile</h2>

        {/* Upload Button */}
        <label className="upload-btn">
          {loading ? "Uploading..." : "Change Photo"}

          <input
            type="file"
            accept="image/*"
            hidden
            disabled={loading}
            onChange={handleUpload}
          />
        </label>

        {/* Details */}
        <div className="profile-item">
          <span>👤 Username:</span>
          <span>{user.username}</span>
        </div>

        <div className="profile-item">
          <span>📛 Full Name:</span>
          <span>{user.fullname}</span>
        </div>

        <div className="profile-item">
          <span>📧 Email:</span>
          <span>{user.email}</span>
        </div>

      </div>
    </div>
  );
};

export default Profile;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { NavLink } from "react-router-dom";
// import '../../App.css';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         console.log("TOKEN:", token);
//         const res = await axios.get(
//           "http://localhost:8000/api/profile",
          
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
            
//           }
//         );
//         console.log(res.data);
//         setUser(res.data.data.user);

//       } catch (err) {
//         console.log("FULL ERROR:", err);
// console.log("STATUS:", err.response?.status);
// console.log("DATA:", err.response?.data);
// console.log("MESSAGE:", err.message);

//         if (err.response?.status === 401) {
//           setMessage("User not authorized. Please login.");
//         } else {
//           setMessage("Something went wrong.");
//         }
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (!user)
//     return (
//       <>
//         <p>{message || "Login to view profile"}</p>
//         <NavLink to="/login">Login</NavLink>
//       </>
//     );

//   return (
//     <div>
//       <p>Username: {user.username}</p>
//       <p>Fullname: {user.fullname}</p>
//       <p>Email: {user.email}</p>
//     </div>
//   );
// };

// export default Profile;