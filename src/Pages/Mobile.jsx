import { useState, useEffect } from "react";
import axios from "axios";

function Mobile() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [Mobiles, setMobiles] = useState([]);

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
    <>
    <ul>
  {Mobiles.map((mobile) => (
    <>
      <li key={`name-${mobile.Id}`}>{mobile.name}</li>
      <li key={`desc-${mobile.Id}`}>{mobile.description}</li>
    </>
  ))}
</ul>
    </>
  );
}

export default Mobile;
