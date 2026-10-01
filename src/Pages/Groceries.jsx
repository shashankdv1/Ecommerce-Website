import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
function Groceries()
{
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [groceryItems, setgroceryItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/Categories/Groceries")
      .then((response) => {
        if (response.data.success && response.data.GroceryItems) {
          setgroceryItems(response.data.GroceryItems);
        } else {
          setError("No Grocery Items found");
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
      {groceryItems.map((groceryItem,index) => (
         <ul key={groceryItem.Id || index}>
      <li>
        <img class="w-32 h-32"
          src={`http://localhost:8000/Items/getImage/${groceryItem.Id}`}
          alt={groceryItem.name}
        />
      </li>
        <li>groceryItem Name: {groceryItem.name}</li>
      <li>groceryItem Price: {groceryItem.price}</li>
    </ul>
      ))}
    </ul>
  );
}

export default Groceries;