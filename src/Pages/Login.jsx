import {useState } from "react";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useUser } from "../userContext"
const Login=()=>
{
 const { setUser } = useUser();
  const navigate=useNavigate();
  const [Email,setemail]=useState("");
  const  [password,setpassword]=useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try{
    const res = await axios.post(
      "http://localhost:8000/login",
      { Email, password },
      { withCredentials: true }
  );
  
 
  if (res.data.success) {
    console.log("Login successful!");
    setUser({ name: res.data.name});
    navigate("/Main");
  }
  else{
    alert(res.data.msg());
  }
}
catch(error){
  alert(error.response?.data?.msg || "Login failed");
}
  
  }
  /* useEffect(() => {
    
  checkLoggedIn(); 
    
  }, []);
  const checkLoggedIn = async () => {
      try {
        const res = await axios.get("http://localhost:8000/loggedin", { withCredentials: true });
        if (res.data.loggedIn) {
          setUser({ name: res.data.name });
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };*/
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