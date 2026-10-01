import { useState, useEffect } from "react";
import { useUser } from "../userContext";
import axios from "axios";

const RenderItems = () => {
  const { user } = useUser();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

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

  const handleAddtoCart = async (productName) => {
    const Name = user?.name;
    if (Name !== undefined && productName !== undefined) {
      try {
        const response = await axios.post(
          "http://localhost:8000/Items/addToCart",
          { Name, product: productName },
          { withCredentials: true }
        );
        const data = response.data;
        if (data.success) {
          alert("Item was successfully added to cart");
        } else {
          alert("Item was not added to cart");
        }
      } catch (err) {
        alert("Server error adding to cart");
        console.error(err);
      }
    } else {
      alert("Something went wrong");
    }
  };

  const handleOrders = async (productName, productPrice, qty) => {
    const Name = user?.name;
    const parsedQty = Number(qty);

    if (parsedQty > 0) {
      if (Name !== undefined && productName !== undefined) {
        try {
          const response = await axios.post(
            "http://localhost:8000/Items/addOrders",
            { Name, product: productName, qty: parsedQty, productPrice },
            { withCredentials: true }
          );
          const data = response.data;
          if (data.success) {
            alert("Order was placed successfully");
          } else {
            alert("Order was not successful");
          }
        } catch (err) {
          alert("Server error placing order");
          console.error(err);
        }
      } else {
        alert("Something went wrong. Make sure you are logged in.");
      }
    } else {
      alert("Enter valid quantity");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (items.length === 0) return <p>No products to display.</p>;

  return (
    <div className="flex-col mt-36">
      {items.map((product, index) => {
        const productId = product.Id || product._id;

        return (
          product &&
          product.name && (
            <ul key={productId || index} className="border-b p-4 mb-4">
              <li>Product Name: {product.name}</li>
              <li>
                <img
                  className="w-32 h-32"
                  src={`http://localhost:8000/Items/getImage/${productId}`}
                  alt={product.name}
                />
              </li>
              <li>Product Price: {product.price}</li>
              <li>
                <form onSubmit={(ev) => ev.preventDefault()}>
                  <button type="button" onClick={() => handleAddtoCart(product.name)}>
                    Add To Cart
                  </button>
                </form>
              </li>
              <li>
                <div className="flex">
                  <form
  onSubmit={(ev) => {
    ev.preventDefault();
    // 💡 Accessing the element by name attribute safely
    const qtyValue = ev.currentTarget.elements.qty.value;
    handleOrders(product.name, product.price, qtyValue);
  }}
>
  <label className="ml-2" htmlFor={`qty-${index}`}>
    Net Quantity
  </label>
  <input
    id={`qty-${index}`}
    name="qty" // 💡 Matches elements.qty above
    className="ml-2 border"
    type="number"
    defaultValue="1"
    min="1"
  />
  <button type="submit" className="ml-2">
    Order
  </button>
</form>
                </div>
              </li>
            </ul>
          )
        );
      })}
    </div>
  );
};

export default RenderItems;


