import { useEffect, useState } from "react";
import axios from "axios";
function Warehouse()
{
const [Id,setId]=useState("");
const [Name,setName]=useState("");
const [City,setCity]=useState("");
const [State,setState]=useState("");
    function WarehouseDetails()
    {
    useEffect(async()=>{

        await axios.get("http://localhost:8000/vendor/WarehouseDetails").then((res)=>{
            if(res.data.success)
            {

            }
            else{

            }
        }).catch((error)=>{
            
        });

    },[]);

    }
return(<>
<div class="flex">
  <form class="flex" onClick={WarehouseDetails}>
<p>Warehouse Number:{Id}</p><br/>
<p class="ml-3">Warehouse Name:{Name}</p>
<p class="ml-3">City:{City}</p>
<p class="ml-3">State:{State}</p>
<p></p>
</form>
</div>

</>)
}
export default Warehouse;