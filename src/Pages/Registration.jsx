import { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const Registrations=()=>{
    const navigate=useNavigate();
    const [Email,setemail]=useState("");
    const  [password,setpassword]=useState("");
    const [number,setnumber]=useState("");
    const [username,setusername]=useState("");
    const handleRegistration = async (e) => {
        e.preventDefault();
        const res = await axios.post(
          "http://localhost:8000/register",
          { username,number,Email, password },
          { withCredentials: true }
      );
      try{
      if (res.data.success) {
        console.log("Registration was successful!");
        navigate("/Login");
      }
      else{
        alert(res.data.msg());
      }
    }
    catch(error){
      alert(error.response?.data?.msg || "Registration failed");
    }
      }
return(

   

    <div>
         <div>
       <h2>Register</h2>
            <form onSubmit={handleRegistration}>
                <input type="text" placeholder="username" value={username} onChange={(e) => setusername(e.target.value)} required /><br/>
                <input type="text" placeholder="Mobile Number" value={number} onChange={(e) => setnumber(e.target.value)} required /><br/>
                <input type="email" placeholder="Email" value={Email} onChange={(e) => setemail(e.target.value)} required /><br/>
                 <input type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} required /><br/>
                <button type="submit">Register</button>
            </form>
        </div>
    </div>
);


};

export default Registrations;


