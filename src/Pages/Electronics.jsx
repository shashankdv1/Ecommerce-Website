import { useState, useEffect } from "react";
import axios from "axios";

function Electronics() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [eItems, seteItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/Categories/Electronics")
      .then((response) => {
        if (response.data.success && response.data.eItems) {
          seteItems(response.data.eItems);
        } else {
          setError("No Electronic Items found");
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
      {eItems.map((eItem) => (
        <li key={eItem.Id}>{eItem.Name}</li>
      ))}
    </ul>
  );
}

export default Electronics;
