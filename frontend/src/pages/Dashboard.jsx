
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
    };

    return (
        <div className="container mt-4">
            <h2>Welcome to PlacementReady!</h2>

            <p>
                Manage your student profile and prepare for placements.
            </p>

            <div className="mt-3">
                <button
                    className="btn btn-primary me-2"
                    onClick={() => navigate("/profile")}
                >
                    My Profile
                </button>

                <button
                    className="btn btn-success me-2"
                    onClick={() => navigate("/upload-resume")}
                >
                    Upload Resume
                </button>

                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;