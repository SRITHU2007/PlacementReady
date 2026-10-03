
import { useState } from "react";
import API from "../api";

function ResumeUpload() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage("Please select a PDF resume.");
            return;
        }

        if (file.type !== "application/pdf") {
            setMessage("Only PDF files are allowed.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setMessage("Resume must be 5 MB or smaller.");
            return;
        }

        const token = localStorage.getItem("access");

        if (!token) {
            setMessage("Please log in first.");
            return;
        }

        const formData = new FormData();
        formData.append("resume", file);

        setLoading(true);
        setMessage("");

        try {
            const response = await API.post(
                "upload-resume/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(response.data.message);
            setFile(null);
            e.target.reset();
        } catch (error) {
            setMessage(
                error.response?.data?.error ||
                error.response?.data?.detail ||
                "Upload failed. Check the backend terminal."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Upload Resume</h2>
            <p>Select your resume in PDF format (maximum 5 MB).</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept=".pdf,application/pdf"
                    className="form-control mb-3"
                    onChange={(e) =>
                        setFile(e.target.files[0] || null)
                    }
                />

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Upload Resume"}
                </button>
            </form>

            {message && <p className="mt-3">{message}</p>}
        </div>
    );
}

export default ResumeUpload;