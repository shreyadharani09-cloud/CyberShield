
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await api.post("/auth/register", formData);

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
        "Registration Failed"
      );

    }
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        

        <h2>🛡️ Get Cyber Alerts</h2>

        <p className="auth-subtitle">
          Enter your details to receive cybersecurity alerts
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Get Cyber Alerts
          </button>

        </form>

        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

       <p className="auth-link">
  Already have an account?{" "}
  <Link to="/login">
    Login
  </Link>
</p>

<p className="auth-link">
  <Link to="/">
    ← Back to Home
  </Link>
</p>

      </div>

    </div>
  );
}

export default Register;

