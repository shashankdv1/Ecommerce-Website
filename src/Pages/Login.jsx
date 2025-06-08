import {useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useUser } from "../userContext"
const Login=()=>
{
 const { setUser } = useUser();
  const navigate=useNavigate();
  const [Email,setemail]=useState("");
  const  [password,setpassword]=useState("");
  const [Enable,setEnable]=useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try{
    const res = await axios.post(
      "http://localhost:8000/login",
      { Email, password },
      { withCredentials: true }
  );
  if(res.data.status==="Disabled")
  {
     const confirmEnable = window.confirm("Your account has been disabled.Are you sure you want to enable your account?");
     if(confirmEnable)
     {
      setEnable(true);
      const response= await axios.post("http://localhost:8000/EnableAccount",{Email},{withCredentials:true});
      try{
        if(response.data.success)
        {
          alert("Your Account has been successfully enabled");
        }
      }
      catch(error)
      {
        alert(error?.msg?.data||"Internal Server error");
      }
     }
     else{
      alert("Account Enabling cancelled");
     }

  }
  if (res.data.success) {
    setUser({ name: res.data.name});
    navigate("/Main");
  }
  else{
    alert(res.data.msg());
  }
}
catch(error){
  alert(error.response?.data?.msg ||"If Your Enabled now try logging in again!");
}
  
  }
    return(
      <div>
       <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={Email} onChange={(e) => setemail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
  }
export default Login;