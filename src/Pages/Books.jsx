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
        if (response.data.success && response.data.eItems) {
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
      {bookItems.map((bookItem) => (
        <li key={bookItem.Id}>{bookItems.Name}</li>
      ))}
    </ul>
  );
}

export default Books;