import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        🛡 <span>CyberShield</span>
      </div>

      {/* Navigation */}
      <div className="nav-links">

        <Link to="/home">
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