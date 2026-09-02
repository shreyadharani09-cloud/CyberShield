import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user?.id) {
        await api.post("/auth/logout", {
          userId: user.id
        });
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/");

    } catch (error) {
      console.error("Logout error:", error);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/");
    }
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        🛡 <span>CyberShield</span>
      </div>

      {/* Navigation */}
      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;