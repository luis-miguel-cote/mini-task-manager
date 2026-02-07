import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import logo from "../assets/logo.png";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, token } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      login({
        email: e.target.email.value,
        password: e.target.password.value,
      })
    );
  };

  useEffect(() => {
    if (token) {
      navigate("/tasks");
    }
  }, [token, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* LOGO */}
        <img src={logo} alt="logo-auth" className="auth-logo" />

        <h2>Login</h2>

    
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="btn-primary"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}

        <p className="auth-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
