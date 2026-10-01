import { useUser } from "../userContext";
import axios from "axios";
import { useEffect, useState } from "react";

function DisplayOrders() {
  const { user } = useUser();
  const Name = user?.name;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const display = async () => {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:8000/Items/displayOrders", { Name });
        const data = response.data;
        
        if (data.success && Array.isArray(data.orders)) {
          setItems(data.orders);
        } else {
          setItems([]);
        }
      } catch (err) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    if (Name !== undefined) {
      display();
    } else {
      setItems([]); 
    }
  }, [Name]);

  if (loading) return <p className="text-center mt-10">Loading your cart items...</p>;
  if (items.length === 0) return <p className="text-center mt-10">Your cart is empty.</p>;

  return (
    <div className="p-6">
      {items.map((product, index) =>
        product && product.name ? (
        
          <ul key={product.OrderId || product.Id || index} className="border-b p-4 mb-4 flex flex-col gap-2">
            <li>
              <img
                className="w-32 h-32 object-contain border rounded"
                src={`http://localhost:8000/Items/getImage/${product.Id}`}
                alt={product.name}
              />
            </li>
            <li className="font-bold text-lg">Product Name: {product.name}</li>
            
           
            <li className="text-gray-700">Base Unit Price: {product.price}</li>
            
            {product.NetQuantity && <li className="text-sm">Quantity Ordered: {product.NetQuantity} units</li>}
            {product.OrderTotal && <li className="text-sm font-semibold text-green-600">Total: {product.OrderTotal}</li>}
          </ul>
        ) : null
      )}
    </div>
  );
}

export default DisplayOrders;
