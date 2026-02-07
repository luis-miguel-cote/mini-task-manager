import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register, logout } from "../features/auth/authSlice";
import logo from "../assets/logo.png";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, error } = useSelector((state) => state.auth);

    // Redirige a login cuando el registro es exitoso
    useEffect(() => {
        if (status === "succeeded") {
            navigate("/login");
        }
    }, [status, navigate]);

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
                {/* LOGO */}
                <img src={logo} alt="logo-auth" className="auth-logo" />

                <h2>Register</h2>

                {/* 🔥 AQUÍ ESTABA EL PROBLEMA */}
                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Name"
                        required
                    />

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
                        {status === "loading" ? "Creating account..." : "Register"}
                    </button>
                </form>

                {error && <p className="error-text">{error}</p>}

                <p className="auth-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
