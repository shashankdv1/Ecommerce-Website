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
      {HomeItems.map((HomeItem,index) => (
         <ul key={HomeItem.Id || index}>
      <li>
        <img class="w-32 h-32"
          src={`http://localhost:8000/Items/getImage/${HomeItem.Id}`}
          alt={HomeItem.name}
        />
      </li>
        <li>HomeItem Name: {HomeItem.name}</li>
      <li>HomeItem Price: {HomeItem.price}</li>
    </ul>
      ))}
    </ul>
  );
}

export default HomeAppliances;
