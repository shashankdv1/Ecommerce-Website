import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
    const AdminLogin=()=>
    {
      const navigate=useNavigate();
      const [username,setusername]=useState("");
      const  [password,setpassword]=useState("");
      const handleadminLogin = async (e) => {
        e.preventDefault();
        try{
          
        const res = await axios.post(
           "http://localhost:8000/Admin/Adminlogin",
          { username,password },
          { withCredentials: true }
      );
     
      if (res.data.success) {
        console.log("Login successful!");
        navigate("/AddItems");
      }
      else{
        alert(res.data.msg());
      }
    }
    catch(error){
      alert(error.response?.data?.msg || "Login failed");
    }
      }
  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleadminLogin} className="flex flex-col gap-4">
        
        {/* Username */}
        <div className="flex items-center gap-4">
          <label htmlFor="username" className="">
            Username:
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setusername(e.target.value)} required
          />
        </div>

        {/* Password */}
        <div className="flex items-center gap-4">
          <label htmlFor="pwd" className="">
            Password:
          </label>
          <input
            id="pwd"
            name="pwd"
            type="password"
            placeholder="Enter your password"
            className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
         onChange={(e)=>setpassword(e.target.value)} required/>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >Submit
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
