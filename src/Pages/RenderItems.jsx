import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const RenderItems=()=>{
 const[error,setError]=useState("");
    const[loading,setLoading]=useState(true);
    const[items,setItems]=useState([]);
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
  if(loading) return
  <p>Loading...</p>
      if(error) return <p>{error}</p>
      return(
        <>
    <ul>
      {items.map(item=>(<li>
        <img src={`http://localhost:8000/Items/getImage/${item.Id}`}  alt="Product" />
        <li key={item.id}>{item.name}</li>
      </li>))}
      </ul>
      </>
      );
    }
    export default RenderItems;