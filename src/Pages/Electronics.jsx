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
      {eItems.map((eItem,index) => (
        <ul key={eItem.Id || index}>
      <li>
        <img class="w-32 h-32"
          src={`http://localhost:8000/Items/getImage/${eItem.Id}`}
          alt={eItem.name}
        />
      </li>
        <li>eItem Name: {eItem.name}</li>
      <li>eItem Price: {eItem.price}</li>
    </ul>
      ))}
    </ul>
  );
}

export default Electronics;
