import {useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../userContext";
const  Logout=()=>{
     const { setUser } = useUser();
    const [error,setError]=useState("");
    const navigate=useNavigate();
  
const handleLogout=async() => {
try{
        const response=await axios.get("http://localhost:8000/logout",
             { withCredentials: true }
        );

     if(response.data.success)
                {
                     setUser({name:null});
                    alert("You have logged out of Website.");
                   navigate("/login");
                }
                else{
                    alert("There was some Internal error while logging out.");
                }
            }
catch(error){
                setError(error);
            }
        }
        if(error)
            {return(<>
              <p>error</p>
              <button onClick={handleLogout}>Logout</button>
            </>)
          
            }
            return(<>
            
            <button onClick={handleLogout}>Logout</button>
            </>
            );
}
export default Logout;
