import { useState, useEffect } from "react";
import axios from "axios";

const RenderItems = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]); // array of products

  useEffect(() => {
    axios
      .get("http://localhost:8000/Items/RenderItems")
      .then((response) => {
        const data = response.data;

        if (data.success && Array.isArray(data.items)) {
          setItems(data.items);
          setError("");
        } else {
          setItems([]);
          setError("No products found in response");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to fetch items.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (items.length === 0) return <p>No products to display.</p>;

  return (
    <div className="flex-col mt-36">
    {items.map((product, index) => (
  product && product.name && (
    <ul key={product.Id || index}>
      <li>Product Name: {product.name}</li>
      <li>
        <img class="w-32 h-32"
          src={`http://localhost:8000/Items/getImage/${product.Id}`}
          alt={product.name}
        />
      </li>
      <li>Product Price: {product.price}</li>
    </ul>
  )
))}
    </div>
  );
};

export default RenderItems;
