
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await API.post("login/", {
                username,
                password,
            });

            // Save JWT tokens
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            setMessage("Login successful!");

            // Open dashboard after successful login
            navigate("/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                "Login failed. Check your username and password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Student Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br /><br />

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            {message && <p>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <p>
                Don't have an account?{" "}
                <button onClick={() => navigate("/register")}>
                    Register
                </button>
            </p>
        </div>
    );
}

export default Login;