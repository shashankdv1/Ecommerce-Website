import { useState } from "react";
import { useUser } from "../userContext";
import axios from "axios";
function Help(){
    const {user}=useUser();
    const[disableAct,setdisableAct]=useState(false);
    const[deleteAct,setdeleteAct]=useState(false);
    const[password,setpassword]=useState("");
         const DisableAccount=async(e)=>
        {
          e.preventDefault();
            const confirmDisable = window.confirm("Are you sure you want to disable your account?");
           
       if (confirmDisable) {
         setdisableAct(true);
         
        const username=user?.name;
    try{
      const res= await axios.post("http://localhost:8000/DisableAccount",  { username, password },
      { withCredentials: true });
        if(res.data.success)
        {
           alert("Your account has been marked for disable.");
        }
        else{
          alert("Account disable process was unsuccessful kindly recheck your password");
        }
    
    }
  catch(error){
        alert(error?.msg?.data || "There was internal server error");
      }
  } 
      else {
    alert("Account disable canceled.");
  } 
}  
const DeleteAccount=async(e)=>{
  e.preventDefault();
  const confirmDeletion=window.confirm("Are you sure you want to Delete your account?");
  if(confirmDeletion)
  {
    setdeleteAct(true);
  }
}
     if(user?.name==null){
return(<>
<h1>You are not logged in please login to get More help.<a class="bg-blue-50"  href="http://localhost:3000/Login">Login</a>If you dont have any account <a class="bg-blue-50"  href="http://localhost:3000/Register">Register</a></h1><br/>
<p>If you Lost or forget your account</p>
</>)
     }
     return(
        <>
        <p>Disable your account</p>
        <form onSubmit={DisableAccount}>
        <input type="password" placeholder="Please retype your password" onChange={(e)=>setpassword(e.target.value)} required/><br />
        <button type="submit">Disable account</button>
        </form>
        <p>Delete your account</p>
          <form onSubmit={DeleteAccount}>
        <input type="password" placeholder="Please retype your password" onChange={(e)=>setpassword(e.target.value)} required/><br />
        <button type="submit">Disable account</button>
        </form>
        </>
     )
}
export default Help;