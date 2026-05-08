import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import '../../App.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get("http://localhost:8000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.data.user);
      } catch (err) {
        if (err.response?.status === 401) {
          setMessage("User not authorized. Please login.");
        } else {
          setMessage("Something went wrong.");
        }
      }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="profile-wrapper">
        <div className="profile-card">
          <div className="profile-avatar">🔒</div>
          <p className="profile-message">{message || "Login to view profile"}</p>
          <NavLink to="/login" className="profile-login-link">Go to Login</NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-avatar">👤</div>
        <h2>My Profile</h2>

        <div className="profile-item">
          <span className="profile-icon">👤</span>
          <span className="profile-text">{user.username}</span>
        </div>

        <div className="profile-item">
          <span className="profile-icon">📛</span>
          <span className="profile-text">{user.fullname}</span>
        </div>

        <div className="profile-item">
          <span className="profile-icon">📧</span>
          <span className="profile-text">{user.email}</span>
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