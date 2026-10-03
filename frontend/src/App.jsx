
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ResumeUpload from "./pages/ResumeUpload";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h1>PlacementReady</h1>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/upload-resume" element={<ResumeUpload />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;