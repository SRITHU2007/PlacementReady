
import { useEffect, useState } from "react";
import API from "../api";

function Profile() {
    const [form, setForm] = useState({
        phone: "",
        department: "",
        year: "",
        college: ""
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("access");

        API.get("student-profile/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setForm(response.data);
        })
        .catch(() => {
            setMessage("Could not load profile. Please log in again.");
        });
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("access");

        try {
            await API.put("student-profile/", form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage("Profile updated successfully!");
        } catch (error) {
            setMessage("Unable to update profile.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Student Profile</h2>

            <form onSubmit={handleSubmit}>
                {["phone", "department", "year", "college"].map(
                    (field) => (
                        <div className="mb-3" key={field}>
                            <label className="form-label">
                                {field.charAt(0).toUpperCase() +
                                    field.slice(1)}
                            </label>

                            <input
                                className="form-control"
                                name={field}
                                value={form[field]}
                                onChange={handleChange}
                            />
                        </div>
                    )
                )}

                <button className="btn btn-primary" type="submit">
                    Update Profile
                </button>
            </form>

            <p className="mt-3">{message}</p>
        </div>
    );
}

export default Profile;