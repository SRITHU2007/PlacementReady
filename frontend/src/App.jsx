import { useEffect, useState } from "react";
import API from "./api";

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>PlacementReady</h1>

      <p>
        {message}
      </p>
    </div>
  );
}

export default App;