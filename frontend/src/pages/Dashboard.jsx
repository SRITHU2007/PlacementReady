import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";


function Dashboard() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [error, setError] = useState("");


    useEffect(() => {

        const token =
            localStorage.getItem("access");


        if (!token) {

            navigate("/login");

            return;
        }


        API.get(
            "profile/",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )

        .then((response) => {

            setUser(
                response.data.user
            );

        })

        .catch(() => {

            localStorage.removeItem(
                "access"
            );

            localStorage.removeItem(
                "refresh"
            );

            navigate("/login");

            setError(
                "Session expired."
            );

        });

    }, [navigate]);


    const logout = () => {

        localStorage.removeItem(
            "access"
        );

        localStorage.removeItem(
            "refresh"
        );

        navigate("/login");
    };


    return (

        <div>

            <h1>
                PlacementReady Dashboard
            </h1>


            {user && (

                <div>

                    <h2>
                        Welcome, {user.first_name}!
                    </h2>

                    <p>
                        Username: {user.username}
                    </p>

                    <p>
                        Email: {user.email}
                    </p>


                    <button onClick={logout}>
                        Logout
                    </button>

                </div>

            )}


            {error && (
                <p>{error}</p>
            )}

        </div>

    );
}


export default Dashboard;