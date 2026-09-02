import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message);

      navigate("/home");

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-glow glow-one"></div>
      <div className="auth-glow glow-two"></div>

      <div className="auth-card">

        <div className="auth-logo">
          <div className="shield-icon">🛡️</div>

          <div>
            <h1>CyberShield</h1>
            <p>Cybersecurity Alert System</p>
          </div>
        </div>

        <div className="auth-heading">
          <h2>Welcome Back</h2>

          <p>
            Sign in to receive personalized cybersecurity
            alerts and protection insights.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <label>Email Address</label>

          <div className="input-wrapper">
            <span>✉️</span>

            <input
              type="email"
              name="email"
              placeholder="Enter your registered email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>

        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <div className="guest-access">

          <span>📰</span>

          <div>
            <strong>Just want to read cyber news?</strong>

            <p>
              You can browse the latest cybersecurity news
              without creating an account.
            </p>
          </div>

        </div>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">
            Create an account
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;