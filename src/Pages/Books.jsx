import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
function Books()
{
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookItems, setbookItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/Categories/Books")
      .then((response) => {
        if (response.data.success && response.data.BookItems) {
          setbookItems(response.data.BookItems);
        } else {
          setError("No Book Items found");
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
      {bookItems.map((bookItem,index) => (
         <ul key={bookItem.Id || index}>
      <li>
        <img class="w-32 h-32"
          src={`http://localhost:8000/Items/getImage/${bookItem.Id}`}
          alt={bookItem.name}
        />
      </li>
        <li>bookItem Name: {bookItem.name}</li>
      <li>bookItem Price: {bookItem.price}</li>
    </ul>
      ))}
    </ul>
  );
}

export default Books;