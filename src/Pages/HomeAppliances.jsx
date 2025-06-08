import { useState, useEffect } from "react";
import axios from "axios";

function HomeAppliances() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [HomeItems, setHomeItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/Categories/Electronics")
      .then((response) => {
        if (response.data.success && response.data.homeItems) {
          setHomeItems(response.data.homeItems);
        } else {
          setError("No Home Items found");
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
      {HomeItems.map((HomeItem) => (
        <li key={HomeItem.Id}>{HomeItem.Name}</li>
      ))}
    </ul>
  );
}

export default HomeAppliances;
