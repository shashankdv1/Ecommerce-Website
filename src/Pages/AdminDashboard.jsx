import { useNavigate } from "react-router-dom";
import { useAdmin } from "../userContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const AdminDashboard=()=>{
    const navigate=useNavigate();
    const[userCount,setCount]=useState("");
    const[countError,setCountError]=useState("");
     const {admin}=useAdmin();
    const addItems=()=>{
        navigate('/AddItems');
}
 useEffect(()=>{
  axios.get("http://localhost:8000/Admin/CustomerCount").then((response)=>{
 if(response.data.success)
  {
      setCount(response.data.count);
  }
  }).catch((error)=>{
  setCountError(error);
  });
  },[]);
const removeItems=()=>{
    navigate('/RemoveItems');
}
 if(admin===null)
            {
               
                return <p>You do not have priviliges to access this page</p>
            } 
    return(<>
    <div class="flex-col">
    <button onClick={addItems} class="w-16 h-16 bg-red-400">AddItems</button><br />
    <button onClick={removeItems} class="w-16 h-16 bg-red-400 mt-7">RemoveItems</button><br />
    <button  class="w-16 h-16 bg-red-400 mt-7">Trending Products</button><br />
    <button  class="w-16 h-16 bg-red-400 mt-7">WareHouses Management</button><br />
    <a href="http://localhost:3000/Products"><button  class="w-16 h-16 bg-red-400 mt-7">Products CategoryWise</button></a>
    </div>
    <div>
        <p>{countError}</p>
        <ul>

        <li>Total Users are:{userCount}</li>
        <li>Preminum Users:</li>
        <li>Gold Members are:</li>
        <li>Total Products are:</li>
        </ul>
    </div>
    </>);
}

export default AdminDashboard;