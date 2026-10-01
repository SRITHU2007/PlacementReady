import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";


function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            const response = await API.post(
                "login/",
                {
                    username,
                    password
                }
            );


            localStorage.setItem(
                "access",
                response.data.access
            );

            localStorage.setItem(
                "refresh",
                response.data.refresh
            );


            setMessage(
                "Login successful!"
            );


            setTimeout(() => {

                navigate("/dashboard");

            }, 500);


        } catch (error) {

            setError(
                "Invalid username or password."
            );

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
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                    required
                />

                <br /><br />


                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                <br /><br />


                <button type="submit">
                    Login
                </button>

            </form>


            {message && (
                <p>{message}</p>
            )}

            {error && (
                <p>{error}</p>
            )}


            <p>

                Don't have an account?

                {" "}

                <button
                    onClick={() =>
                        navigate("/register")
                    }
                >
                    Register
                </button>

            </p>

        </div>

    );
}


export default Login;