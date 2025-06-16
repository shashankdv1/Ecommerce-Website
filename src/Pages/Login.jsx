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
  const[activate,setActivate]=useState(false);
  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "http://localhost:8000/login",
      { Email, password },
      { withCredentials: true }
    );

    if (res.data.status === "Disabled") {
      const confirmEnable = window.confirm(
        "Your account has been disabled. Are you sure you want to enable your account?"
      );
      if (confirmEnable) {
        setEnable(true);
        try {
          const response = await axios.post(
            "http://localhost:8000/EnableAccount",
            { Email },
            { withCredentials: true }
          );
          if (response.data.success) {
            alert("Your account has been successfully enabled");
          } else {
            alert(response.data.msg || "Failed to enable account");
          }
        } catch (error) {
          alert(error?.response?.data?.msg || "Internal server error");
        }
      } else {
        alert("Account enabling cancelled");
      }

    } else if (res.data.status === "deleted") {
      alert("Your account has been deleted. Please create a new account.");

    } else if (res.data.status === "Archived") {
      const confirmActivate = window.confirm(
        "Your account has been deleted. Are you sure you want to activate your account?"
      );
      if (confirmActivate) {
        setActivate(true);
        try {
          const response = await axios.post(
            "http://localhost:8000/ActivateAccount",
            { Email },
            { withCredentials: true }
          );
          if (response.data.success) {
            alert("Your account has been successfully activated");
          } else {
            alert(response.data.msg || "Failed to activate account");
          }
        } catch (error) {
          alert(error?.response?.data?.msg || "Internal server error");
        }
      } else {
        alert("Account activation was cancelled");
      }

    } else if (res.data.success) {
      setUser({ name: res.data.name });
      navigate("/Main");

    } else {
      alert(res.data.msg || "Login failed. Please try again.");
    }

  } catch (error) {
    alert(error.response?.data?.msg || "Login attempt was unsuccessful");
  }
};

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