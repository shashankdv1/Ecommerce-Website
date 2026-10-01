import { useEffect, useState } from "react";
import axios from "axios";
function WarehouseDashboard()
{
const [warehouse, setWarehouse] = useState([]); 
const [error,setError]=useState("");

    useEffect(()=>{
      async function fetchData(){
        await axios.post("http://localhost:8000/vendor/WarehouseDetails").then((res)=>{
 if (res.data.success && Array.isArray(res.data.items)) {
          setWarehouse(res.data.items);
          setError("");
        } else {
          setWarehouse([]);
          setError("No products found in response");
        }
        }).catch((error)=>{
        console.error("Error fetching Warehouse list:", error);
        setError("Failed to fetch Warehouse list.");
        });
      }
      fetchData();
    },[]);

     if (error) return <p>{error}</p>;
 return (
    <div className="flex mt-36">
    {warehouse.map((Warehouse, index) => (
  Warehouse && Warehouse.warehouseName && (
    <ul key={warehouse.warehouseId || index}>
      <li>Warehouse Name: {Warehouse.warehouseName}</li>
      <li>Warehouse Id: {Warehouse.warehouseId}</li>
      <li>Warehouse State: {Warehouse.state}</li>
    </ul>
  )
))}
    </div>
  );
}
export default WarehouseDashboard;