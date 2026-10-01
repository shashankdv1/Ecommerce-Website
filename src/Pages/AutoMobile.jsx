import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
function AutoMobile()
{
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [autoMobileItems, setautoMobileItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/Categories/AutoMobile")
      .then((response) => {
        if (response.data.success && response.data.AutoMobileItems) {
          setautoMobileItems(response.data.AutoMobileItems);
        } else {
          setError("No AutoMobile Items found");
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
      {autoMobileItems.map((autoMobileItem) => (
        <li key={autoMobileItem.Id}>{autoMobileItem.Name}</li>
      ))}
    </ul>
  );
}

export default AutoMobile;