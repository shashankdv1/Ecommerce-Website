import axios from "axios";
import { useState } from "react";
function DeliveryPartnerRegister()
{
    const [Email,setEmail]=useState("");
    const [Mobile,setMobile]=useState("");
    const[Region,setRegion]=useState("");
    const[City,setCity]=useState("");
    const[State,setState]=useState("");
    const[Job,setJob]=useState("");
    const[password,setPassword]=useState("");
    const[confirmPass,setConfirm]=useState("");

    async function handleRegistration(e)
    {
       e.preventDefault();
       try{
       const res=await axios.post("http://localhost:8000/Delivery/PartnerRegister",{Email,Mobile,Region,City,State,Job,password,confirmPass},{withCredentials:true});
       if(res.data.success)
       {
        alert(res.data.msg);
       }
       else{
        alert(res.data.msg);
       }
    }
    catch(error)
    {
        alert(error.response?.data?.msg);
    }
       
    }
    return(<>
    <form onSubmit={handleRegistration}>
       <label for="partnerEmail">Email: </label><input name="partnerEmail" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Please Enter your email" type="email"></input><br/>
        <label for="MobileNumber">Mobile Number:
            
            </label><input type="text" name="MobileNumber" onChange={(e)=>{setMobile(e.target.value)}}  placeholder="Please Enter your Mobile Number"></input><br/>
        <label for="partnerRegion"></label>Region: <input name="partnerRegion" onChange={(e)=>{setRegion(e.target.value)}}  placeholder="Please Enter your region"></input><br/>
        <label for="partnerCity"></label>City<input name="partnerCity" onChange={(e)=>{setCity(e.target.value)}}  placeholder="Please Enter your City"></input><br/>
        <label for="partnerState">State: </label><input name="partnerState" onChange={(e)=>{setState(e.target.value)}}  placeholder="Please Enter your state"></input><br/>
        <label for="jobType">Job Type:</label><select onChange={(e)=>{setJob(e.target.value)}}  name="jobType">
            <option value="Job Type">Job Type</option>
             <option value="Part-Time">Part Time</option>
              <option value="Full-Time">Full Time</option>
        </select><br/>
        <label for="password">Password: </label><input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" placeholder="Please Enter your password"></input><br/>
        <label for="Confirmpassword">Confirm-Password: </label><input onChange={(e)=>{setConfirm(e.target.value)}} type="password" name="Confirmpassword" placeholder="Please Enter your password again to confirm"></input><br/>
        <button type="submit">Submit</button>
    </form>
    </>);
}

export default DeliveryPartnerRegister;