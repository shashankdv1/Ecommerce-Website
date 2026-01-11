import { useState, useEffect } from "react";
import { useUser } from "../userContext"
import axios from "axios";

const RenderItems = () => {
    const {user} = useUser();
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
     const handleAddtoCart=async(product)=>
    {
   const Name = user?.name;
      if(Name!==undefined && product!==undefined){
        console.log(Name+" "+product);
        const response= await axios.post("http://localhost:8000/Items/addToCart",{Name,product},{withCredentials:true});
        const data=response.data;
        if(data.success)
        {
          console.log("Item was successfully added to cart");
        }
        else{
          console.log("Item was not added to cart");
        }

      }
      else{
        console.log("error");
      }
        
    }

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
            <form>
       
    <button onClick={(ev)=>{ev.preventDefault();handleAddtoCart(product.name)}}>Add To Cart</button>
    </form>
      <div className="flex">
        <form>
      <li className="ml-2"><a href="">Order</a></li>
      <label className="ml-2" for="qty">Net Quantity</label><input name="qty" className="ml-2" type="number" min="1"/>
      </form>
      </div>
    </ul>
  )
))}
    </div>
  );
};

export default RenderItems;
