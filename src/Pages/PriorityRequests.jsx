import axios from "axios";
import { useState } from "react";
function PriorityRequests(){
    const [ProductName,setproductName]=useState("");
    const[Options,setOptions]=useState("PriceChange");
    const[request,setRequest]=useState("");
async function sendRequest()
{

    try{
    const res=await axios.post("http://localhost:8000/vendor/PriorityRequests",{ProductName,Options,request},{withCredentials:true});
        if(res.data.success)
        {
            alert(res.data.msg);
        }
        else{
            alert(res.data.msg);
        }
    }
    catch(error) {
  if (error.response) {
    alert(error.response.data.msg);
  } else {
    alert("Internal Server Error");
  }
}

}
return(<>
<form onSubmit={(e)=>{e.preventDefault();sendRequest();}}>
    <label for="Item Name:">Item Name: </label><input onChange={(e)=>{setproductName(e.target.value)}} name="ItemName" required></input><br/>
   <label for="Reqoptions">Request Options</label> <select onChange={(e)=>{setOptions(e.target.value)}} name="Reqoptions">
        <option value="PriceChange">PriceChange</option>
        <option value="DeleteItem">DeleteItem</option>
        <option value="AddItem">AddItem</option>
    </select><br/>
    <label for="request">Request: </label><input onChange={(e)=>{setRequest(e.target.value)}}type="text" name="request" required></input><br/>
    <button type="submit">Submit</button>
</form>
</>);
}

export default PriorityRequests;