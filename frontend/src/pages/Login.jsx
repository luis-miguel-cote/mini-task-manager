import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      login({
        email: e.target.email.value,
        password: e.target.password.value,
      })
    );
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button disabled={status === "loading"}>
          {status === "loading" ? "Loading..." : "Login"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
