import { useState, useEffect } from "react";
import axios from "axios";

function Mobile() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [mobiles, setMobiles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/Categories/Mobiles")
      .then((response) => {
        if (response.data.success && response.data.mobiles) {
          setMobiles(response.data.mobiles);
        } else {
          setError("No mobiles found");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch items.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {mobiles.map((mobile) => (
        <li key={mobile.Id}>{mobile.Name}</li>
      ))}
    </ul>
  );
}

export default Mobile;
