import axios from "axios";
import { useState } from "react";
import { useVendor } from "../userContext";
import { useNavigate } from "react-router-dom";
function VendorLogin()
{
     const { setVendor } = useVendor();
    const [email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate = useNavigate();
    async function handleLogin(e)
    {
        e.preventDefault();
        try{
        const res = await axios.post("http://localhost:8000/vendor/Login",{email,password},{withCredentials:true});
        if(res.data.success)
        {
            alert("You have successfully logged in Welcome "+res.data.OrgName);
            setVendor({OrgName:res.data.OrgName});
            navigate("/Vendorcode");
        }
        else{
            alert(res.data.msg);
        }
    }
    catch(error){
        alert(error?.data?.msg);
    }
    }
    return(<>
    <form onSubmit={handleLogin}>
        <label for="Email">Email: </label><input name="Email" onChange={(e)=>{setEmail(e.target.value)}}type="text" placeholder="Please Enter your registered email" /><br/>
         <label for="password">Password: </label><input name="password" onChange={(e)=>setPassword(e.target.value)}type="password" placeholder="Please Enter your password" /><br/>
         <button type="submit">Submit</button>
    </form>
    </>)
}

export default VendorLogin;