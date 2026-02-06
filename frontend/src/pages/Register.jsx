import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register, logout } from "../features/auth/authSlice";
import { Link } from "react-router-dom";


export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerStatus, error } = useSelector((state) => state.auth);

  // clean up any existing auth state
  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  // login effect
  useEffect(() => {
    if (registerStatus === "succeeded") {
      navigate("/login");
    }
  }, [registerStatus, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      register({
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
    );
  };

return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required />
        <input name="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button disabled={registerStatus === "loading"}>
          {registerStatus === "loading" ? "Loading..." : "Register"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="auth-link">
        <span>Already have an account? </span>
        <Link to="/login">Login</Link>
      </div>
    </div>
  </div>
  );
}