import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";


function App() {

    return (

        <BrowserRouter>

            <nav>

                <Link to="/">
                    Home
                </Link>

                {" | "}

                <Link to="/register">
                    Register
                </Link>

                {" | "}

                <Link to="/login">
                    Login
                </Link>

            </nav>


            <Routes>

                <Route
                    path="/"
                    element={
                        <div>

                            <h1>
                                PlacementReady
                            </h1>

                            <p>
                                Student Skill-Gap Analysis
                                and Placement Readiness Portal
                            </p>

                        </div>
                    }
                />


                <Route
                    path="/register"
                    element={<Register />}
                />


                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;