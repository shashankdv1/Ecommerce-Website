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
   {items.map((item, index) => (
  <p key={index}>{item.productName}</p>
))}
    </>
)
};
export default DisplayCart;