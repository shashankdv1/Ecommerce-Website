import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const RenderItems=()=>{
 const[error,setError]=useState("");
    const[loading,setLoading]=useState(true);
    const[items,setItems]=useState([]);
   // const[buyclicked,setBuyClicked]=useState(false);
   // const[clickedId,setClikedId]=useState("");
     useEffect(() => {
axios.get("http://localhost:8000/Items/RenderItems").then(response=>{
  setItems([response.data]);
  setLoading(false);
})
.catch(error=>{
  console.error(`Error fetching data:`,error);
  setError('Failed to fetch items.');
  setLoading(false);
});
},[]);
const setBuyAction=()=>{
 // setBuyClicked(true);
}
  if(loading) return
  <p>Loading...</p>
      if(error) return <p>{error}</p>
      /*if(buyclicked)
      {
        const buy=()=>{
          


        }
      }*/
      return(
        <>
            <div class="flex-col mt-36">
    <ul>
      {items.map(item=>(<li>
        <li key={item.id}>Product name: {item.name}</li>
        <img src={`http://localhost:8000/Items/getImage/${item.Id}`}  alt="Product" />
        <l1 key={item.id}>Price $ {item.price}</l1><br />
        <button value={item.id}>Buy</button>
      </li>))}
      </ul>
      </div>
      </>
      );
    }
    export default RenderItems;
  