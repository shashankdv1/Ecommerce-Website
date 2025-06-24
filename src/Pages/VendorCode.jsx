import { useState } from "react";
import { useVendor } from "../userContext";
import axios from "axios";
function VendorCode()
{
    const {vendor}=useVendor();
const[city,setCity]=useState("");
const[wareHouse,setWarehouse]=useState("");
const[state,setState]=useState("");
   async function generateCode()
    {
   const response=await axios.get("http://localhost:8000/vendor/generateCode",{city,wareHouse,state});

  try{
    if(response.data.success)
    {
      
    }
  }
  catch(response)
  {

  }

    }
    if(vendor?.OrgName==null)
    {
        return(<>
        <p>You do not have priviliges to access this page.</p>
        </>)
    }
return(<>
<p>Welcome {vendor.OrgName}</p>
<form onSubmit={generateCode}>
<label for="cityName">City: </label><input onChange={(e)=>{setCity(e.target.value)}} type="text" name="cityName" placeholder="Please Enter your Place Name" required></input><br/>
<label for="warehousename">Warehouse Name: </label><input onChange={(e)=>{setWarehouse(e.target.value)}} type="text" name="warehousename" placeholder="Please Enter your Warehouse Name" required></input><br/>
<label for="States">Choose your Warehouse State: </label>
<select  onChange={(e)=>{setState(e.target.value)}}  name="States" id="States">
     <option value="StateName">State Name</option>
  <option value="Andhra Pradesh">Andhra Pradesh</option>
  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
  <option value="Assam">Assam</option>
  <option value="Bihar">Bihar</option>
   <option value="Chhatisgarh">Chhatisgarh</option>
    <option value="Goa">Goa</option>
     <option value="Haryana">Haryana</option>
      <option value="Himachal Pradesh">Himachal Pradesh</option>
       <option value="Jharkhand">Jharkhand</option>
 <option value="Karnataka">Karnataka</option>
  <option value="Kerala">Kerala</option>
   <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharastra">Maharastra</option>
     <option value="Manipur">Manipur</option>
      <option value="Meghalaya">Meghalaya</option>
       <option value="Mizoram">Mizoram</option>
        <option value="Nagaland">Nagaland</option>
        <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telegana">Telegana</option>
                    <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                       <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
</select><br/>
<button type="submit">Submit</button>
</form>
</>)
}
export default VendorCode;