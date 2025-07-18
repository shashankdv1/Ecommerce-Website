//import axios from "axios";
function DeliveryLogin()
{
    // const handleLogin=async(req,res)=>
    // {

    // }

    return(<>
    <form>
       <label name="email">Email: </label> <input type="email" placeholder="Please Enter your email" name="email" required></input><br/>
        <label name="password">Password: </label> <input type="password" placeholder="Please Enter your password" name="password" required></input><br/>
        <button type="submit">Submit</button>
    </form>
    </>)
}

export default DeliveryLogin;