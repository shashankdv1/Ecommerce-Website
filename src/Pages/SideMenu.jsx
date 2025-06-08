import Logout from "./Logout";
import { useUser } from "../userContext"
import Orders from "./Orders";
function SideMenu()
{
  const {user} = useUser();
     if(user?.name==null)
     {
        return<>
        <li class="bg-red-100">{"Guest"}</li>
        <button><a href=""></a>Login</button>
        <button><a href=""></a>Register</button> 
        <button><a href="http://localhost:3000/Help">Help and Support</a></button>
        </>
     }
return(
    <> 
   <ul>
    <li class="bg-red-100">{user?.name}</li>
   <li><button><a href="http://localhost:3000/Orders">Your Orders</a></button></li> 
   <li><button>Your Cart</button></li> 
   <button><a href="http://localhost:3000/Help">Help and Support</a></button>
   <Logout/>
   </ul>
    </>
)
}

export default SideMenu;