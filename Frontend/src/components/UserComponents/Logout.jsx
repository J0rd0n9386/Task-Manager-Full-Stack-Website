import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const doLogout = async () => {
      try { await axios.post(
          `${import.meta.env.VITE_API_URL}/api/logout`,
          {},
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
      window.location.reload()
    };

    doLogout();
  }, [navigate]);

  return <h2>Logging out...</h2>;
};

export default Logout;