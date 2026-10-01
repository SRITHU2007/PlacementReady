import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";


function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            const response = await API.post(
                "register/",
                formData
            );

            setMessage(
                response.data.message
            );

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            if (error.response) {

                setError(
                    JSON.stringify(
                        error.response.data
                    )
                );

            } else {

                setError(
                    "Something went wrong."
                );

            }
        }
    };


    return (

        <div>

            <h2>Student Registration</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <button type="submit">
                    Register
                </button>

            </form>


            {message && (
                <p>{message}</p>
            )}

            {error && (
                <p>{error}</p>
            )}


            <p>

                Already have an account?

                {" "}

                <button
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>

            </p>

        </div>

    );
}


export default Register;