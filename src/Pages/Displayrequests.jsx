import { useState,useEffect } from "react";
import axios from "axios";
async function Displayrequests()
{
    const[Data,setData]=useState([]);
    const[NoData,setNoData]=useState("");
    const[Approval,setApproval]=useState("");
    useEffect(()=>{
         async function fetchData(){
    try{
     const res= await axios.post("http://localhost:8000/vendor/DisplayRequests");

     if(res.data.success && Array.isArray(res.data.Prioritydata))
     {
       setData(res.data.Prioritydata);
        } 
      
       else{
        setNoData(null);
     }
    }

      catch(error){
        console.error("Error fetching RequestDatas list:", error);
        }
    }
 fetchData(); 
},[]);
if(Approval==='true')
try{
  const result=await axios.post("",{},{withCredentials:true});
 
}
catch(error)
{

}
  if(NoData===null)
    {
        return(<>
        <p>There was no priority request data found.</p>
        </>)
    }
return(
    <>
  <div className="flex mt-36">
    {Data.map((RequestData, index) => (
  RequestData && RequestData.priorityRequestId && (
    <ul key={RequestData.priorityRequestId || index}>
      <li>Requested Product Name: {RequestData.productName}</li>
      <li>Options: {RequestData.options}</li>
       <li>RequestData Description: {RequestData.request}</li>
      <button value="true" onClick={(e)=>{setApproval(e.target.value)}}>Approve</button><br/>
<button value="false
" onClick={(e)=>{setApproval(e.target.value)}}>Reject</button>
    </ul>
      )
))}
    </div>
</>
);
}

export default Displayrequests;