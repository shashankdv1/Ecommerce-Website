import { useState, useEffect } from "react";
import axios from "axios";
function Trending()
{
      const [error, setError] = useState("");
      const [loading, setLoading] = useState(true);
      const [trendingItems, setTrending] = useState([]);
       useEffect(() => {
        const fetchTrending=async()=>{
         await axios.get("http://localhost:8000/Items/trending").then((response) => {
              if (response.data.success && response.data.trendingProducts) {
                setTrending(response.data.trendingProducts);
              } else {
                setError("No Trending Items found");
              }
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              setError("Failed to fetch Trending items.");
              setLoading(false);
            });
          }
            fetchTrending();
        }, []);
        
     if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {trendingItems.map((trendingItem) => (
        <li key={trendingItem.Id}>{trendingItem.Name} {trendingItem.addedOn}</li>
      ))}
    </ul>
  );
}
export default Trending;