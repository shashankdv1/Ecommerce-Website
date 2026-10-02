
import { useUser } from "../userContext";
import axios from "axios";
import { useEffect, useState } from "react";

function DisplayCart() {
  const { user } = useUser();
  const Name = user?.name;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const display = async () => {
      if (!Name) {
        setItems([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await axios.post(
          "http://localhost:8000/Items/displayCart",
          { Name }
        );

        console.log("Full API Response:", response.data);

        const data = response.data;

        if (
          data.success &&
          Array.isArray(data.cartProdcuts)
        ) {
          setItems(data.cartProdcuts);
        } else {
          setItems([]);
        }

      } catch (error) {
        console.error("Cart API Error:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    display();
  }, [Name]);

  console.log("Cart Items:", items);

  if (loading) {
    return <p className="text-center mt-10">Loading cart...</p>;
  }

  return (
    <div className="p-4 space-y-4">

      {items.length === 0 ? (
        <p className="text-center mt-10">
          Your cart is empty.
        </p>
      ) : (
        items.map((product, index) => (
          <div
            key={product?.Id || index}
            className="border p-4 rounded shadow-sm flex gap-4 items-center"
          >
            <img
              className="w-32 h-32 object-cover"
              src={`http://localhost:8000/Items/getImage/${product?.Id}`}
              alt={product?.name || "Cart product"}
            />

            <div>
              <p className="font-bold">
                Product Name: {product?.name || "Name unavailable"}
              </p>

              <p>
                Product Price: {product?.price ?? "Price unavailable"}
              </p>
            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default DisplayCart;
