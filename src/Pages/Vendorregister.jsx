import { useState } from "react";
import axios from "axios";
function Vendoerregister()
{
    const[Email,setEmail]=useState("");
    const[Mobile,setMobile]=useState("");
    const[OrganizationName,setOrganization]=useState("");
    const[password,setPassword]=useState("");
   async function Register()
    {
        try{
        const res =await axios.post("http://localhost:8000/vendor/Register",{Email,Mobile,OrganizationName,password},{withCredentials:true});
        if(res.data.success)
        {
             console.log("Registration was successful!");
        }
        else{
            alert(res.data.msg);
        }
    }
    catch(error)
    {
          console.log("Error response:", error.response);
    alert(error.response?.data?.msg || "Registration failed");
    }
    }
return(<>
<form onSubmit={Register}>
<label for="vendormail" >Email:</label><input onChange={(e)=>{setEmail(e.target.value)}} name="vendormail" type="text"></input><br/>
<label for="mobile">Mobile:</label><input onChange={(e)=>{setMobile(e.target.value)}} name="mobile" type="text"></input><br />
<label for="organizationname">OrganizationName:</label><input onChange={(e)=>{setOrganization(e.target.value)}}  name="organizationname" type="text"></input><br/>
<label for="pwd">Password</label><input onChange={(e)=>{setPassword(e.target.value)}}  name="pwd"  type="password"></input><br/>
<button type="submit">Submit</button>
</form>
</>)
}
export default Vendoerregister;