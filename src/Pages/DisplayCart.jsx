import { useUser } from "../userContext";
import axios from "axios";
import { useEffect, useState} from "react";
function DisplayCart()
{
    const {user} = useUser();
     const Name = user?.name;
    const [items, setItems] = useState([]);
      useEffect(() => {
     const display=async()=>{   
        if(Name!==undefined)
        {
            const response=  await axios.post("http://localhost:8000/Items/displayCart",{Name});
            const data=response.data;
            if(data.success &&  Array.isArray(data.cartProdcuts))
            {
                setItems(data.cartProdcuts);
            }
            else {
          setItems([]);
        }
    }
}
display();
      },[Name])
return(
    <>
  {items.map((product, index) => (

  product && product.name && (
    <ul key={product.Id || index}>
      <li>
        <img class="w-32 h-32"
          src={`http://localhost:8000/Items/getImage/${product.Id}`}
          alt={product.name}
        />
      </li>
        <li>Product Name: {product.name}</li>
      <li>Product Price: {product.price}</li>
    </ul>
  )
))}
    </>
)
};
export default DisplayCart;